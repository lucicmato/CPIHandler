import axios from 'axios';

import { getIdToken } from '../utils/getIdToken';
import { getHeader } from '../utils/getHeader';
import { UsersAllFiltered } from './models';
import { ClientModel } from './models';

const prepareHeader = async (): Promise<string> => {
  return await getIdToken();
};

export default class ClientService {
  public static getallClients = async () => {
    try {
      const { data } = await axios.get<ClientModel>('https://api.boxlog.lumenspei.digital/v1/users/all', {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static getallClientsFiltered = async (inputs: UsersAllFiltered) => {
    try {
      const { data } = await axios.post<ClientModel>(
        'https://api.boxlog.lumenspei.digital/v1/users/all_filtered',
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
      const { data } = await axios.put<ClientModel>('https://api.boxlog.lumenspei.digital/v1/users', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public static newTableRow = async (inputs: { [key: string]: any }[]) => {
    try {
      const { data } = await axios.post<ClientModel>('https://api.boxlog.lumenspei.digital/v1/users', inputs, {
        headers: getHeader(await prepareHeader()),
      });

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

// get all Invoices
// try {
//     const data = await axios.get('https://api.boxlog.lumenspei.digital/v1/invoices', {
//       headers: getHeader(await prepareHeader()),
//     });
//     console.log('data', data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
