import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('clientes')
      .insert(createCustomerDto)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('clientes')
      .select('*');

    if (error) throw error;
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Customer with ID "${id}" not found`);
    return data;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('clientes')
      .update(updateCustomerDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Customer with ID "${id}" not found`);
    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabaseService.getClient()
      .from('clientes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}