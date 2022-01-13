import React, { ReactNode } from 'react';
import ConfigContext, { defaultConfig, Config } from './ConfigContext';

export interface ConfigProviderProps extends Config {
  children: ReactNode;
}

const ConfigProvider = ({ children, ...otherProps }: ConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={{ ...defaultConfig, ...otherProps }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
