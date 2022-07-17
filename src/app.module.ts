import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from './modules/groups/groups.module';
import { UsersModule } from './modules/users/users.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { StructuresModule } from './modules/structures/structures.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ImportancesModule } from './modules/importances/importances.module';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          bigNumberStrings: false,
          synchronize: true,
          logging: true,
          migrationsRun: false,
        }),
    }),
    GroupsModule,
    UsersModule,
    ClassroomsModule,
    ActivitiesModule,
    StructuresModule,
    SchedulesModule,
    ImportancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
