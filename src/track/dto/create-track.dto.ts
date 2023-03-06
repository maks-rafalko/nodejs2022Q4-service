import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration: number;
}
