import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Portal" },
    { name: "description", content: "Remix Customer Portal Demo App" },
  ];
};

export default function Index() {
  return (
    <div className="index-page">
      <NavLink className="customer-link-button" to={"customer"}>
        {"Go to customer list"}
      </NavLink>
    </div>
  );
}
