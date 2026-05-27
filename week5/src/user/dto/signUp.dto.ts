import { IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  displayName!: string;

  @IsString()
  name!: string;

  @IsString()
  password!: string;
}
