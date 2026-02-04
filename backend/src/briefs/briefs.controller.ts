import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';

@Controller('briefs')
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  @Get()
  getBriefs() {
    return this.briefsService.getBriefs();
  }

  @Post()
  createBrief(@Body() dto: CreateBriefDto) {
    return this.briefsService.createBrief(dto);
  }

  @Patch(':id')
  updateBrief(@Param('id') id: string, @Body() dto: UpdateBriefDto) {
    return this.briefsService.updateBrief(id, dto);
  }

  @Delete(':id')
  archiveBrief(@Param('id') id: string) {
    return this.briefsService.archiveBrief(id);
  }
}
