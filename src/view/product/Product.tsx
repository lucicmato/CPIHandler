import React from 'react';
import ClientService from '../../services/ClientService';
import TableComponent from '../../components/table/TableComponent';
import ProductService from '../../services/ProductService';
import SearchComponent from '../../components/search/SearchComponent';

import { ClientTableModel, ProductTableModel } from '../../globals/models';
import { productTableHeader } from '../../components/table/TableHeaders';
import { Button, FormSelect } from 'react-bootstrap';
import { ProductAllFiltered } from '../../services/models';

import styles from './Product.module.scss';
import EditTableComponent from '../../components/table/partials/EditTableComponent';
import NewTableComponent from '../../components/table/partials/NewTableCompnent';
import NoDataWarning from '../../components/alerts/NoDataWarning';

const Product: React.FC = () => {
  const [allClients, setAllClients] = React.useState<ClientTableModel>({
    data: undefined,
    info: [],
    totalPages: 0,
  });
  const [products, setProducts] = React.useState<ProductTableModel>({
    data: undefined,
    info: [],
    totalPages: 0,
  });
  const [userFilterInput, setUserFilterInput] = React.useState<ProductAllFiltered>({
    clientId: '',
    name: '',
    sortItem: 'name',
    sortOrder: 0,
    pageSize: 10,
    pageNumber: 1,
  });
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<{ [key: string]: any }>({});
  const [updatedProduct, setUpdatedProduct] = React.useState<{ [key: string]: any }>({});
  const [reloadMainTable, setReloadMainTable] = React.useState<boolean>(false);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [newClient, setNewClient] = React.useState<{ [key: string]: any }[]>([]);
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
    if (userFilterInput.clientId !== '') {
      ProductService.getallProductFiltered(userFilterInput)
        .then(res => {
          if (res.info && res.info.length !== 0) {
            setProducts({
              ...products,
              data: undefined,
              info: res.info,
            });
          }
          setProducts({
            ...products,
            info: [],
            data: res.data.content,
            totalPages: res.data.totalPages,
          });
        })
        .catch(error => {
          console.error('error:', error);
          //TODO: error handler
        });
    }
  }, [userFilterInput, reloadMainTable !== false]);
  console.log('p', products);
  React.useEffect(() => {
    if (Object.keys(updatedProduct).length !== 0) {
      ProductService.updateTableRow(updatedProduct)
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
  }, [updatedProduct]);

  React.useEffect(() => {
    if (newClient.length !== 0) {
      ProductService.newTableRow(newClient)
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
  }, [newClient && newClient.length !== 0]);

  React.useEffect(() => {
    if (deleteRowId !== '') {
      ProductService.deleteTableRow(deleteRowId)
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

  const onClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserFilterInput({ ...userFilterInput, clientId: e.target.value });
  };

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
    setProduct(data);
    handleEditModal();
  };

  const onUpdate = (data: { [key: string]: any }) => {
    setUpdatedProduct(data);
  };

  const handleNewModal = () => {
    setShowNewModal(prevVal => !prevVal);
  };

  const onNewItem = (data: { [key: string]: any }[]) => {
    setNewClient(data);
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

  if (userFilterInput.clientId === '') {
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
        New product
      </Button>
      {renderClientChoose()}
      {userFilterInput.clientId === '' && <NoDataWarning message={'Choose client'} />}
      <SearchComponent handleInputChange={handleInputChange} labelMessage={'Product name:'} />
      <TableComponent
        headers={productTableHeader}
        data={products.data}
        info={products.info}
        numberOfPages={products.totalPages}
        userFilterInput={userFilterInput}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        handleEditSelectedRow={handleEditSelectedRow}
        setDeleteRowId={setDeleteRowId}
      />
      {showEditModal && (
        <EditTableComponent
          showModal={showEditModal}
          formData={product}
          handleEditModal={handleEditModal}
          handleUpdate={onUpdate}
        />
      )}
      {showNewModal && (
        <NewTableComponent
          showModal={showNewModal}
          formData={productTableHeader}
          handleNewModal={handleNewModal}
          handleNew={onNewItem}
        />
      )}
    </div>
  );
};

export default Product;
