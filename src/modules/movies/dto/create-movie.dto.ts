import {Column} from "typeorm";

export class CreateMovieDto {
    name: string;
    year: number
    durationInMinutes: number
}
