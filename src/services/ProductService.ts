import axios from 'axios';

import { getHeader } from '../utils/getHeader';
import { getIdToken } from '../utils/getIdToken';
import { ProductAllFiltered, ProductModel } from './models';

const prepareHeader = async (): Promise<string> => {
  return await getIdToken();
};

export default class ProductService {
  public static getProductByClientId = async (id: string) => {
    try {
      const { data } = await axios.get<ProductModel>(`https://api.boxlog.lumenspei.digital/v1/products/client/${id}`, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static getallProductFiltered = async (inputs: ProductAllFiltered) => {
    try {
      const { data } = await axios.post<ProductModel>(
        'https://api.boxlog.lumenspei.digital/v1/products/client_filtered',
        inputs,
        {
          headers: getHeader(await prepareHeader()),
        },
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static updateTableRow = async (inputs: { [key: string]: any }) => {
    try {
      const { data } = await axios.put<ProductModel>('https://api.boxlog.lumenspei.digital/v1/products', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static newTableRow = async (inputs: { [key: string]: any }[]) => {
    try {
      const { data } = await axios.post<ProductModel>('https://api.boxlog.lumenspei.digital/v1/products', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static deleteTableRow = async (id: string) => {
    try {
      const { data } = await axios.delete(`https://api.boxlog.lumenspei.digital/v1/products/${id}`, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
