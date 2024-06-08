import { InternalServerErrorException } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';

export function saveFile(
  filename: string,
  buffer: Buffer,
  scope: 'public' | 'private' = 'private',
) {
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'static',
    'temp',
    scope,
    filename,
  );

  return new Promise((resolve) => {
    // Save file to disk (temp folder)
    fs.writeFile(filePath, buffer, { encoding: 'utf-8' }, (err) => {
      if (err) throw new InternalServerErrorException(err);
      return resolve(null);
    });
  });
}

function createFolderIfNotExists(path_: string) {
  if (!fs.existsSync(path_)) {
    fs.mkdirSync(path_, { recursive: true });
  }
}

export function createTempFolderIfNotExists() {
  const tempFolder = path.resolve(__dirname, '..', '..', 'static', 'temp');
  createFolderIfNotExists(path.resolve(tempFolder, 'public'));
  createFolderIfNotExists(path.resolve(tempFolder, 'private'));
}
