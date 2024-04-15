import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import {IsDateString, IsInt, IsNotEmpty, IsString} from "class-validator";

export class UpdateSessionDto extends PartialType(CreateSessionDto) {

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
