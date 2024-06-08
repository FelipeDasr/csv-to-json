import {
  Injectable,
  UnprocessableEntityException,
  PipeTransform,
} from '@nestjs/common';
import { nanoid } from 'nanoid';

export interface IValidatedFile extends Express.Multer.File {
  internalFileName: string;
}

export interface IFileValidatorSettings {
  allowedMimeTypes?: string[];
  maxSizeInBytes?: number;
  optional?: boolean;
}

@Injectable()
export class FileValidatorPipe implements PipeTransform<any> {
  constructor(private readonly settings?: IFileValidatorSettings) {}

  public transform(value: Express.Multer.File) {
    if (!value) {
      if (this.settings?.optional) return null;
      throw new UnprocessableEntityException('File is required');
    }

    return this.validateFile(value);
  }

  private validateFile(value: Express.Multer.File): IValidatedFile {
    const fileExtension = value.originalname.split('.').pop();

    if (this.settings) {
      if (this.settings.allowedMimeTypes) {
        const isMimeTypeAllowed = this.settings.allowedMimeTypes.includes(
          value.mimetype,
        );

        if (!isMimeTypeAllowed) {
          throw new UnprocessableEntityException(
            `File type not allowed. Supported types: [${this.settings.allowedMimeTypes.join(', ')}]`,
          );
        }
      }

      if (this.settings.maxSizeInBytes) {
        const isFileSizeValid = value.size <= this.settings.maxSizeInBytes;

        if (!isFileSizeValid) {
          throw new UnprocessableEntityException(
            `File size exceeds the limit of ${this.settings.maxSizeInBytes} bytes`,
          );
        }
      }
    }

    return {
      ...value,
      internalFileName: `${nanoid()}.${fileExtension}`,
    };
  }
}
