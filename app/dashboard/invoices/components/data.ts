enum InvoiceStatus {
  PAID = "PAID",
  PENDING = "UNPAID",
}

export type Invoice = {
  id: string;
  clientName: string;
  total: number;
  status: InvoiceStatus;
  date: Date;
};

// export const invoiceData: Invoice[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "paid",
//     customer: "Microsoft",
//     date: new Date("2023-08-15"),
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "unpaid",
//     customer: "Google",
//     date: new Date("2023-08-20"),
//   },
//   {
//     id: "a1b2c3d4",
//     amount: 250,
//     status: "paid",
//     customer: "Amazon",
//     date: new Date("2023-09-01"),
//   },
//   {
//     id: "e5f6g7h8",
//     amount: 75,
//     status: "unpaid",
//     customer: "Meta",
//     date: new Date("2023-09-05"),
//   },
//   {
//     id: "i9j0k1l2",
//     amount: 500,
//     status: "paid",
//     customer: "Tesla",
//     date: new Date("2023-09-10"),
//   },
//   {
//     id: "m3n4o5p6",
//     amount: 300,
//     status: "unpaid",
//     customer: "Netflix",
//     date: new Date("2023-09-15"),
//   },
//   {
//     id: "q7r8s9t0",
//     amount: 200,
//     status: "paid",
//     customer: "Apple",
//     date: new Date("2023-09-20"),
//   },
//   {
//     id: "u1v2w3x4",
//     amount: 150,
//     status: "unpaid",
//     customer: "Samsung",
//     date: new Date("2023-09-25"),
//   },
//   {
//     id: "y5z6a7b8",
//     amount: 400,
//     status: "paid",
//     customer: "IBM",
//     date: new Date("2023-10-01"),
//   },
//   {
//     id: "c9d0e1f2",
//     amount: 1000,
//     status: "unpaid",
//     customer: "Oracle",
//     date: new Date("2023-10-05"),
//   },
//   // Nuevos registros adicionales
//   {
//     id: "g1h2i3j4",
//     amount: 175,
//     status: "paid",
//     customer: "Intel",
//     date: new Date("2023-10-10"),
//   },
//   {
//     id: "k5l6m7n8",
//     amount: 350,
//     status: "unpaid",
//     customer: "Adobe",
//     date: new Date("2023-10-15"),
//   },
//   {
//     id: "o9p0q1r2",
//     amount: 600,
//     status: "paid",
//     customer: "Salesforce",
//     date: new Date("2023-10-20"),
//   },
//   {
//     id: "s3t4u5v6",
//     amount: 225,
//     status: "unpaid",
//     customer: "Cisco",
//     date: new Date("2023-10-25"),
//   },
//   {
//     id: "w7x8y9z0",
//     amount: 800,
//     status: "paid",
//     customer: "PayPal",
//     date: new Date("2023-11-01"),
//   },
//   {
//     id: "a1b2c3d4",
//     amount: 120,
//     status: "unpaid",
//     customer: "Shopify",
//     date: new Date("2023-11-05"),
//   },
//   {
//     id: "e5f6g7h8",
//     amount: 450,
//     status: "paid",
//     customer: "NVIDIA",
//     date: new Date("2023-11-10"),
//   },
//   {
//     id: "i9j0k1l2",
//     amount: 900,
//     status: "unpaid",
//     customer: "Uber",
//     date: new Date("2023-11-15"),
//   },
//   {
//     id: "m3n4o5p6",
//     amount: 300,
//     status: "paid",
//     customer: "Airbnb",
//     date: new Date("2023-11-20"),
//   },
//   {
//     id: "q7r8s9t0",
//     amount: 500,
//     status: "unpaid",
//     customer: "Spotify",
//     date: new Date("2023-11-25"),
//   },
//   {
//     id: "u1v2w3x4",
//     amount: 275,
//     status: "paid",
//     customer: "Twitter",
//     date: new Date("2023-12-01"),
//   },
//   {
//     id: "y5z6a7b8",
//     amount: 650,
//     status: "unpaid",
//     customer: "Snapchat",
//     date: new Date("2023-12-05"),
//   },
//   {
//     id: "c9d0e1f2",
//     amount: 700,
//     status: "paid",
//     customer: "Zoom",
//     date: new Date("2023-12-10"),
//   },
//   {
//     id: "g1h2i3j4",
//     amount: 150,
//     status: "unpaid",
//     customer: "Slack",
//     date: new Date("2023-12-15"),
//   },
//   {
//     id: "k5l6m7n8",
//     amount: 850,
//     status: "paid",
//     customer: "Pinterest",
//     date: new Date("2023-12-20"),
//   },
// ];
