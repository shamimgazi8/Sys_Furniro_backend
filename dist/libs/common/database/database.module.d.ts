import { DynamicModule } from "@nestjs/common";
export declare class DatabaseModule {
    static forRoot(): DynamicModule;
    static forFeature(entities: any[]): DynamicModule;
}
