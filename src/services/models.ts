import { UserRole, UserStatus } from '../globals/enums';

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
