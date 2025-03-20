// postbuild.js
import fs from 'fs';
import path from 'path';

const payloadPath = path.join(process.cwd(), 'src/app/(payload)');
const tempPath = path.join(process.cwd(), 'src/app/_payload');

if (fs.existsSync(tempPath)) {
  fs.renameSync(tempPath, payloadPath);
  console.log('Renamed _payload back to (payload).');
} else {
  console.log('No _payload folder found.');
}