import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ReportService {
  constructor(private supabaseService: SupabaseService) {}

  async getDeliveryReport(startDate: string, endDate: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('pedidos')
      .select('id, identificador, fecha_entrega, clientes(nombre)')
      .eq('estado', 'entregado')
      .gte('fecha_entrega', startDate)
      .lte('fecha_entrega', endDate);

    if (error) throw error;
    return data;
  }

  async getProfitReport(startDate: string, endDate: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('pedidos')
      .select('id, identificador, ganancia, ganancia_predeterminada')
      .eq('estado', 'entregado')
      .gte('fecha_pedido', startDate)
      .lte('fecha_pedido', endDate);

    if (error) throw error;

    const totalProfit = data.reduce((sum, order) => {
      const profit = order.ganancia || order.ganancia_predeterminada;
      return sum + Number(profit);
    }, 0);

    return {
      totalProfit,
      orderCount: data.length,
      averageProfit: data.length > 0 ? totalProfit / data.length : 0,
      orders: data,
    };
  }
}