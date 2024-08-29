import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    try {
      await this.reportsService.create(createReportDto);
      return { success: true, message: 'Create Successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.reportsService.findAll();
      return { success: true, message: 'Fetch successful', data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.reportsService.findOne(+id);
      return { success: true, message: 'Fetch successful', data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    try {
      await this.reportsService.update(+id, updateReportDto);
      return { success: true, message: 'Update successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.reportsService.remove(+id);
      return { success: true, message: 'Delete successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
