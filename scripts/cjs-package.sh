#!/bin/sh
# the package is "type": "module", so mark the CommonJS build directory as such,
# otherwise node (and bundlers honouring package.json "type") treat cjs/*.js as ESM
echo '{ "type": "commonjs" }' > cjs/package.json
