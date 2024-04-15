import {Injectable} from '@nestjs/common';
import {CreateOperationDto} from './dto/create-operation.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Session} from "../../entities/cinema/session/session.model";
import {Repository} from "typeorm";
import {Operation} from "../../entities/opertaion.model";
import {Ticket} from "../../entities/cinema/ticket.model";
import {User} from "../../entities/user/user.model";
import {Goods} from "../../entities/cinema/goods.model";
import {FinancesService} from "../finances/finances.service";
import {IncomeCategory} from "../../entities/stats/income-category";

@Injectable()
export class OperationsService {

    constructor(
        @InjectRepository(Operation) private operationRepository: Repository<Operation>,
        @InjectRepository(Session) private sessionRepository: Repository<Session>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Goods) private goodsRepository: Repository<Goods>,
        private financeService: FinancesService
    ) {
    }

    async create(createOperationDto: CreateOperationDto) {

        const {sessionId, userId, selectedGoods, selectedSeats} =
            createOperationDto;
        const session =
            await this.sessionRepository.findOne({where: {id: sessionId}, relations: ['movie']})
        const user = await this.userRepository.findOne({where: {id: userId}});

        const tickets: Ticket[] = selectedSeats.map(ss => {
            return {
                ...ss,
                session,
                user
            }
        });

        const goods: Goods[] = [];

        for (const {id, amount} of selectedGoods) {
            const foundGoods =
                {...await this.goodsRepository.findOne({where: {id}}), amount}

            goods.push(foundGoods);

        }
        const operation = this.operationRepository.create({
            sessionDate: session.startDateTime.toLocaleDateString(),
            movie: session.movie.title,
            price: createOperationDto.price,
            date: (new Date()).toLocaleDateString(),
            tickets,
            goods,
            user
        });

        await this.financeService.createIncome({
            date: (new Date()).toLocaleDateString(),
            sum: createOperationDto.price,
            category: IncomeCategory.TicketSales,
            user: user,
            id: null,
        });
        return this.operationRepository.save(operation);
    }

    async findAllUsersOperations(userId: number) {
        const user = await this.userRepository.findOne({where: {id: userId}});
        console.log(user);
        return this.operationRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: userId
                }
            }
        });
    }

}
