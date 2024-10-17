import { IsString, IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  cliente_id: number;

  @IsString()
  identificador: string;

  @IsOptional()
  @IsDate()
  fecha_entrega?: Date;

  @IsEnum(['pendiente', 'entregado'])
  estado: 'pendiente' | 'entregado';

  @IsOptional()
  @IsNumber()
  ganancia?: number;

  @IsOptional()
  @IsNumber()
  ganancia_predeterminada?: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsDate()
  fecha_entrega?: Date;

  @IsOptional()
  @IsEnum(['pendiente', 'entregado'])
  estado?: 'pendiente' | 'entregado';

  @IsOptional()
  @IsNumber()
  ganancia?: number;
}