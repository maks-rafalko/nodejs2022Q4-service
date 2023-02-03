import { IsNotEmpty } from 'class-validator';

// todo try to make it working
// export class CreateUserDto extends OmitType(User, [
//   'id',
//   'version',
//   'createdAt',
//   'updatedAt',
// ] as const) {}

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
