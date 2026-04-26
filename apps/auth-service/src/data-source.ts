import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./users/entities/user.entity";
import * as path from "path";

config({ path: path.join(__dirname, "../.env") });

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "furniro",
  entities: [User],
  migrations: [path.join(__dirname, "/migrations/*.ts")],
  synchronize: false,
});
