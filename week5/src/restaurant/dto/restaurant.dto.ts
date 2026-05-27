import { IsString, IsPhoneNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRestaurantDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  // @IsPhoneNumber()
  // TODO: 휴대폰 번호 검증 로직 수정
  phone!: string;
}

export class FindRestaurantDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
