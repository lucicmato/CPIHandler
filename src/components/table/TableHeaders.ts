import { TableHeader } from '../../globals/models';

export const clientTableHeader: TableHeader[] = [
  //TODO: Check if id is hidden for this example
  //{ header: 'Id', accessor: 'id', required: false },
  { header: 'Address', accessor: 'address', required: true },
  { header: 'Contact Person Financial Operations', accessor: 'contactPersonFinancialOperations', required: false },
  {
    header: 'Contact Person Organisation Operations',
    accessor: 'contactPersonOrganisationOperations',
    required: false,
  },
  { header: 'Contact PersonOther1', accessor: 'contactPersonOther1', required: false },
  { header: 'Contact PersonOther2', accessor: 'contactPersonOther2', required: false },
  { header: 'Contact Person Pickup', accessor: 'contactPersonPickup', required: false },
  { header: 'Country', accessor: 'country', required: true },
  { header: 'CreatedAt', accessor: 'createdAt', required: false },
  { header: 'DeletedAt', accessor: 'deletedAt', required: false },
  { header: 'Email', accessor: 'email', required: true },
  { header: 'Firebase Uid', accessor: 'firebaseUid', required: false },
  { header: 'FirstName', accessor: 'firstName', required: true },
  { header: 'Iban', accessor: 'iban', required: false },
  { header: 'Image Path', accessor: 'imagePath', required: false },
  { header: 'Invoice Email', accessor: 'invoiceEmail', required: false },
  { header: 'Last AutoGenInvoice', accessor: 'lastAutoGenInvoice', required: false },
  { header: 'Last GenInvoice', accessor: 'lastGenInvoice', required: false },
  { header: 'Lastname', accessor: 'lastName', required: true },
  { header: 'Notes', accessor: 'notes', required: false },
  { header: 'Oib', accessor: 'oib', required: true },
  { header: 'Phone Number', accessor: 'phoneNumber', required: false },
  { header: 'Pickup Address', accessor: 'pickupAddress', required: false },
  { header: 'Updated At', accessor: 'updatedAt', required: false },
  { header: 'User Status', accessor: 'userStatus', required: false },
  { header: 'User Type', accessor: 'userType', required: false },
  { header: 'Username', accessor: 'username', required: false },
  { header: 'Web Shop Callback', accessor: 'webShopCallback', required: false },
  { header: 'Work Email', accessor: 'workEmail', required: true },
  { header: 'Zip Code', accessor: 'zipCode', required: true },
];

export const productTableHeader: TableHeader[] = [
  { header: 'Name', accessor: 'name', required: true },
  { header: 'SKU', accessor: 'sku', required: true },
  { header: 'Created At', accessor: 'createdAt', required: false },
  { header: 'Deleted At', accessor: 'deletedAt', required: false },
  { header: 'Address', accessor: 'address', required: false },
  { header: 'Description', accessor: 'description', required: false },
  { header: 'Price', accessor: 'price', required: false },
  { header: 'productType', accessor: 'productType', required: false },
  { header: 'Storage Locations', accessor: 'storageLocations', required: false },
  { header: 'StorageDTO', accessor: 'storageDTO.product', required: false },
  { header: 'Updated At', accessor: 'updatedAt', required: false },
  { header: 'User', accessor: 'user.firstName', required: false },
];

export const invoicesTableHeader: TableHeader[] = [
  { header: 'Status', accessor: 'status', required: true },
  { header: 'Payment Method', accessor: 'paymentMethod', required: true },
  { header: 'Arrival Date', accessor: 'arrivalDate', required: false },
  { header: 'Client Id', accessor: 'clientId', required: false },
  { header: 'Created At', accessor: 'createdAt', required: false },
  { header: 'Deleted At', accessor: 'deletedAt', required: false },
  { header: 'Designation', accessor: 'designation', required: false },
  { header: 'Id', accessor: 'id', required: false },
  { header: 'Invoice Items ', accessor: 'invoiceItems.productName', required: false }, //This accessor needs to be collection []
  { header: 'Issue Date', accessor: 'issueDate', required: false },
  { header: 'Note', accessor: 'note', required: false },
  { header: 'Payment Date', accessor: 'paymentDate', required: false },
  { header: 'Payment Method', accessor: 'paymentMethod', required: false },
  { header: 'Updated At', accessor: 'updatedAt', required: false },
];
