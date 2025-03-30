import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const id = "511adcd9-505b-4b36-8bd8-e3dc1e4ed618";
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  const { invoiceId } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      Note: true,
    },
  });

  if (!invoice) {
    return NextResponse.json(
      {
        error: "Invoice not found",
      },
      { status: 404 },
    );
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  //set font
  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text(invoice.invoiceName, 20, 20);

  //From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([invoice.fromName, invoice.fromEmail, invoice.fromAddress], 20, 45);

  //Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text(
    [invoice.clientName, invoice.clientEmail, invoice.clientAddress],
    20,
    75,
  );
  //invoice Details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number #${invoice.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(invoice.date)}`,
    120,
    45,
  );
  pdf.text(`Due Date: Net ${invoice.dueDate}`, 120, 50);

  //Table
  autoTable(pdf, {
    theme: "striped",
    startY: 100,
    head: [["Description", "Quantity", "Rate", "Total"]],
    body: [
      [
        invoice.invoiceItemDescription,
        invoice.invoiceItemQuantity,
        invoice.invoiceItemRate,
        `$${invoice.total}`,
      ],
      // ...
    ],
  });

  //Total Section
  pdf.line(20, 140, 190, 140);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${invoice.currency})`, 130, 130);
  pdf.text(formatCurrency(invoice.total), 160, 130);

  //Additional Note
  if (invoice.Note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, 150);
    pdf.text(invoice.Note, 20, 155);
  }

  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
