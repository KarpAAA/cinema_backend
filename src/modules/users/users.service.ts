import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {User} from "../../entities/user/user.model";
import {Role} from "../../entities/enums/role.model";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
                private usersRepository: Repository<User>) {
    }

    async create({password, login, ...other}: CreateUserDto) {
        return this.usersRepository.save(
            {
                password: await bcrypt.hash(password, 12),
                role: Role.USER,
                email: login,
                ...other
            });
    }

    findAll() {
        return this.usersRepository.find({
            relations: []
        });
    }

    findOne(id: number) {
        return this.usersRepository.findOne({where: {id: id}});
    }
    findOneByEmail(email: string) {
        return this.usersRepository.findOne({where: {email}});
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.save(
            {
                id,
                ...updateUserDto
            })
    }

    remove(id: number) {
        return this.usersRepository.delete({id});
    }
}
