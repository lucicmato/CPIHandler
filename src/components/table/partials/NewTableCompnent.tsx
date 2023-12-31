import React from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import { TableHeader } from '../../../globals/models';

import styles from './NewTableComponent.module.scss';

interface EditTableComponentProps {
  showModal: boolean;
  formData: TableHeader[];
  handleNewModal: () => void;
  handleNew: (data: { [key: string]: any }[]) => void;
}

const NewTableComponent: React.FC<EditTableComponentProps> = ({ showModal, handleNewModal, handleNew, formData }) => {
  const [newData, setNewData] = React.useState<{ [key: string]: any }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleNew(newData);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleNewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {formData.map((data: TableHeader, index: number) => (
              <Form.Group controlId="data1" key={index}>
                <Form.Label>
                  {data.header}
                  {data.required && <span className="text-danger">*</span>}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={data.accessor}
                  onChange={e => {
                    handleChange(e);
                  }}
                  required={data.required}
                />
              </Form.Group>
            ))}

            <div className={styles.buttons}>
              <Button variant="primary" type="submit">
                New
              </Button>
              <Button variant="primary" type="submit" onClick={handleNewModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTableComponent;
