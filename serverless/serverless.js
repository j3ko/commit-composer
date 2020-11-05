// serverless.js
const NextJsComponent = require('@sls-next/serverless-component');
const fs = require('fs-extra');
const chmodr = require('chmodr');

class CustomServerless extends NextJsComponent {
  async default(inputs = {}) {
    if (inputs.build !== false) {
      console.log('-> Building...');
      await this.build(inputs);
      console.log('Building was successful');
    }
    console.log('-> Copying conventional-changelog libraries');
    await this.copyConventionalChangelogs();
    console.log('-> Conventional-changelog libraries copied successfully');
    console.log('-> Deploying...');
    return this.deploy(inputs);
  }

  async copyConventionalChangelogs() {
    const folders = [
      {
        path: './node_modules',
        regex: /^conventional-changelog.*$/,
        outputPath: './.serverless_nextjs/api-lambda/node_modules',
      },
      {
        path: './node_modules/@commitlint',
        regex: /^config-.*$/,
        outputPath: './.serverless_nextjs/api-lambda/node_modules/@commitlint',
      },
    ];

    try {
      folders.forEach(async (folder) => {
        fs.readdirSync(folder.path, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .forEach(async (file) => {
            if (folder.regex.test(file.name)) {
              console.log(`copying file ${file.name}`);
              await fs.copy(`${folder.path}/${file.name}`, `${folder.outputPath}/${file.name}`, {
                recursive: true,
              });
              await chmodr(folder.outputPath, 0o777);
            }
          });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async cmodr(dir, code) {
    return new Promise((resolve, reject) =>
      chmodr(dir, code, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    );
  }
}

module.exports = CustomServerless;
