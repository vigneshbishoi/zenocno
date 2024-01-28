/**
 * javascript comment
 * @Author:Anand R
 * @Date: 2021-11-08
 * @Desc: Text Traits | Multilingual
 */
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
i18n.locale = 'en';
// eslint-disable-next-line no-undef
export default translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
