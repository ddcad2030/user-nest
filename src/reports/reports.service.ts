import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORT_REPOSITORY')
    private repo: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = await this.repo.create(createReportDto);
    return this.repo.save(report);
  }

  async findAll(): Promise<Report[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const existingReport = await this.findOne(id);
    const report = this.repo.merge(existingReport, updateReportDto);
    return await this.repo.save(report);
  }

  async remove(id: number): Promise<Report> {
    const existingReport = await this.findOne(id);
    return this.repo.remove(existingReport);
  }
}
