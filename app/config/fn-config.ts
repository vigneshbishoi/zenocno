import FILEPATH from './autoLoadPath';
import appConfig from './app-config';

export function getPluginFile(componentName: string) {
  return FILEPATH[appConfig.PLUGIN][componentName] !== undefined
    ? FILEPATH[appConfig.PLUGIN][componentName]
    : FILEPATH.Default[componentName];
}
