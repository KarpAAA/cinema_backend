import {DataSourceOptions} from "typeorm";
import {User} from "../entities/user/user.model";
import {Movie} from "../entities/cinema/movie/movie.model";
import {Hall} from "../entities/cinema/session/hall/hall.model";
import {Seat} from "../entities/cinema/session/hall/seat.model";
import {Session} from "../entities/cinema/session/session.model";
import {Ticket} from "../entities/cinema/ticket.model";
import {AdditionalInfo} from "../entities/cinema/movie/movie.additional.info.model";
import {Comment} from "../entities/cinema/movie/comment.model";
import {Actor} from "../entities/cinema/movie/actor.model";
import {Row} from "../entities/cinema/session/hall/row.model";
import {TicketTypesModel} from "../entities/cinema/session/ticket.types.model";
import {Goods} from "../entities/cinema/goods.model";
import {Operation} from "../entities/opertaion.model";
import {Expense} from "../entities/stats/expense.model";
import {Income} from "../entities/stats/Income.model";


const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'cinema_kursova-db',
    username: 'postgres',
    password: 'root',
    //../entities/**/*.ts
    entities: [
        User,
        Movie,
        Hall,
        Seat,
        Row,
        Session,
        Ticket,
        AdditionalInfo,
        Comment,
        Actor,
        TicketTypesModel,
        Goods,
        Operation,
        Expense,
        Income
    ],
    migrations: [ __dirname + '/../migrations/**/*.ts'],
    synchronize: true
};

export default config;