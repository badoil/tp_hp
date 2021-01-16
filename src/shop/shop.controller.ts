import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Response } from 'express';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { SearchShopDto } from '../admin/dto/search.shop.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/insert')
  @Render('shop/insert')
  getInsert() {
    return {};
  }

  // @Get('/list')
  // @Render('web/admin/shop/list')
  // async getList(@Query('keyword') keyword: SearchShopDto) {
  //   const shopList = await this.shopService.getUser(keyword);
  //   console.log('shoplist contorller: ', shopList);
  //   return {
  //     query: query,
  //     shopList: shopList,
  //   };
  // }

  @UseGuards(RolesGuard)
  @Get('user/list')
  @Roles('shop')
  @Render('web/shop/user/shop')
  async getUsers() {
    const userList = await this.shopService.getUsers();
    console.log('userList:', userList);
    return {
      userList: userList,
    };
  }

  @Get('user/duplicate')
  async checkName(@Query('userName') userName: string) {
    console.log('userName:', userName);
    const name = await this.shopService.checkName(userName);
    console.log('name:', name);
    return name;
  }

  @Get('user/searchUser')
  async getSearchUser(@Query() query: string) {
    console.log('query:', query);
    const user = await this.shopService.getSearchUser(query);
    console.log('user:', user);
    return user;
  }

  @Get('user/searchUser/list')
  @Render('web/shop/user/searchUser')
  async getSearchUserList(@Query('userName') userName: string) {
    const userList = await this.shopService.getSearchUser(userName);
    return {
      userList: userList,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Get('user/registerUser')
  @Render('web/shop/user/registerUser')
  registerUserRender() {
    return {};
  }

  @Post('user/registerUser')
  async createUser(@Body() bodyData: CreateUserDto) {
    console.log('controllerCreateUser: ', bodyData);
    const newUser = await this.shopService.createUser(bodyData);
    console.log('newUser:', newUser);
    return newUser;
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Put('/user/updateUser')
  updateUser(@Body() bodyData: UpdateUserDto, @Res() res: Response) {
    console.log('controllerUpdateBodyData:', bodyData);
    return this.shopService.updateUser(bodyData, res);
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Get('user/updateUser')
  @Render('web/shop/user/updateUser')
  goToUpdateUser() {
    return {};
  }

  @UseGuards(RolesGuard)
  @Roles('shop')
  @Delete()
  deleteUser(@Query('phoneNumber') phoneNumber: string, @Res() res: Response) {
    return this.shopService.deleteUser(phoneNumber, res);
  }
}
