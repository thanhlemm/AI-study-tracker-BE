import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Password phải là chuỗi' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số',
    })
  currentPassword: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
    message: 'Mật khẩu mới phải chứa ít nhất 1 chữ cái và 1 số',
  })
  newPassword: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
    message: 'Mật khẩu xác nhận phải chứa ít nhất 1 chữ cái và 1 số',
  })
  passwordConfirmation: string;
}
