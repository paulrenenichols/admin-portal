import type { MetaFunction, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Outlet, NavLink } from "@remix-run/react";
import { getAllCustomers, Customer, deleteCustomer } from "~/data/customers";
import { json } from "@remix-run/node";
import { SortButtons } from "~/components/buttons/sort-buttons";
import { useMemo, useState } from "react";
import {
  formatPhoneNumber,
  sortByCompany,
  sortByUser,
  SortBy,
  SortOrder,
} from "~/utility";

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

export default function Index() {
  const { customers } = useLoaderData<typeof LoaderArgs>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [sortBy, setSortBy] = useState<SortBy>("none");

  const sortedCustomers = useMemo(() => {
    if (sortBy === "none" || sortOrder === "none") {
      return [...customers];
    }
    if (sortBy === "company") {
      return sortByCompany(customers, sortOrder);
    } else if (sortBy === "user") {
      return sortByUser(customers, sortOrder);
    }
  }, [sortBy, sortOrder, customers]);

  const setSort = (sortBy: SortBy, sortOrder: SortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <div className="customer-page">
      <section className="customer-search">{"search"}</section>
      <div className="customer-view">
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
                  <td className="phone-number">
                    {formatPhoneNumber(customer.phone)}
                    <NavLink to={`customer/$${customer.id}`}>{"View"}</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="customer-details">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
