import { Controller, Get, Query, Param } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  findAll(
    @Query('jewelryType') jewelryType?: string,
    @Query('category') category?: string,
    @Query('technique') technique?: string,
    @Query('hasTrialPack') hasTrialPack?: boolean,
  ) {
    return this.materialsService.findAll({
      jewelryType,
      category,
      technique,
      hasTrialPack,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Get('filters/categories')
  getCategories() {
    return this.materialsService.getCategories();
  }

  @Get('filters/techniques')
  getTechniques() {
    return this.materialsService.getTechniques();
  }
}
