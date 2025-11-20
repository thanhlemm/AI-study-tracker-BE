import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
  Req,
  ForbiddenException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // Change Password Endpoint
  @UseGuards(JwtAuthGuard)
  @Patch('me/change-password')
  async changePassword(
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
  

    return this.userService.changePassword(req.user.id, changePasswordDto);
  }
}
