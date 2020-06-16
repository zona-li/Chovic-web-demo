const { useBabelRc, override, useEslintRc } = require('customize-cra');

module.exportd = override(useBabelRc(), useEslintRc());
