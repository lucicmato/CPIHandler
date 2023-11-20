import axios from 'axios';

import { getIdToken } from '../utils/getIdToken';
import { getHeader } from '../utils/getHeader';
import { InvoicesByUserModel } from './models';

const prepareHeader = async (): Promise<string> => {
  return await getIdToken();
};

export default class InvoicesService {
  public static getallInvoicesByClient = async (id: string) => {
    try {
      const { data } = await axios.get<InvoicesByUserModel>(
        `https://api.boxlog.lumenspei.digital/v1/invoices/users/${id}`,
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
      const { data } = await axios.put('https://api.boxlog.lumenspei.digital/v1/invoices', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static newTableRow = async (inputs: { [key: string]: any }[]) => {
    try {
      const { data } = await axios.post('https://api.boxlog.lumenspei.digital/v1/invoices', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static deleteTableRow = async (id: string) => {
    try {
      const { data } = await axios.delete(`https://api.boxlog.lumenspei.digital/v1/invoices/${id}`, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
