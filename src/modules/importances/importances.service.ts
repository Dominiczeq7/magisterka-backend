import { Injectable } from '@nestjs/common';
import ImportancesAbsences from '../../entities/importances/importances.absences.entity';
import ImportancesClasses from '../../entities/importances/importances.classes.entity';
import ImportancesDemands from '../../entities/importances/importances.demands.entity';
import ImportancesEquipments from '../../entities/importances/importances.equipments.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class ImportancesService {
  //-------------------------------------------------------------------
  // demands
  //-------------------------------------------------------------------
  async getImportancesDemands(): Promise<ImportancesDemands[]> {
    return await ImportancesDemands.find();
  }

  async getImportancesDemand(id: number): Promise<ImportancesDemands> {
    return await ImportancesDemands.findOne(id);
  }

  async addImportancesDemand(
    item: ImportancesDemands,
  ): Promise<ImportancesDemands> {
    const id = (await ImportancesDemands.save(item)).id;
    const new_item = await this.getImportancesDemand(id);
    return await new_item;
  }

  async updateImportancesDemand(
    id: number,
    fields: Partial<ImportancesDemands>,
  ): Promise<ImportancesDemands> {
    const item = await ImportancesDemands.findOne(id);

    const item_to_update = updateFromPartial(item, fields);
    await ImportancesDemands.save(item_to_update);
    const updated_item = await this.getImportancesDemand(id);

    return await updated_item;
  }

  async removeImportancesDemand(id: number): Promise<boolean> {
    const is_removed = (await ImportancesDemands.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // importances classes
  //-------------------------------------------------------------------
  async getImportancesClasses(): Promise<ImportancesClasses[]> {
    return await ImportancesClasses.find({
      relations: ['demand', 'classroom'],
    });
  }

  async getImportancesClass(id: number): Promise<ImportancesClasses> {
    return await ImportancesClasses.findOne(id, {
      relations: ['demand', 'classroom'],
    });
  }

  async addImportancesClass(
    item: ImportancesClasses,
  ): Promise<ImportancesClasses> {
    const id = (await ImportancesClasses.save(item)).id;
    const new_item = await this.getImportancesClass(id);
    return await new_item;
  }

  async updateImportancesClass(
    id: number,
    fields: Partial<ImportancesClasses>,
  ): Promise<ImportancesClasses> {
    const item = await ImportancesClasses.findOne(id);

    const item_to_update = updateFromPartial(item, fields);
    await ImportancesClasses.save(item_to_update);
    const updated_item = await this.getImportancesClass(id);

    return await updated_item;
  }

  async removeImportancesClass(id: number): Promise<boolean> {
    const is_removed = (await ImportancesClasses.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // importances equipment
  //-------------------------------------------------------------------
  async getImportancesEquipments(): Promise<ImportancesEquipments[]> {
    return await ImportancesEquipments.find({
      relations: ['equipment', 'demand'],
    });
  }

  async getImportancesEquipment(id: number): Promise<ImportancesEquipments> {
    return await ImportancesEquipments.findOne(id, {
      relations: ['equipment', 'demand'],
    });
  }

  async addImportancesEquipment(
    item: ImportancesEquipments,
  ): Promise<ImportancesEquipments> {
    const id = (await ImportancesEquipments.save(item)).id;
    const new_item = await this.getImportancesEquipment(id);
    return await new_item;
  }

  async updateImportancesEquipment(
    id: number,
    fields: Partial<ImportancesEquipments>,
  ): Promise<ImportancesEquipments> {
    const item = await ImportancesEquipments.findOne(id);

    const item_to_update = updateFromPartial(item, fields);
    await ImportancesEquipments.save(item_to_update);
    const updated_item = await this.getImportancesEquipment(id);

    return await updated_item;
  }

  async removeImportancesEquipment(id: number): Promise<boolean> {
    const is_removed = (await ImportancesEquipments.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // importances absences
  //-------------------------------------------------------------------
  async getImportancesAbsences(): Promise<ImportancesAbsences[]> {
    return await ImportancesAbsences.find({
      relations: ['teacher'],
    });
  }

  async getImportancesAbsence(id: number): Promise<ImportancesAbsences> {
    return await ImportancesAbsences.findOne(id, {
      relations: ['teacher'],
    });
  }

  async addImportancesAbsence(
    item: ImportancesAbsences,
  ): Promise<ImportancesAbsences> {
    const id = (await ImportancesAbsences.save(item)).id;
    const new_item = await this.getImportancesAbsence(id);
    return await new_item;
  }

  async updateImportancesAbsence(
    id: number,
    fields: Partial<ImportancesAbsences>,
  ): Promise<ImportancesAbsences> {
    const item = await ImportancesAbsences.findOne(id);

    const item_to_update = updateFromPartial(item, fields);
    await ImportancesAbsences.save(item_to_update);
    const updated_item = await this.getImportancesAbsence(id);

    return await updated_item;
  }

  async removeImportancesAbsence(id: number): Promise<boolean> {
    const is_removed = (await ImportancesAbsences.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
