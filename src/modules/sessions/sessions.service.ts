import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateSessionDto} from './dto/create-session.dto';
import {UpdateSessionDto} from './dto/update-session.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Session} from "../../entities/cinema/session/session.model";
import {Movie} from "../../entities/cinema/movie/movie.model";
import {Hall} from "../../entities/cinema/session/hall/hall.model";
import {Ticket} from "../../entities/cinema/ticket.model";
import {SeatType} from "../../entities/enums/seat-type.model";


@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session) private sessionRepository: Repository<Session>,
        @InjectRepository(Movie) private movieRepository: Repository<Movie>,
        @InjectRepository(Hall) private hallRepository: Repository<Hall>,
        @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    ) {
    }

    async create({movieId, hallId, ...other}: CreateSessionDto) {
        const movie = await this.movieRepository.findOne({where: {id: movieId}});
        const hall = await this.hallRepository.findOne({where: {id: hallId}});
        if (!movie || !hall) throw new BadRequestException();
        return this.sessionRepository.save({movie, hall, ...other})
    }

    async findAll() {
        const sessions = await this.sessionRepository.find({
            relations: ["hall", "movie", "ticketType", "hall.rows", "hall.rows.seats", "movie.additionalInfo"]
        });

        return Promise.all(sessions.map(session => this.sessionToSessionDTO(session)));
    }

    private async sessionToSessionDTO(session: Session) {
        const { ticketType, startDateTime, ...other } = session;
        const sessionsTickets = await this.ticketRepository.find({
            where: { session }
        });

        const ticketTypes = ticketType.reduce((acc, cur) => {
            const type = cur.type;
            acc[type] = { price: cur.price };
            return acc;
        }, {});

        const newRows = session.hall.rows.map(row => {
            const newSeats = row.seats.map(seat => {
                const ticket = sessionsTickets.find(ticket => ticket.seat === seat.number && ticket.row === row.number);
                return ticket ? { ...seat, type: SeatType.UNAVAILABLE } : seat;
            });
            return { ...row, seats: newSeats };
        });

        return {
            ...other,
            hall: { ...session.hall, rows: newRows.map(row => ({ ...row })) }, // Копіюємо кожен ряд, щоб уникнути мутацій
            ...this.formatDate(startDateTime),
            ticketTypes
        };
    }

    async findOne(id: number) {
        const session = await this.sessionRepository.findOne({
            where: {id},
            relations: ["hall", "movie", "ticketType", "hall.rows", "hall.rows.seats", "movie.additionalInfo"]
        });
        return this.sessionToSessionDTO(session);
    }

    async update(id: number, {movieId, hallId, ...other}: UpdateSessionDto) {
        const movie = await this.movieRepository.findOne({where: {id: movieId}});
        const hall = await this.hallRepository.findOne({where: {id: hallId}});

        return this.sessionRepository.save({movie, hall, ...other});
    }

    remove(id: number) {
        return this.sessionRepository.delete({id});
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}`;

        return {
            time: formattedTime,
            date: formattedDate
        };
    }
}
