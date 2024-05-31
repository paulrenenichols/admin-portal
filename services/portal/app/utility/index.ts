import { Customer } from "~/data/customers";

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export type SortOrder = "ascending" | "descending" | "none";
export type SortBy = "user" | "company" | "none";

export const sortByCompany = (customers: Customer[], sortOrder: SortOrder) => {
  return customers.sort((customerA: Customer, customerB: Customer) => {
    const sortValueA = customerA.company.toLowerCase();
    const sortValueB = customerB.company.toLowerCase();
    if (sortOrder === "ascending") {
      if (sortValueA < sortValueB) {
        return 1;
      } else if (sortValueA > sortValueB) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortOrder === "descending") {
      if (sortValueA > sortValueB) {
        return 1;
      } else if (sortValueA < sortValueB) {
        return -1;
      } else {
        return 0;
      }
    }
    return 0;
  });
};

export const sortByUser = (customers: Customer[], sortOrder: SortOrder) => {
  return customers.sort((customerA: Customer, customerB: Customer) => {
    const sortValueA = customerA.user.toLowerCase();
    const sortValueB = customerB.user.toLowerCase();
    if (sortOrder === "ascending") {
      if (sortValueA < sortValueB) {
        return 1;
      } else if (sortValueA > sortValueB) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortOrder === "descending") {
      if (sortValueA > sortValueB) {
        return 1;
      } else if (sortValueA < sortValueB) {
        return -1;
      } else {
        return 0;
      }
    }
    return 0;
  });
};
