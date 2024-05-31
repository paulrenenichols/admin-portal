import type { MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet, NavLink } from "@remix-run/react";
import { useMemo, useState, FormEvent } from "react";
import debounce from "lodash.debounce";
import { SortButtons } from "~/components/buttons/sort-buttons";
import { getAllCustomers, Customer } from "~/data/customers";
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
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const { customers } = useLoaderData<typeof LoaderArgs>();
  const [searchCustomers, setSearchCustomers] = useState<Customer[]>(customers);
  const sortedCustomers = useMemo(() => {
    if (sortBy === "none" || sortOrder === "none") {
      return [...searchCustomers];
    }
    if (sortBy === "company") {
      return sortByCompany(searchCustomers, sortOrder);
    } else if (sortBy === "user") {
      return sortByUser(searchCustomers, sortOrder);
    }
  }, [sortBy, sortOrder, searchCustomers]);

  const setSort = (sortBy: SortBy, sortOrder: SortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const onSearchChange = (event: FormEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    if (!searchText) {
      setSearchCustomers(customers);
    } else {
      const filteredCustomers = [...customers].filter((customer: Customer) => {
        return (
          customer.company.toLowerCase().includes(searchText) ||
          customer.user.toLowerCase().includes(searchText) ||
          customer.phone.includes(searchText)
        );
      });
      setSearchCustomers(filteredCustomers);
    }
  };
  const debouncedOnSearchChange = debounce(onSearchChange, 500);

  return (
    <div className="customer-page">
      <section className="customer-search">
        <h2>Search:</h2>
        <input type="text" name="search" onChange={debouncedOnSearchChange} />
      </section>
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
                    <NavLink to={`${customer.id}`}>{"View"}</NavLink>
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
