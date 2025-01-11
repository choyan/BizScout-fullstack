import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class UserActivityFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  event?: string;
}
