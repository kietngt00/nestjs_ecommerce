import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "src/user/role.enum";


@Injectable()
export class AdminGuard implements CanActivate{
    canActivate(context:ExecutionContext):boolean{
        const req = context.switchToHttp().getRequest();
        const {roles} = req.user;
        if(roles.includes(Role.ADMIN))
            return true;
        return false;
    }
}