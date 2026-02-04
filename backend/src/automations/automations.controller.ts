import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';

@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  getAutomations() {
    return this.automationsService.getAutomations();
  }

  @Post()
  createAutomation(@Body() dto: CreateAutomationDto) {
    return this.automationsService.createAutomation(dto);
  }

  @Patch(':id')
  updateAutomation(@Param('id') id: string, @Body() dto: UpdateAutomationDto) {
    return this.automationsService.updateAutomation(id, dto);
  }

  @Delete(':id')
  archiveAutomation(@Param('id') id: string) {
    return this.automationsService.archiveAutomation(id);
  }

  @Post(':id/run')
  runAutomation(@Param('id') id: string) {
    return this.automationsService.runAutomation(id);
  }
}
