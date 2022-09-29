import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interfaces';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get(url);
      return data;
    } catch (error) {
      throw new error(error.message);
    }
  }
}
