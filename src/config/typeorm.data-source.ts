import {DataSource} from "typeorm";
import config from "./typeorm-data-source.config";
export default new DataSource(config)