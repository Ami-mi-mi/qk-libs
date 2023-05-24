/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 15:20:37
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 16:47:31
 */
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.endsWith('.less')) {
          path.node.source.value = path.node.source.value.replace(
            /\.less$/,
            '.css'
          )
        }
      },
    },
  }
}
