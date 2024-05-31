import type { MetaFunction, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { getAllCustomers, Customer, deleteCustomer } from "~/data/customers";
import { json } from "@remix-run/node";
import { SortButtons } from "~/components/buttons/sort-buttons";
import { DeleteButton } from "~/components/buttons/delete-button";
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
    <div>
      <h1>{"Index Route"}</h1>
    </div>
  );
}
