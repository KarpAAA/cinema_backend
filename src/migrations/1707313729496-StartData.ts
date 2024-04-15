import {MigrationInterface, QueryRunner} from "typeorm";
import {faker} from "@faker-js/faker";
import {Movie} from "../entities/cinema/movie/movie.model";
import * as fs from "fs";
import * as csv from "csv-parser";

export class StartData1707313729496 implements MigrationInterface {
    name = 'StartData1707313729496'

    private async checkImage(imageUrl: string) {
        try {

            const res = await fetch("https://image.tmdb.org/t/p/original" + imageUrl);

            const contentType = res.headers.get('content-type');
            return res.ok && contentType && contentType.startsWith('image/');
        } catch (error) {
        }
        return false;
    }

    private readFilePromise = new Promise<any>((resolve, reject) => {
        const results = [];
        const requiredOptions = ["genres", "original_title", "overview", "poster_path", "release_date"];

        const fileStream = fs.createReadStream('movies_metadata.csv')
            .pipe(csv())
            .on('data', async (data) => {
                if(results.length <= 10 && data['release_date'] && parseInt(data['release_date'].substring(0, 4)) > 2014){
                    if (requiredOptions.every(value => data.hasOwnProperty(value))
                        && requiredOptions.every(value => data[value] && data[value].length > 6)
                        && await this.checkImage(data["poster_path"])
                    ) {
                        const ob = {};
                        requiredOptions.forEach(key => ob[key] = data[key]);
                        results.push(ob);
                        console.log(data["poster_path"]);
                    }
                }

            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });

    public async up(queryRunner: QueryRunner): Promise<void> {

        const results = await this.readFilePromise;
        console.log(results);

        await queryRunner.startTransaction();

        const moviesCount = 10;
        const minMovieWords = 1;
        const maxMovieWords = 4;

        for (let i = 0; i < moviesCount; i++) {
            const date =
                i % 2 === 0 ?
                    faker.date.recent({days: 30})
                    :
                    faker.date.soon({days: 30})

            const rental =
                this.formatDate(faker.date.recent({days: 10}), ".")
                + "-"
                + this.formatDate(faker.date.soon({days: 10}), ".");


            const actors = [];
            const actorsCount = faker.number.int({min: 2, max: 5});
            for (let i = 0; i < actorsCount; i++) {
                actors.push(
                    {
                        name: faker.person.fullName(),
                        image: faker.image.avatar()
                    }
                );
            }

            const comments = [];
            const commentsCount = faker.number.int({min: 2, max: 10});
            for (let i = 0; i < commentsCount; i++) {
                comments.push(
                    {
                        comment: faker.lorem.paragraph({min: 2, max: 5}),
                        author: faker.person.fullName(),
                        rating: faker.number.float({min: 0.0, max: 10.0, fractionDigits: 1})
                    }
                );
            }

            const genresString = "[{'id': 16, 'name': 'Animation'}, {'id': 35, 'name': 'Comedy'}, {'id': 10751, 'name': 'Family'}]";
            const validJSONString = genresString.replace(/'/g, '"');
            const genresData = JSON.parse(validJSONString);


            const genresNames = genresData.map(genre => genre.name).join(', ');

            const movieRepository = queryRunner.manager.getRepository(Movie);
            const newMovie = movieRepository.create(
                {
                    title: results[i]['original_title'],
                    image: "https://image.tmdb.org/t/p/w500" + results[i]['poster_path'],
                    dateTime: this.formatDate(date, '-'),
                    trailerLink: faker.image.urlLoremFlickr({category: 'movies'}),
                    age: faker.number.int({min: 16, max: 18}),
                    plot: results[i]['overview'],
                    additionalInfo: {
                        year: parseInt(results[i]['release_date'].substring(0, 4)),
                        country: faker.location.country(),
                        genre: genresNames,
                        producer: faker.person.fullName(),
                        scenario: faker.person.fullName(),
                        rental,
                        duration: faker.number.int({min: 90, max: 180}),
                    }
                }
            );

            newMovie.actors = actors;
            newMovie.comments = comments;
            await movieRepository.save(newMovie);


        }
        await queryRunner.commitTransaction();


    }

    private capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    private formatDate(date: Date, divider: string) {

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1, так як місяці у JavaScript рахуються з 0
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}${divider}${month}${divider}${day}`;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
