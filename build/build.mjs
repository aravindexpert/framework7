import { rimraf } from 'rimraf';
import cpy from 'cpy';
import fs from 'fs';
import path from 'path';

function removeWebBlocks(content) {
  const newContent = content
    .split(new RegExp('<!-- web-start -->', 'g'))
    .map((part, index) => {
      if (index === 0) return part;
      if (part.indexOf('<!-- web-end -->') >= 0) {
        return part.split('<!-- web-end -->')[1];
      }
      return '';
    })
    .join('\n');

  return newContent
    .replace(/<!-- [a-z-]* -->\n/g, '\n')
    .replace(/([ ]{2,}\n)/g, '\n')
    .replace(/([\n]{2,})/g, '\n');
}

rimraf('./cordova/www').then(() => {
  fs.mkdirSync(path.resolve('cordova', 'www'));
  cpy(['./www/**/*.*'], 'cordova/www', {
    parents: true,
  }).then(() => {
    const index = fs.readFileSync('cordova/www/index.html', 'utf8');
    let newIndex = index.replace(
      '<!-- CORDOVA_PLACEHOLDER_DONT_REMOVE -->',
      '<script src="cordova.js"></script>',
    );
    newIndex = removeWebBlocks(newIndex);
    fs.writeFileSync('cordova/www/index.html', newIndex);
  });
});
