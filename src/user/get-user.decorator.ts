import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetName = createParamDecorator((data, ctx: ExecutionContext): string =>{
    const req = ctx.switchToHttp().getRequest();
    return req.username;
})