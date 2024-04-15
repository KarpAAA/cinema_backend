import {Injectable} from '@nestjs/common';
import {CreateMovieDto} from './dto/create-movie.dto';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {Field} from "multer";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as fs from "fs";
import * as path from "path";
import {Movie} from "../../entities/cinema/movie/movie.model";

@Injectable()
export class MoviesService {

    saveBufferToFile(buffer: Buffer, filePath: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, buffer, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filePath);
                }
            });
        });
    }


    constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) {

    }

    async create(movieImage: Express.Multer.File, createMovieDto: CreateMovieDto) {
        // return this.movieRepository.save({image: movieImage.buffer, ...createMovieDto})
    }

    async findAll() {
        return await this.movieRepository.find(
            { relations: ['additionalInfo', 'comments', 'actors']})
    }

    async findOne(id: number) {
        const {image, ...movieDTO} =
            await this.movieRepository.findOne({where: {id}});
        return movieDTO;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
