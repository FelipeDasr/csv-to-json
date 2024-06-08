import {
  ArgumentMetadata,
  UnprocessableEntityException,
  Injectable,
  NotImplementedException,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  constructor(
    private readonly schema: Joi.AnySchema,
    private readonly convert = true,
  ) {}

  public transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema || !metadata.metatype) {
      throw new NotImplementedException('Missing validation schema');
    }

    const validationResult = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
      convert: this.convert,
    });

    if (validationResult.error) {
      throw new UnprocessableEntityException(
        validationResult.error.details.map((error) => error.message),
      );
    }

    return validationResult.value;
  }
}
