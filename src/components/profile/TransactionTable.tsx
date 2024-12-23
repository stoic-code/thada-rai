import React from "react";
import { CardContent, CardHeader, CardTitle, Card } from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dictionary } from "./dictionary";

const invoices = [
  {
    date: "16, Dec 2023",
    invoice: "12JKL",
    amount: "Rs. 250000.00",
    paymentFor: "Subscription",
    remarks: "Paid via esewa",
  },
  {
    date: "16, Dec 2023",
    invoice: "12JKL",
    amount: "Rs. 35000.00",
    paymentFor: "Subscription",
    remarks: "Paid via esewa",
  },
  {
    date: "16, Dec 2023",
    invoice: "12JKL",
    amount: "Rs. 15000.00",
    paymentFor: "Donation",
    remarks: "Paid via esewa",
  },
];

const TransactionTable = ({ lang }: { lang: string }) => {
  const dict = dictionary[lang as keyof typeof dictionary];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">
          {dict.transactionHistory}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px] text-green-600">
                {dict.date}
              </TableHead>
              <TableHead className="min-w-[100px] text-green-600">
                {dict.invoiceId}
              </TableHead>
              <TableHead className="min-w-[100px] text-green-600">
                {dict.paymentFor}
              </TableHead>
              <TableHead className="min-w-[100px] text-right text-green-600">
                {dict.amount}
              </TableHead>
              <TableHead className="text-green-600">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.date}</TableCell>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentFor}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
                <TableCell>{invoice.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
