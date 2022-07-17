import { Injectable } from '@nestjs/common';
import ClassroomsClassrooms from '../../entities/classrooms/classrooms.classrooms.entity';
import ClassroomsEquipment from '../../entities/classrooms/classrooms.equipments.entity';
import SetClassroomsEquipment from '../../entities/classrooms/set.classrooms.equipment.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class ClassroomsService {
  //-------------------------------------------------------------------
  // Classrooms
  //-------------------------------------------------------------------
  async getClassrooms(): Promise<ClassroomsClassrooms[]> {
    return await ClassroomsClassrooms.find({
      relations: [
        'structure',
        'classroom_equipment',
        'classroom_equipment.equipment',
      ],
    });
  }

  async getClassroom(id: number): Promise<ClassroomsClassrooms> {
    return await ClassroomsClassrooms.findOne(id, {
      relations: [
        'structure',
        'classroom_equipment',
        'classroom_equipment.equipment',
      ],
    });
  }

  async addClassroom(
    classroom: ClassroomsClassrooms,
  ): Promise<ClassroomsClassrooms> {
    const id = (await ClassroomsClassrooms.save(classroom)).id;
    const new_classroom = await this.getClassroom(id);
    return await new_classroom;
  }

  async updateClassroom(
    id: number,
    fields: Partial<ClassroomsClassrooms>,
  ): Promise<ClassroomsClassrooms> {
    const classroom = await this.getClassroom(id);
    const classroom_to_update = updateFromPartial(classroom, fields);

    classroom_to_update.classroom_equipment = classroom.classroom_equipment;
    let updated_classroom = await ClassroomsClassrooms.save(
      classroom_to_update,
    );
    if ('classroom_equipment' in fields) {
      const old_sets = classroom.classroom_equipment;
      const new_sets = fields.classroom_equipment;

      old_sets?.forEach((old_set) => {
        if (!new_sets.includes(old_set)) {
          SetClassroomsEquipment.remove(old_set);
        }
      });
      new_sets.forEach(async (new_set) => {
        if (!('id' in new_set)) {
          new_set.classroom = updated_classroom;
          await SetClassroomsEquipment.save(new_set);
        }
      });
    }
    await new Promise((f) => setTimeout(f, 100));
    updated_classroom = await this.getClassroom(id);
    return await updated_classroom;
  }

  async removeClassroom(id: number): Promise<boolean> {
    const is_removed = (await ClassroomsClassrooms.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // equipment
  //-------------------------------------------------------------------
  async getAllEquipment(): Promise<ClassroomsEquipment[]> {
    return await ClassroomsEquipment.find();
  }

  async getEquipment(id: number): Promise<ClassroomsEquipment> {
    return await ClassroomsEquipment.findOne(id);
  }

  async addEquipment(
    equipment: ClassroomsEquipment,
  ): Promise<ClassroomsEquipment> {
    const id = (await ClassroomsEquipment.save(equipment)).id;
    const new_equipment = await this.getEquipment(id);
    return await new_equipment;
  }

  async updateEquipment(
    id: number,
    fields: Partial<ClassroomsEquipment>,
  ): Promise<ClassroomsEquipment> {
    const equipment = await ClassroomsEquipment.findOne(id);

    const equipment_to_update = updateFromPartial(equipment, fields);
    await ClassroomsEquipment.save(equipment_to_update);
    const updated_equipment = await this.getEquipment(id);

    return await updated_equipment;
  }

  async removeEquipment(id: number): Promise<boolean> {
    const is_removed = (await ClassroomsEquipment.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
