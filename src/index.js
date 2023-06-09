const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
/**
 *  === vue2.x 脚手架 文件打包生成zip文件 配置
 *   npm install filemanager-webpack-plugin@2.0.5 --save-dev
 *   npm install vue2-dist-zip filemanager-webpack-plugin@2.0.5 -D
 *   需要安装 2.0.5 版本  "filemanager-webpack-plugin": "^2.0.5",
 *   使用方式
 const zipPlugin = require('vue2.x-dist-zip')
 zipPlugin() 执行方法

 configureWebpack: {
    plugins: process.env.NODE_ENV === 'production' ? [zipPlugin()] : []
  }
 */

const targetFile = path.resolve(__dirname, '../../../package.json');
// const packagejson = require(targetFile);
// const currentVersion = packagejson.version;
const packageData = require(targetFile)
const extract = function(date) {
  // 返回 ['2022', '09', '19', '18', '06', '11', '187']
  // 返回 2023.05.06.17.13
  const d = new Date(new Date(date).getTime() + 8 * 3600 * 1000)
  return new Date(d)
    .toISOString()
    .split(/[^0-9]/)
    .slice(0, 5).join('.')
}

const time = `${extract(new Date())}`

const plugin = function({ sourcePath, desPath } = {}) {
  console.log('zip packageData name==========', packageData.name)
  console.log('zip packageData version==========', packageData.version)
  console.log('zip sourcePath==========', sourcePath)
  console.log('zip desPath==========', desPath)

  const packageName = desPath || `${packageData.name}@${packageData.version}`
  const outputDirName = sourcePath || 'dist'
  const destinationPath = `${packageName}-${time}`

  console.log('zip 开始压缩==========', outputDirName, destinationPath)
  return new FileManagerPlugin({
    // events: {
    onEnd: {
      delete: ['./*.zip'],
      archive: [
        {
          source: `./${outputDirName}`,
          destination: `./${packageName}-${time}.zip`
        }
      ]
    }
    // }
  })
}

export default {
  plugin,
  extract,
  name: packageData.name,
  time
};
