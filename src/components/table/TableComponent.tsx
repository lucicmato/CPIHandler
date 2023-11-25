import React from 'react';
import NoDataWarning from '../alerts/NoDataWarning';

import { Button, Form, Pagination, Table } from 'react-bootstrap';
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
  numberOfPages?: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange?: (pageSize: string) => void;
  setDeleteRowId?: (id: string) => void;
  handleEditSelectedRow: (rowData: { [key: string]: any }) => void;
}

const TableComponent: React.FC<TableProps> = ({
  headers,
  data,
  userFilterInput,
  info,
  numberOfPages,
  handlePageChange,
  handlePageSizeChange,
  setDeleteRowId,
  handleEditSelectedRow,
}) => {
  function handleDeleteAction(rowData: { [key: string]: any }) {
    setDeleteRowId && setDeleteRowId(rowData.id);
  }

  const renderTable = () => {
    if (data && data.length !== 0) {
      return (
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
      );
    } else if (info.length !== 0) {
      return (
        <div>
          {info.map((message, index) => (
            <NoDataWarning key={index} message={message ?? 'No data'} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <NoDataWarning message={'No data'} />
        </div>
      );
    }
  };

  //TODO: Fix beckend side. Problems with numberOfPages.
  const renderPagination = () => {
    return (
      <div className={styles.paginationContainer}>
        <Pagination>
          {Array.from({ length: numberOfPages || 0 }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={userFilterInput && userFilterInput.pageNumber === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
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
    );
  };
  return (
    <>
      {renderTable()}
      {renderPagination()}
    </>
  );
};

export default TableComponent;
