import fs from 'fs/promises';
import { getDBPath } from '../../utils/database';
import { HttpException } from '@nestjs/common';

export class RestaurantRepository {
  private async readData() {
    const fileData = await fs.readFile(getDBPath(), { encoding: 'utf-8' });
    console.log(fileData);
    return JSON.parse(fileData || '[]');
  }

  private async writeData(data) {
    await fs.writeFile(getDBPath(), JSON.stringify(data));
  }

  async create(data) {
    const rdata = await this.readData();
    rdata.push(data);
    await this.writeData(rdata);
  }

  async findAll() {
    const data = await this.readData();
    return data;
  }

  async findByPhone(phone) {
    const data = await this.readData();
    return data.find((item) => item.phone === phone);
  }

  async findByName(name) {
    const data = await this.readData();
    return data.find((item) => item.name === name);
  }

  async update(name, updatedItem) {
    const data = await this.readData();
    const index = data.findIndex((item) => item.name == name);
    if (index === -1) {
      throw new HttpException(
        {
          message: '데이터베이스에서 데이터를 찾을 수 없습니다',
        },
        404,
      );
    }
    data[index] = { ...data[index], ...updatedItem };
    await this.writeData(data);
  }

  async delete(name) {
    const data = await this.readData();
    const deletedData = data.filter((item) => item.name !== name);
    await this.writeData(deletedData);
  }
}
