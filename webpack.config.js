const path = require('path');

module.exports = {
  //mode: 'development',
  mode: 'production', 
  entry: './src-api-accessor.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'dist-api-accessor.js',
    library: "ApiAccessor",
  },
};
