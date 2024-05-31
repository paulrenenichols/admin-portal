import type { MetaFunction } from "@remix-run/node";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCustomers, Customer } from "~/data/customers";
import { json } from "@remix-run/node";
import { SortButtons } from "~/components/buttons/sort-buttons";
import { useMemo, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const customers = await getAllCustomers();
  return json({ customers });
};

function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export type SortOrder = "ascending" | "descending" | "none";
export type SortBy = "user" | "company" | "none";

const sortByCompany = (customers: Customer[], sortOrder: SortOrder) => {
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

const sortByUser = (customers: Customer[], sortOrder: SortOrder) => {
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

export default function Index() {
  const { customers } = useLoaderData<typeof LoaderArgs>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [sortBy, setSortBy] = useState<SortBy>("none");

  const sortedCustomers = useMemo(() => {
    if (sortBy === "none" || sortOrder === "none") {
      return [...customers];
    }
    console.log(`useMemo: sortBy ${sortBy} sortOrder ${sortOrder}`);
    if (sortBy === "company") {
      return sortByCompany(customers, sortOrder);
    } else if (sortBy === "user") {
      return sortByUser(customers, sortOrder);
    }
  }, [sortBy, sortOrder, customers]);

  const setSort = (sortBy: SortBy, sortOrder: SortOrder) => {
    console.log(`setSort: sortBy ${sortBy} sortOrder ${sortOrder}`);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <div className="customer-view">
      <section className="customer-search">{"search"}</section>
      <section className="customer-list">
        <table>
          <thead>
            <tr>
              <th>
                {"User"}
                <SortButtons
                  onClickDown={() => setSort("user", "descending")}
                  onClickUp={() => setSort("user", "ascending")}
                />
              </th>
              <th>
                {"Company"}
                <SortButtons
                  onClickDown={() => setSort("company", "descending")}
                  onClickUp={() => setSort("company", "ascending")}
                />
              </th>
              <th>{"Phone"}</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.user}</td>
                <td>{customer.company}</td>
                <td>{formatPhoneNumber(customer.phone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
