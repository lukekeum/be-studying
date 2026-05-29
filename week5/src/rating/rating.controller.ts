import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtGuard } from 'src/common/security/guard/jwt.guard';
import { CreateRatingDTO } from './dto/craete.dto';
import { UpdateRatingDTO } from './dto/update.dto';
import type { AuthenticatedRequest } from 'src/common/security';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  async getRatings() {
    // TODO: 오른차순/내림차순 등 sort option 받기 query parameter
    return await this.ratingService.getRatings();
  }

  @Get('/user')
  @UseGuards(JwtGuard)
  async getUserRatings(@Request() req: AuthenticatedRequest) {
    // TODO: 오른차순/내림차순 등 sort option 받기 query parameter
    const user = req.user;

    return await this.ratingService.getRatingByUserId(user);
  }

  @Get('/user/:id')
  async getRatingByUserId(@Param('id') id: string) {
    return await this.ratingService.getRatingByUserId(id);
  }

  @Get('/restaurant/:name')
  async getRatingsByRestaurant(@Param('name') name: string) {
    // TODO: 오른차순/내림차순 등 sort option 받기 query parameter
    return await this.ratingService.getRatingsByRestaurant(name);
  }

  @Post('/:name')
  @UseGuards(JwtGuard)
  createRating(
    @Request() req: AuthenticatedRequest,
    @Param('name') name: string,
    @Body() body: CreateRatingDTO,
  ) {}

  @Patch('/:name')
  @UseGuards(JwtGuard)
  updateRating(
    @Request() req: AuthenticatedRequest,
    @Param('name') name: string,
    @Body() { comment }: UpdateRatingDTO,
  ) {
    const user = req.user;
  }
}
