import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @CurrentUser decorator để lấy user info từ JWT token
 * Sử dụng: @CurrentUser() user: UserEntity hoặc @CurrentUser('id') userId: string
 *
 * Ví dụ:
 * - @CurrentUser() user: UserEntity (lấy toàn bộ user object)
 * - @CurrentUser('id') userId: string (lấy riêng user.id)
 * - @CurrentUser('email') email: string (lấy riêng user.email)
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // Nếu không truyền data, trả về toàn bộ user object
    if (!data) {
      return user;
    }

    // Nếu truyền data (ví dụ 'id'), trả về user[data]
    return user[data];
  },
);
