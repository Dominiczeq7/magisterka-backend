import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';

@Module({
  controllers: [ClassroomsController],
  providers: [ClassroomsService]
})
export class ClassroomsModule {}
