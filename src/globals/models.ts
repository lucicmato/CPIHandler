import { PayStatus, PaymentMethod, UserRole, UserStatus } from './enums';

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
export interface ProductTableModel {
  data:
    | [
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
      ]
    | undefined;
  info: string[];
}

export interface InvoicesByUserTableModel {
  data:
    | [
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
      ]
    | undefined;
  info: string[];
}

interface InvoicesItem {
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

export interface TableHeader {
  header: string;
  accessor: string;
  required: boolean;
}
