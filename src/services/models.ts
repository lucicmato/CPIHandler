import { PayStatus, PaymentMethod, UserRole, UserStatus } from '../globals/enums';

export interface UsersAllFiltered {
  name: string;
  userRole: UserRole;
  sortItem: string;
  sortOrder: number;
  pageSize: number;
  pageNumber: number;
}

export interface ClientModel {
  data: {
    content: [
      {
        address: string;
        contactPersonFinancialOperations: string;
        contactPersonOrganisationOperations: string;
        contactPersonOther1: string;
        contactPersonOther2: string;
        contactPersonPickup: string;
        country: string;
        createdAt: string;
        deletedAt: string;
        email: string;
        firebaseUid: string;
        firstName: string;
        iban: string;
        id: string;
        imagePath: string | null;
        invoiceEmail: string;
        lastAutoGenInvoice: string | null;
        lastGenInvoice: string;
        lastName: string;
        notes: string;
        oib: string;
        phoneNumber: string;
        pickupAddress: string;
        updatedAt: string;
        userStatus: UserStatus;
        userType: UserRole;
        username: string;
        webShopCallback: string;
        workEmail: string;
        zipCode: string;
      },
    ];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      sort: { empty: boolean; sorted: boolean; unsorted: boolean };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: true;
      unpaged: boolean;
    };
    size: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    totalElements: number;
    totalPages: number;
  };
  info: string[];
}

export interface ProductModel {
  data: {
    content: [
      {
        archive: boolean;
        createdAt: string;
        deletedAt: string;
        description: string;
        id: string;
        name: string;
        price: number;
        productType: string;
        sku: string;
        storageDTO: string;
        unit: string;
        updatedAt: string;
      },
    ];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      sort: { empty: boolean; sorted: boolean; unsorted: boolean };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: true;
      unpaged: boolean;
    };
    size: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    totalElements: number;
    totalPages: number;
  };
  info: string[];
  errors: string[];
}

export interface ProductAllFiltered {
  clientId: string;
  name: string;
  sortItem: string;
  sortOrder: number;
  pageSize: number;
  pageNumber: number;
}

export interface InvoicesByUserModel {
  data: [
    {
      arrivalDate: string;
      clientId: string;
      createdAt: string;
      deletedAt: string;
      designation: string;
      id: string;
      invoiceItems: InvoicesItem[];
      issueDate: string;
      note: string;
      paymentDate: string;
      paymentMethod: PaymentMethod;
      status: PayStatus;
      updatedAt: string;
    },
  ];
  info: string[];
  errors: string[];
}

export interface InvoicesItem {
  createdAt: string;
  deletedAt: string;
  id: string;
  price: number;
  productId: string;
  productName: string;
  quantity: number;
  tax: number;
  updatedAt: string;
}
