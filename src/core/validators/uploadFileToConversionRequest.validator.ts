import * as Joi from 'joi';

import { IUploadFileToConversionRequest } from '../../app/dtos/requests';

export const uploadFileToConversionRequestValidator =
  Joi.object<IUploadFileToConversionRequest>({
    clientWebsocketId: Joi.string().required(),
  });
