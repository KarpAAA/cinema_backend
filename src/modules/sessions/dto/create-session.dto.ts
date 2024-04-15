import {IsNotEmpty, IsInt, IsString, Matches, IsDateString} from "class-validator";

export class CreateSessionDto {

    @IsInt()
    @IsNotEmpty()
    movieId: number

    @IsInt()
    @IsNotEmpty()
    hallId: number

    @IsString()
    @IsDateString()
    startDateTime: string
}
