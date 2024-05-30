export type Customer = {
    readonly id: string;
    readonly user: string;
    readonly company: string;
    readonly phone: string;
};

export async function getAllCustomers(): Promise<Customer[]> {
    const response = await fetch("http://localhost:3000/customer");

    return response.json();
}