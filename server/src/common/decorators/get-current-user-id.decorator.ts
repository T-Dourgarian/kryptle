import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user['id']
})