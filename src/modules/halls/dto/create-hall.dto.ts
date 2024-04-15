import {SeatDto} from "./seat.dto";

export class CreateHallDto {
    number: number;
    cinemaId: number;
    seats: SeatDto[]
}
