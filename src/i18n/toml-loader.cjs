/**
 * Webpack loader for .toml files.
 * Uses smol-toml to parse TOML content into a JavaScript object
 * and exports it as a default export JSON module.
 */
const { parse } = require('smol-toml');

module.exports = function tomlLoader(source) {
  const result = parse(source);
  return `export default ${JSON.stringify(result)};`;
};