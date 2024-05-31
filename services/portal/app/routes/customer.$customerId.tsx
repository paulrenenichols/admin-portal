import { Form } from "@remix-run/react";

export default function CustomerDetails() {
  const customer = {
    id: "011",
    user: "aurorawanderer",
    company: "Cosmic Concepts",
    phone: "4971865230",
  };

  return (
    <div className="customer">
      <h2>{customer.user}</h2>
      <h3>{customer.company}</h3>
      <h3>{customer.phone}</h3>
    </div>
  );
}
