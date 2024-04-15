import {SeatType} from "../../../entities/enums/seat-type.model";

export class SeatDto {
    row: number;
    seatNumber: number;
    seatType: SeatType = SeatType.COMMON
    available: boolean = true
}