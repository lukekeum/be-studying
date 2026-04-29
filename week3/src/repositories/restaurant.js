import fs from 'fs/promises';
import { getDBPath } from '../utils/database/index.js';

export class RestaurantRepository {
  async _readData() {
    const fileData = await fs.readFile(getDBPath(), { encoding: 'utf-8' });
    console.log(fileData);
    return JSON.parse(fileData || '[]');
  }

  async _writeData(data) {
    await fs.writeFile(getDBPath(), JSON.stringify(data));
  }

  async create(data) {
    const rdata = await this._readData();
    rdata.push(data);
    await this._writeData(rdata);
  }

  async findAll() {
    const data = await this._readData();
    return data;
  }

  async findByPhone(phone) {
    const data = await this._readData();
    return data.find((item) => item.phone === phone);
  }

  async findByName(name) {
    const data = await this._readData();
    return data.find((item) => item.name === name);
  }

  async update(name, updatedItem) {
    const data = await this._readData();
    const index = data.findIndex((item) => item.name == name);
    if (index === -1) {
      throw new CustomError({
        message: '데이터베이스에서 데이터를 찾을 수 없습니다',
        statusCode: 404,
      });
    }
    data[index] = { ...data[index], ...updatedItem };
    await this._writeData(data);
  }

  async delete(name) {
    const data = await this._readData();
    const deletedData = data.filter((item) => item.name !== name);
    await this._writeData(deletedData);
  }
}
