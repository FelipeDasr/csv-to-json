import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('csv-to-json')
export class UploadCSVToConvertToJSONController {
  constructor() {}

  @Post('upload')
  public async uploadFile(@Res() response: Response) {
    return response.status(400).send('Method not implemented yet!');
  }
}
