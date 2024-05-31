import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteCustomer } from "../data/customers";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.customerId, "Missing customerId param");
  await deleteCustomer(params.customerId);
  return redirect("/customer");
};
