import React from 'react';
import NoDataWarning from '../alerts/NoDataWarning';

import { Button, Form, Spinner, Table } from 'react-bootstrap';
import { ProductAllFiltered, UsersAllFiltered } from '../../services/models';

import styles from './TableComponent.module.scss';

/*
  Main table component.

  attributes:
    striped-Adds zebra-striping to any table row within the <tbody>. 
    Use columns to add zebra-striping to any table column.

    bordered-Adds borders on all sides of the table and cells. 
    
    hover-Enable a hover state on table rows within a <tbody>.
 */

interface TableProps {
  headers: { header: string; accessor: string }[];
  data: { [key: string]: any }[] | undefined;
  info: string[];
  userFilterInput?: UsersAllFiltered | ProductAllFiltered;
  handlePageChange?: (page: number) => void;
  handlePageSizeChange?: (pageSize: string) => void;
  onEditRowClick: (data: { [key: string]: any }) => void;
  setDeleteRowId: (id: string) => void;
}

const TableComponent: React.FC<TableProps> = ({
  headers,
  data,
  userFilterInput,
  info,
  handlePageChange, //finish pagination
  handlePageSizeChange,
  onEditRowClick,
  setDeleteRowId,
}) => {
  const [editSelectedRow, setEditSelectedRow] = React.useState<{ [key: string]: any }>({});

  React.useEffect(() => {
    onEditRowClick(editSelectedRow);
  }, [editSelectedRow]);

  // Pagination calculation
  const getNumberOfPages = () => {
    if (data && userFilterInput !== undefined) {
      return Math.ceil(
        data && data.length / userFilterInput.pageSize !== Infinity ? data.length / userFilterInput.pageSize : 0,
      );
    }
    return 0;
  };

  const handleEditSelectedRow = (rowData: {
    [key: string]: any;
  }): React.MouseEventHandler<HTMLButtonElement> | undefined => {
    setEditSelectedRow(rowData);
    return;
  };

  function handleDeleteAction(rowData: { [key: string]: any }) {
    setDeleteRowId(rowData.id);
  }

  //TODO: Refactor - Majbe a better (easier) way is to change ternary operator to if-else
  return (
    <>
      {data && data.length !== 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (
              <tr key={index}>
                {headers.map((header, i) => (
                  <td key={i}>{rowData[header.accessor]}</td>
                ))}
                <td key="EditButton">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleEditSelectedRow(rowData);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td key="DeleteButton">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleDeleteAction(rowData);
                      //TODO: Check with BE teamFor clients BE method missing!
                      window.alert('deleted.');
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : info.length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {info.map((message, index) => (
            <NoDataWarning key={index} message={message ?? 'No data'} />
          ))}
        </div>
      )}

      <div className={styles.paginationContainer}>
        {/* //TODO: finish Pagination */}
        {/* <Pagination>
          {Array.from({ length: getNumberOfPages() }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={userFilterInput.pageNumber === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination> */}
        {handlePageSizeChange !== undefined && (
          <Form.Select
            className={styles.pageNumber}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handlePageSizeChange(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
        )}
      </div>
    </>
  );
};

export default TableComponent;
