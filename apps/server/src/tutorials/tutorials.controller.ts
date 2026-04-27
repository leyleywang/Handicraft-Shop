import { Controller, Get, Param, Query } from '@nestjs/common';
import { TutorialsService } from './tutorials.service';

@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Get()
  findAll(
    @Query('type') type?: 'video' | 'article',
    @Query('difficulty') difficulty?: string,
  ) {
    return this.tutorialsService.findAll({ type, difficulty });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorialsService.findOne(+id);
  }
}
