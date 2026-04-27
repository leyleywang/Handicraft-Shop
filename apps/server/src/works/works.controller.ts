import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  findAll(
    @Query('difficulty') difficulty?: string,
    @Query('preferenceMatch') preferenceMatch?: boolean,
  ) {
    return this.worksService.findAll({ difficulty, preferenceMatch });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worksService.findOne(+id);
  }

  @Post()
  create(@Body() createWorkDto: any) {
    return this.worksService.create(createWorkDto);
  }

  @Post(':id/contact')
  contactAuthor(@Param('id') id: string, @Body() contactDto: any) {
    return this.worksService.contactAuthor(+id, contactDto);
  }
}
