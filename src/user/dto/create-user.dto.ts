import { IsNotEmpty, IsString } from 'class-validator';

// todo try to make it working
// export class CreateUserDto extends OmitType(User, [
//   'id',
//   'version',
//   'createdAt',
//   'updatedAt',
// ] as const) {}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
