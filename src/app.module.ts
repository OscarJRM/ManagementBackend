import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { ReportModule } from './report/report.module';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrderModule,
    CustomerModule,
    ReportModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}