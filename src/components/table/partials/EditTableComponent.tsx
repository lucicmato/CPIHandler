import React from 'react';

import { Form, Button, Modal } from 'react-bootstrap';

import styles from './EditTableComponent.module.scss';

interface EditTableComponentProps {
  showModal: boolean;
  formData: { [key: string]: any };
  handleEditModal: () => void;
  handleUpdate: (data: { [key: string]: any }) => void;
}
const EditTableComponent: React.FC<EditTableComponentProps> = ({
  showModal,
  formData,
  handleEditModal,
  handleUpdate,
}) => {
  const [editedData, setEditedData] = React.useState<{ [key: string]: any }>(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleUpdate(editedData);
  };

  return (
    <Modal show={showModal} onHide={handleEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key: string, index: number) => {
            //TODO: Check if id is hidden for this example
            // if (key === 'id') {
            //   return null;
            // }
            return (
              <Form.Group controlId="updateData" key={index}>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={editedData[key] ? editedData[key] : ''}
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </Form.Group>
            );
          })}

          <div className={styles.buttons}>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="primary" type="submit" onClick={handleEditModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTableComponent;
