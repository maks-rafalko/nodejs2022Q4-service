import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  year: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
