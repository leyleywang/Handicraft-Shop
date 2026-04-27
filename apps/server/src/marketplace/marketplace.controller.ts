import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('idle')
  getIdleItems(
    @Query('userId') userId?: string,
    @Query('category') category?: string,
  ) {
    return this.marketplaceService.getIdleItems({ 
      userId: userId ? +userId : undefined,
      category 
    });
  }

  @Get('requests')
  getMaterialRequests(
    @Query('userId') userId?: string,
    @Query('status') status?: string,
  ) {
    return this.marketplaceService.getMaterialRequests({ 
      userId: userId ? +userId : undefined,
      status 
    });
  }

  @Get('idle/:id')
  getIdleItem(@Param('id') id: string) {
    return this.marketplaceService.getIdleItem(+id);
  }

  @Get('requests/:id')
  getMaterialRequest(@Param('id') id: string) {
    return this.marketplaceService.getMaterialRequest(+id);
  }

  @Post('idle')
  publishIdleItem(@Body() publishDto: any) {
    return this.marketplaceService.publishIdleItem(publishDto);
  }

  @Post('requests')
  publishMaterialRequest(@Body() publishDto: any) {
    return this.marketplaceService.publishMaterialRequest(publishDto);
  }
}
