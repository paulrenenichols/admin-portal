export type Customer = {
  readonly id: string;
  readonly user: string;
  readonly company: string;
  readonly phone: string;
};

const apiServerUrl = process.env.API_SERVER_URL;
console.log(`apiServerUrl ${apiServerUrl}`);

export async function getAllCustomers(): Promise<Customer[]> {
  const response = await fetch(`${apiServerUrl}/customer`);

  return response.json();
}

export async function searchCustomers(searchText: string): Promise<Customer[]> {
  const response = await fetch(`${apiServerUrl}/customer/search/${searchText}`);

  return response.json();
}

export async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`${apiServerUrl}/customer/${id}`);

  return response.json();
}

export async function deleteCustomer(id: string): Promise<any> {
  return fetch(`${apiServerUrl}/customer/${id}`, {
    method: "DELETE",
  });
}
