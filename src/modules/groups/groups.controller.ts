import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import GroupsClasses from '../../entities/groups/groups.classes.entity';
import GroupsGroups from '../../entities/groups/groups.groups.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(@Inject(GroupsService) private groupsService: GroupsService) {}

  //-------------------------------------------------------------------
  // Groups
  //-------------------------------------------------------------------
  @Get('/groups')
  async getGroupsGroups(): Promise<GroupsGroups[]> {
    return await this.groupsService.getGroupsGroups();
  }

  @Get('/groups/:id')
  async getGroupsGroup(@Param('id') id: number): Promise<GroupsGroups> {
    return await this.groupsService.getGroupsGroup(id);
  }

  @Post('/groups')
  async addGroupsGroup(
    @Body() groups_group: GroupsGroups,
  ): Promise<GroupsGroups> {
    return await this.groupsService.addGroupsGroup(groups_group);
  }

  @Patch('/groups/:id')
  async updateGroupsGroup(
    @Param('id') id: number,
    @Body() fields: Partial<GroupsGroups>,
  ): Promise<GroupsGroups> {
    return await this.groupsService.updateGroupsGroup(id, fields);
  }

  @Delete('/groups/:id')
  async removeGroupsGroup(@Param('id') id: number): Promise<boolean> {
    return await this.groupsService.removeGroupsGroup(id);
  }

  //-------------------------------------------------------------------
  //Classes
  //-------------------------------------------------------------------
  @Get('/classes')
  async getGroupsClasses(): Promise<GroupsClasses[]> {
    return await this.groupsService.getGroupsClasses();
  }

  @Get('/classes/:id')
  async getGroupsClass(@Param('id') id: number): Promise<GroupsClasses> {
    return await this.groupsService.getGroupsClass(id);
  }

  @Post('/classes')
  async addGroupsClass(
    @Body() groups_class: GroupsClasses,
  ): Promise<GroupsClasses> {
    return await this.groupsService.addGroupsClass(groups_class);
  }

  @Patch('/classes/:id')
  async updateGroupsClass(
    @Param('id') id: number,
    @Body() fields: Partial<GroupsClasses>,
  ): Promise<GroupsClasses> {
    return await this.groupsService.updateGroupsClass(id, fields);
  }

  @Delete('/classes/:id')
  async removeGroupsClass(@Param('id') id: number): Promise<boolean> {
    return await this.groupsService.removeGroupsClass(id);
  }
}
