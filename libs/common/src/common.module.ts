import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { DatabaseModule } from "./database/database.module";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { LoggingInterceptor } from "./filters/logging.interceptor";

@Module({
  imports: [DatabaseModule],
  providers: [CommonService, AllExceptionsFilter, LoggingInterceptor],
  exports: [
    CommonService,
    DatabaseModule,
    AllExceptionsFilter,
    LoggingInterceptor,
  ],
})
export class CommonModule {}
