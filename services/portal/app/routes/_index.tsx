import type { MetaFunction } from "@remix-run/node";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCustomers } from "~/data/customers";
import { json } from "@remix-run/node";
import { SortButtons } from "~/components/buttons/sort-buttons";

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

export default function Index() {
  const { customers } = useLoaderData<typeof LoaderArgs>();

  return (
    <div className="customer-view">
      <section className="customer-search">{"search"}</section>
      <section className="customer-list">
        <table>
          <thead>
            <tr>
              <th>
                {"User"}
                <SortButtons onClickDown={() => {}} onClickUp={() => {}} />
              </th>
              <th>
                {"Company"}
                <SortButtons onClickDown={() => {}} onClickUp={() => {}} />
              </th>
              <th>{"Phone"}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
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
