export type RCResult = {
  Owner_Name: string;
  age: number;
  address: string;
  city: string;
  RC_Valid: boolean;
  taxvalidity: boolean;
  taxpaidupto: Date;
  InsuranceValidity: boolean;
  PUCC_Validity: boolean;
  IsFinance: boolean;
  Blacklisted: string;
  RegisteredAt: string;
  Permit_Validity: boolean;
  Permit_Valid_Upto: Date;
};

export interface RCResultInterface {
  data: {
    Owner_Name: string;
    age: number;
    address: string;
    city: string;
    RC_Valid: boolean;
    taxvalidity: boolean;
    taxpaidupto: string;
    InsuranceValidity: boolean;
    PUCC_Validity: boolean;
    IsFinance: boolean;
    Blacklisted: string;
    RegisteredAt: string;
    Permit_Validity: boolean;
    Permit_Valid_Upto: string;
  };
}

export type History = {
  id: string;
  client_ref_id: string;
  request_id: string;
  current_statistics: {
    open: number;
    error: number;
    total: number;
    failure: number;
    completed: number;
    inprogress: number;
  };
  batch_request_status: string;
  created_on: Date;
  updated_on: Date;
  number_of_pan: number | null;
  error_message: string | null;
};
