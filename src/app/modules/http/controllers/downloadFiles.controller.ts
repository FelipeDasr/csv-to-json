import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { getTempPath } from 'src/core/utils/files';

@Controller('download')
export class DownloadFilesController {
  @Get(':filename')
  public async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(filename, {
      root: getTempPath('public'),
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }
}
