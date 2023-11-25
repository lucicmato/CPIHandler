import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import InvoicesService from '../../services/InvoicesService';
import ClientService from '../../services/ClientService';
import EditTableComponent from '../../components/table/partials/EditTableComponent';
import NewTableComponent from '../../components/table/partials/NewTableCompnent';

import { ClientTableModel, InvoicesByUserTableModel } from '../../globals/models';
import { Button, Dropdown, FormSelect } from 'react-bootstrap';
import { invoicesTableHeader } from '../../components/table/TableHeaders';

import styles from './Invoices.module.scss';

const Invoices: React.FC = () => {
  const [allClients, setAllClients] = React.useState<ClientTableModel>({
    data: undefined,
    info: [],
    totalPages: 0,
  });
  const [clientId, setClientId] = React.useState<string>('');
  const [invoices, setInvoices] = React.useState<InvoicesByUserTableModel>({
    data: undefined,
    info: [],
    totalPages: 0,
  });
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [invoice, setInvoice] = React.useState<{ [key: string]: any }>({});
  const [updatedInvoice, setUpdatedInvoice] = React.useState<{ [key: string]: any }>({});
  const [reloadMainTable, setReloadMainTable] = React.useState<boolean>(false);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [newInvoice, setNewInvoice] = React.useState<{ [key: string]: any }[]>([]);
  const [deleteRowId, setDeleteRowId] = React.useState<string>('');

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    if (clientId !== '') {
      InvoicesService.getallInvoicesByClient(clientId)
        .then(res => {
          if (res.info && res.info.length !== 0) {
            setInvoices({ ...invoices, data: undefined, info: res.info });
          }
          setInvoices({ ...invoices, info: [], data: res.data });
        })
        .catch(error => {
          console.error('error:', error);
          //TODO: error handler
        });
    }
  }, [clientId, reloadMainTable !== false]);

  React.useEffect(() => {
    if (newInvoice.length !== 0) {
      InvoicesService.newTableRow(newInvoice)
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
  }, [newInvoice && newInvoice.length !== 0]);

  React.useEffect(() => {
    if (Object.keys(updatedInvoice).length !== 0) {
      InvoicesService.updateTableRow(updatedInvoice)
        .then(res => {
          //TODO: error handler
          if (res.errors.length !== 0) {
            handleEditModal();
            window.alert('Error: ' + res.errors[0]);
            return;
          }
          if (Object.keys(res.data).length !== 0) {
            handleEditModal();
            setReloadMainTable(true);
            window.alert('Successfully saved!');
          }
        })
        .catch(error => {
          console.error('error:', error);
          handleEditModal();
          window.alert('Error: ' + error);
          //TODO: error handler
        });
    }
  }, [updatedInvoice]);

  React.useEffect(() => {
    if (deleteRowId !== '') {
      InvoicesService.deleteTableRow(deleteRowId)
        .then(() => {
          setReloadMainTable(true);
          window.alert('Successfully deleted!');
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
  }, [deleteRowId]);

  const onClientSelect = (eventKey: any) => {
    setClientId(eventKey);
  };

  const handleEditModal = () => {
    setShowEditModal(prevVal => !prevVal);
  };

  const onUpdate = (data: { [key: string]: any }) => {
    setUpdatedInvoice(data);
  };

  const handleEditSelectedRow = (data: { [key: string]: any }) => {
    setInvoice(data);
    handleEditModal();
  };

  const handleNewModal = () => {
    setShowNewModal(prevVal => !prevVal);
  };

  const onNewItem = (data: { [key: string]: any }[]) => {
    setNewInvoice(data);
  };

  const renderClientChoose = () => {
    return (
      <div>
        <FormSelect
          aria-label="Default select example"
          onChange={e => {
            onClientSelect(e);
          }}
        >
          <option>Choose client...</option>
          {allClients.data?.map(client => (
            <option key={client.id} value={client.id}>
              {client.firstName + ' ' + client.lastName}
            </option>
          ))}
        </FormSelect>
      </div>
    );
  };

  if (clientId === '') {
    return <div className={styles.container}>{renderClientChoose()}</div>;
  }

  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        onClick={() => {
          setShowNewModal(true);
        }}
        className={styles.newProductButton}
      >
        New invoice
      </Button>
      <div>
        <Dropdown onSelect={onClientSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {'Choose Client'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {allClients.data?.map(client => (
              <Dropdown.Item key={client.firstName} eventKey={client.id} onSelect={onClientSelect}>
                {client.firstName + ' ' + client.lastName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <TableComponent
        headers={invoicesTableHeader}
        data={invoices.data}
        info={invoices.info}
        // userFilterInput={() => {}} //cant have filter input - there is no method.
        setDeleteRowId={setDeleteRowId}
        handleEditSelectedRow={handleEditSelectedRow}
        handlePageChange={function (page: number): void {
          throw new Error('Function not implemented.');
        }}
      />
      {showEditModal && (
        <EditTableComponent
          showModal={showEditModal}
          formData={invoice}
          handleEditModal={handleEditModal}
          handleUpdate={onUpdate}
        />
      )}
      {showNewModal && (
        <NewTableComponent
          showModal={showNewModal}
          formData={invoicesTableHeader}
          handleNewModal={handleNewModal}
          handleNew={onNewItem}
        />
      )}
    </div>
  );
};

export default Invoices;
