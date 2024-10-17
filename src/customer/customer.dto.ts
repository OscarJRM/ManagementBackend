import { IsString, IsPhoneNumber, IsEmail, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  nombre: string;

  @IsPhoneNumber()
  telefono: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsPhoneNumber()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}