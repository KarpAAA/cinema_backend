import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {Role} from "../entities/enums/role.model";
import {UsersService} from "../modules/users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(
        login: string,
        pass: string,
    ): Promise<{
        access_token: string;
        user: { birthdate: string; role: Role; city: string; phone: string; name: string; id: number; email: string }
    }> {

        const user = await this.usersService.findOneByEmail(login);
        if (!(await bcrypt.compare(pass, user.password))){
            throw new UnauthorizedException();
        }

        const {password, ...other } = user;
        const payload = {...other};

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {...other}
        };
    }

    async verifyUser(reqUser: any){
        const {password,...user} = await this.usersService.findOneByEmail(reqUser.email);
        return user;
    }

}
