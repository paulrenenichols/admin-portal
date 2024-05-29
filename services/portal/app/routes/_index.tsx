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
    <div>
      <h1>Welcome to Remix</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <span>{customer.user}</span>
            <span>{customer.company}</span>
            <span>{customer.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
