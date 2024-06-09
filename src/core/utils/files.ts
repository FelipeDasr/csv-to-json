import { InternalServerErrorException } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';

type TempFolderScope = 'public' | 'private';

const tempFolderPath = path.resolve(__dirname, '..', '..', 'static', 'temp');

export function deleteFile(
  filename: string,
  scope: TempFolderScope = 'private',
) {
  fs.unlinkSync(path.resolve(tempFolderPath, scope, filename));
}

export function saveFile(
  filename: string,
  buffer: Buffer,
  scope: TempFolderScope = 'private',
) {
  const filePath = path.resolve(tempFolderPath, scope, filename);

  return new Promise((resolve) => {
    // Save file to disk (temp folder)
    fs.writeFile(filePath, buffer, { encoding: 'utf-8' }, (err) => {
      if (err) throw new InternalServerErrorException(err);
      return resolve(null);
    });
  });
}

export function getFileStream(
  filename: string,
  scope: TempFolderScope = 'private',
) {
  const filePath = path.resolve(tempFolderPath, scope, filename);

  return fs.createReadStream(filePath, 'utf-8');
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
