import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import ClientService from '../../services/ClientService';
import SearchComponent from '../../components/search/SearchComponent';
import EditTableComponent from '../../components/table/partials/EditTableComponent';
import NewTableComponent from '../../components/table/partials/NewTableCompnent';

import { clientTableHeader } from '../../components/table/TableHeaders';
import { ClientTableModel } from '../../globals/models';
import { UsersAllFiltered } from '../../services/models';
import { Button } from 'react-bootstrap';
import { UserRole } from '../../globals/enums';

import styles from './Client.module.scss';

const Client: React.FC = () => {
  const [allClients, setAllClients] = React.useState<ClientTableModel>({
    data: undefined,
    info: [],
    totalPages: 0,
  });
  const [client, setClient] = React.useState<{ [key: string]: any }>({});
  const [updatedClient, setUpdatedClient] = React.useState<{ [key: string]: any }>({});
  const [userFilterInput, setUserFilterInput] = React.useState<UsersAllFiltered>({
    name: '',
    userRole: UserRole.Client,
    sortItem: 'firstName',
    sortOrder: 0,
    pageSize: 10,
    pageNumber: 1,
  });
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [reloadMainTable, setReloadMainTable] = React.useState<boolean>(false);
  const [newClient, setNewClient] = React.useState<{ [key: string]: any }[]>([]);

  React.useEffect(() => {
    //This multiple logic is because of backend trouble. If filtered data (userFilterInput) is sent, response is always error
    //So first if is just for example. (On UI: if you change search of page number. Data comes just with empty search and page number 10.)
    if (userFilterInput.name !== '' || userFilterInput.pageSize !== 10 || userFilterInput.pageNumber !== 1) {
      ClientService.getallClientsFiltered(userFilterInput)
        .then(res => {
          if (res.info && res.info.length !== 0) {
            setAllClients({ ...allClients, info: res.info });
            return;
          }
          setAllClients({
            info: [],
            data: res.data.content,
            totalPages: res.data.totalPages,
          });
        })
        .catch(error => {
          console.error('error:', error);
          //TODO: error handler
        });
    } else {
      ClientService.getallClients()
        .then(res => {
          if (res.info && res.info.length !== 0) {
            setAllClients({ ...allClients, data: undefined, info: res.info });
          } else {
            setAllClients({ ...allClients, info: [], data: res.data.content });
          }
        })
        .catch(error => {
          console.error('error:', error);
          //TODO: error handler
        });
    }
  }, [userFilterInput, reloadMainTable !== false]);

  React.useEffect(() => {
    if (Object.keys(updatedClient).length !== 0) {
      ClientService.updateTableRow(updatedClient)
        .then(res => {
          if (Object.keys(res.data).length !== 0) {
            handleEditModal();
            setReloadMainTable(true);
            window.alert('Successfully saved!');
          }
        })
        .catch(error => {
          console.error('error:', error);
          //TODO: error handler
        });
    }
  }, [updatedClient]);

  React.useEffect(() => {
    if (newClient.length !== 0) {
      ClientService.newTableRow(newClient)
        .then(() => {
          handleNewModal();
          window.alert('Successfully saved!');
        })
        .catch(error => {
          console.error('error:', error);

          //TODO: error handler - temporary solution
          window.alert(
            'ERROR:' + error &&
              error.response &&
              error.response.data &&
              error.response.data.errors &&
              error.response.data.errors[0],
          );
        });
    }
  }, [newClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserFilterInput({ ...userFilterInput, name: value.toString() });
  };

  const handlePageChange = (page: number) => {
    setUserFilterInput({ ...userFilterInput, pageNumber: page });
  };

  const handlePageSizeChange = (pageSize: string) => {
    setUserFilterInput({ ...userFilterInput, pageSize: Number.parseInt(pageSize) });
  };

  const handleEditModal = () => {
    setShowEditModal(prevVal => !prevVal);
  };

  const handleEditSelectedRow = (data: { [key: string]: any }) => {
    setClient(data);
    handleEditModal();
  };

  const onUpdate = (data: { [key: string]: any }) => {
    setUpdatedClient(data);
  };
  const handleNewModal = () => {
    setShowNewModal(prevVal => !prevVal);
  };

  const onNewItem = (data: { [key: string]: any }[]) => {
    setNewClient(data);
  };

  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        onClick={() => {
          setShowNewModal(true);
        }}
      >
        New client
      </Button>
      <SearchComponent handleInputChange={handleInputChange} labelMessage={'Client name:'} />
      <TableComponent
        headers={clientTableHeader}
        data={allClients.data}
        info={allClients.info}
        userFilterInput={userFilterInput}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        handleEditSelectedRow={handleEditSelectedRow}
      />
      {showEditModal && (
        <EditTableComponent
          showModal={showEditModal}
          formData={client}
          handleEditModal={handleEditModal}
          handleUpdate={onUpdate}
        />
      )}
      {showNewModal && (
        <NewTableComponent
          showModal={showNewModal}
          formData={clientTableHeader}
          handleNewModal={handleNewModal}
          handleNew={onNewItem}
        />
      )}
    </div>
  );
};

export default Client;
