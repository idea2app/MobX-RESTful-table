import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const lodash = require('lodash/lodash.js');

export default lodash;
export const debounce = lodash.debounce;
