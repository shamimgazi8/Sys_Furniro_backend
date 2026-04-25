import { Module, DynamicModule, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: "postgres",
            host: config.get("DB_HOST", "localhost"),
            port: parseInt(config.get("DB_PORT", "5432")),
            username: config.get("DB_USERNAME", "postgres"),
            password: config.get("DB_PASSWORD", "password"),
            database: config.get("DB_NAME", "furniro"),
            entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
            synchronize: config.get("NODE_ENV") !== "production",
            logging: config.get("NODE_ENV") === "development",
            extra: {
              pool: {
                min: 2,
                max: 10,
              },
            },
          }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  static forFeature(entities: any[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }
}
