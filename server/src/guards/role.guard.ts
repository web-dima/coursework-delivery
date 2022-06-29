import {
    CanActivate,
    ExecutionContext,
    Injectable, mixin, Type,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt"
import {EmployeeService} from "../modules/employee/employee.service";
import {EmployeeRoles} from "../modules/employee/entities/employee.entity";



export const RoleGuard = (role?: EmployeeRoles): Type<CanActivate> => {
    @Injectable()
    class RoleGuardClass implements CanActivate {
        constructor(private JwtService: JwtService,
                    private employeeService: EmployeeService) {}

        async canActivate(
            context: ExecutionContext,
        ): Promise<boolean> {
            try {
                const req = context.switchToHttp().getRequest()
                const token = req.headers?.authorization?.split(" ")[1]
                // console.log(token)
                const {id} = this.JwtService.verify(token)
                // console.log(id)
                const user = await this.employeeService.findById(id)

                req.user = user
                // console.log(user)
                return role ? role === user.role : true

            }catch (e) {
                throw new UnauthorizedException("пользователь не авторизован")
            }

        }
    }

    return mixin(RoleGuardClass)
}
