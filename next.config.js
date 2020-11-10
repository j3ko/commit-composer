const withNextAntdLess = require('./next-antd-less.config');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

module.exports = withPlugins(
  [
    [withCss, {}],
    [
      withNextAntdLess,
      {
        lessVarsFilePath: './styles/variables.module.less',
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          camelCase: true,
          localIdentName: '[name]_[local]___[hash:base64:5]',
        },
      },
    ],
  ],
  {
    webpack: (config, { webpack }) => {
      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /Conflicting order/,
        }),
      );

      config.plugins.push(
        new webpack.EnvironmentPlugin({
          PACKAGE_VERSION: version,
        }),
      );

      config.plugins.push(
        new webpack.ContextReplacementPlugin(/\/@commitlint\/resolve-extends\//, (data) => {
          delete data.dependencies[0].critical;
          return data;
        }),
      );

      config.module.unknownContextCritical = false;

      config.node = {
        __dirname: true,
      };

      return config;
    },
  },
);
