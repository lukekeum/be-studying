import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDTO {
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  comment?: string;
}
