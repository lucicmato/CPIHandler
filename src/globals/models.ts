import { UserRole, UserStatus } from './enums';

export interface ClientTableModel {
  data:
    | [
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
      ]
    | undefined;
  info: string[];
}

export interface ClientTableHeader {
  header: string;
  accessor: string;
  required: boolean;
}
