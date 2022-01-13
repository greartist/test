import { useContext } from 'react';
import ConfigContext, { Config } from '../config-provider/ConfigContext';

const useConfig = () => useContext<Config>(ConfigContext);

export default useConfig;
