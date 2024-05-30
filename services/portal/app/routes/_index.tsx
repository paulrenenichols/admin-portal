import type { MetaFunction } from "@remix-run/node";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCustomers } from "~/data/customers";
import { json } from "@remix-run/node";

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

  return (
    <section className="customer-list">
      <table>
        <thead>
          <tr>
            <th>{"User"}</th>
            <th>{"Company"}</th>
            <th>{"Phone"}</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr>
              <td>{customer.user}</td>
              <td>{customer.company}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
