import React, { createContext } from 'react';
export interface Config {
  classPrefix?: string;
}

export const defaultConfig = {
  classPrefix: 'dml',
};

const configContext = createContext<Config>(defaultConfig);

export default configContext;
