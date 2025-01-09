import { IsOptional, IsString } from 'class-validator';
// import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class UserActivityFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  event?: string;

  // @IsOptional()
  // @IsEmail()
  // email?: string;

  // @IsOptional()
  // @Transform(({ value }) => value === 'true')
  // @IsBoolean()
  // isActive?: boolean;
}
