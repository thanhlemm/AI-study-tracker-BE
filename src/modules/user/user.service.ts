import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto';
import {
  comparePasswordHelper,
  hashPasswordHelper,
} from '@/common/utils/password-helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
  ) {}

  isEmailExist = async (email: string): Promise<boolean> => {
    const user = await this.UserRepo.findOne({ where: { email } });
    return !!user;
  };

  async updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ) {
    return await this.UserRepo.update(
      { id: userId },
      { hashedRefreshToken: hashedRefreshToken ?? undefined },
    );
  }

  async create(createUserDto: CreateUserDto) {
    const { email, name, password, avatarUrl, timezone } = createUserDto;

    //check email
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new BadRequestException(
        'Email đã tồn tại. Vui lòng sử dụng email khác.',
      );
    }

    //hash password
    const hashPassword = await hashPasswordHelper(password);
    const newUser = this.UserRepo.create({
      email,
      name,
      password: hashPassword,
      avatarUrl,
      timezone,
    });
    return await this.UserRepo.save(newUser);
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.UserRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Người dùng với ID ${id} không tồn tại.`);
    }
    return user;
  }

  async update(id: string, updateData: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại.');
    }

    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await this.isEmailExist(updateData.email);
      if (emailExists) {
        throw new BadRequestException(
          'Email đã tồn tại. Vui lòng sử dụng email khác.',
        );
      }
    }

    const { password, ...dataToUpdate } = updateData as any;

    dataToUpdate.updatedAt = new Date();

    await this.UserRepo.update(id, dataToUpdate);

    return await this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại.');
    }
    return await this.UserRepo.remove(user);
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    const { currentPassword, newPassword, passwordConfirmation } = data;

    // 1. Kiểm tra new password và confirmation có khớp không
    if (newPassword !== passwordConfirmation) {
      throw new BadRequestException(
        'Mật khẩu mới và xác nhận mật khẩu không khớp.',
      );
    }

    // 2. Kiểm tra new password khác current password
    if (currentPassword === newPassword) {
      throw new BadRequestException(
        'Mật khẩu mới phải khác mật khẩu hiện tại.',
      );
    }

    // 3. Lấy user từ database (bao gồm password)
    const user = await this.findOne(userId);

    // 4. Verify current password
    const isPasswordValid = await comparePasswordHelper(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng.');
    }

    // 5. Hash new password
    const hashedNewPassword = await hashPasswordHelper(newPassword);

    // 6. Update password
    await this.UserRepo.update(userId, {
      password: hashedNewPassword,
    });

    return {
      message: 'Đổi mật khẩu thành công.',
    };
  }
}
