// prebuild.js
import fs from 'fs';
import path from 'path';

const payloadPath = path.join(process.cwd(), 'src/app/(payload)');
const tempPath = path.join(process.cwd(), 'src/app/_payload');

if (fs.existsSync(payloadPath)) {
  fs.renameSync(payloadPath, tempPath);
  console.log('Renamed (payload) to _payload for static export.');
} else {
  console.log('No (payload) folder found.');
}