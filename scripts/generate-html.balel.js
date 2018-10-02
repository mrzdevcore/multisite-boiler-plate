import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import fs from 'fs';

export const renderHtml = (programs) => {
  const fileList = [];
  fs.readdirSync(path.join(__dirname, `../projects/${programs}/pug/`)).forEach(file => {
    if (/\.pug$/.test(file)) {
      const name = `${file}`.replace('.pug', '');
      fileList.push({
        name,
        file
      });
    }
  });
  return fileList.map(file => {
    return new HtmlWebpackPlugin({
      filename: file.name + '.html',
      template: path.join(__dirname, `../projects/${programs}/pug/${file.file}`)
    });
  });
}

export default renderHtml;
