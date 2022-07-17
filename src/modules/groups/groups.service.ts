import { Injectable } from '@nestjs/common';
import GroupsClasses from '../../entities/groups/groups.classes.entity';
import GroupsGroups from '../../entities/groups/groups.groups.entity';
import { updateFromPartial } from '../../utils/conversion';

@Injectable()
export class GroupsService {
  //-------------------------------------------------------------------
  // Groups
  //-------------------------------------------------------------------
  async getGroupsGroups(): Promise<GroupsGroups[]> {
    return await GroupsGroups.find({ relations: ['class'] });
  }

  async getGroupsGroup(id: number): Promise<GroupsGroups> {
    return await GroupsGroups.findOne(id, { relations: ['class'] });
  }

  async addGroupsGroup(groups_group: GroupsGroups): Promise<GroupsGroups> {
    const id = (await GroupsGroups.save(groups_group)).id;
    const new_groups_group = await this.getGroupsGroup(id);
    return await new_groups_group;
  }

  async updateGroupsGroup(
    id: number,
    fields: Partial<GroupsGroups>,
  ): Promise<GroupsGroups> {
    const groupsGroup = await GroupsGroups.findOne(id);

    const groups_group_to_update = updateFromPartial(groupsGroup, fields);
    await GroupsGroups.save(groups_group_to_update);
    const updated_groups_group = await this.getGroupsGroup(id);

    return await updated_groups_group;
  }

  async removeGroupsGroup(id: number): Promise<boolean> {
    const is_removed = (await GroupsGroups.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------------------------------------------------
  // Classes
  //-------------------------------------------------------------------
  async getGroupsClasses(): Promise<GroupsClasses[]> {
    return await GroupsClasses.find({ relations: ['structure'] });
  }

  async getGroupsClass(id: number): Promise<GroupsClasses> {
    return await GroupsClasses.findOne(id, { relations: ['structure'] });
  }

  async addGroupsClass(groups_class: GroupsClasses): Promise<GroupsClasses> {
    const id = (await GroupsClasses.save(groups_class)).id;
    const new_groups_class = await this.getGroupsClass(id);
    return await new_groups_class;
  }

  async updateGroupsClass(
    id: number,
    fields: Partial<GroupsClasses>,
  ): Promise<GroupsClasses> {
    const groupsClass = await GroupsClasses.findOne(id);

    const groups_class_to_update = updateFromPartial(groupsClass, fields);
    await GroupsClasses.save(groups_class_to_update);
    const updated_groups_class = await this.getGroupsClass(id);

    return await updated_groups_class;
  }

  async removeGroupsClass(id: number): Promise<boolean> {
    const is_removed = (await GroupsClasses.delete(id)).affected;
    return await (is_removed ? true : false);
  }
}
