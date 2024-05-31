import { Form, useLoaderData } from "@remix-run/react";
import { formatPhoneNumber } from "~/utility";
import { json } from "@remix-run/node";

import { getCustomer } from "../data/customers";

export const loader = async ({ params }) => {
  const customer = await getCustomer(params.customerId);
  return json({ customer });
};

export default function CustomerDetails() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <div className="customer">
      <h2>{customer.user}</h2>
      <h3>{customer.company}</h3>
      <h3>{formatPhoneNumber(customer.phone)}</h3>
      <div className="customer-form">
        {/* <Form action="edit">
          <button type="submit">Edit</button>
        </Form> */}

        <Form
          action="destroy"
          method="delete"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record.",
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}
