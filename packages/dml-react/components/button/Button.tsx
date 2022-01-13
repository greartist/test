import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { DmlButtonProps } from './type';
import useConfig from '../_util/useConfig';
import useRipple from '../_util/useRipple';

// 支持透传原生 `<button>` 标签支持的属性。
export interface ButtonProps
  extends DmlButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef(
  ({ type, children, loading, className, ...otherProps }: ButtonProps, ref) => {
    const btnRef = (ref as any) || useRef<HTMLElement>();
    useRipple(btnRef);
    const { classPrefix } = useConfig();
    return (
      <button
        ref={btnRef}
        className={classNames(className, [`${classPrefix}-button`], {
          [`${classPrefix}-button-is-loading`]: loading,
        })}
        type={type}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
