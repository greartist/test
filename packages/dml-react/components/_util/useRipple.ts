import { RefObject, useCallback, useEffect } from 'react';
import useConfig from './useConfig';

const defaultRippleColor = 'rgba(0, 0, 0, 0.35)';

const getRippleColor = (el: HTMLElement, fixedRippleColor?: string) => {
  if (fixedRippleColor) {
    return fixedRippleColor;
  }
  if (el?.dataset?.ripple) {
    return el.dataset.ripple;
  }

  // css --ripple-color 属性，自定义
  const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
  if (cssVariable) {
    return cssVariable;
  }
  return defaultRippleColor;
};

export default function useRipple(
  ref: RefObject<HTMLElement>,
  fixedRippleColor?: string
) {
  const { classPrefix } = useConfig();
  const rippleContainer = document.createElement('div');

  const initRippleElement = useCallback(() => {
    const el = ref?.current;
    if (!el) return;
    const initPosition = el.style?.position || getComputedStyle(el).position;
    if (['', 'static'].includes(initPosition)) {
      el.style.position = 'relative';
    }
  }, [ref]);

  const addRipple = useCallback(
    (e) => {
      const el = ref?.current;
      if (e.button !== 0 || !el) return;
      const rippleColor = getRippleColor(el, fixedRippleColor);
      // TODO: disabled 状态下没有效果
      console.log(ref);
      if (rippleContainer.parentNode === null) {
        el.appendChild(rippleContainer);
      }

      // TODO: pointerup,pointerleave 清除效果
      const clearRipple = () => {};
    },
    [ref]
  );

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    initRippleElement();
    el.addEventListener('pointerdown', addRipple, false);
    return () => {
      el.removeEventListener('pointerdown', addRipple, false);
    };
  }, [ref]);
}
