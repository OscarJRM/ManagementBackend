import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('pedidos')
      .insert(createOrderDto)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findAll(estado?: string) {
    let query = this.supabaseService.getClient()
      .from('pedidos')
      .select('*, clientes(*)');

    if (estado) {
      query = query.eq('estado', estado);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('pedidos')
      .select('*, clientes(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Order with ID "${id}" not found`);
    return data;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { data: oldOrder } = await this.supabaseService.getClient()
      .from('pedidos')
      .select('estado')
      .eq('id', id)
      .single();

    const { data, error } = await this.supabaseService.getClient()
      .from('pedidos')
      .update(updateOrderDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Order with ID "${id}" not found`);

    if (oldOrder.estado !== updateOrderDto.estado) {
      await this.supabaseService.getClient()
        .from('historial_estado_pedidos')
        .insert({
          pedido_id: id,
          estado_anterior: oldOrder.estado,
          estado_nuevo: updateOrderDto.estado,
        });
    }

    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabaseService.getClient()
      .from('pedidos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}