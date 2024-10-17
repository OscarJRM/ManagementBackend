import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('deliveries')
  getDeliveryReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportService.getDeliveryReport(startDate, endDate);
  }

  @Get('profits')
  getProfitReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportService.getProfitReport(startDate, endDate);
  }
}