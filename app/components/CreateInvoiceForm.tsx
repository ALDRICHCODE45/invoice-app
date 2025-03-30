"use client";
import { useActionState, useState, type ReactElement } from "react";

import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Hash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { SubmitButton } from "./SubmitButtons";
import { formatCurrency } from "../utils/formatCurrency";

export interface CreateInvoiceFormProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

enum Currency {
  USD = "USD",
  MXN = "MXN",
  EUR = "EUR",
}

export function CreateInvoiceForm({
  address,
  email,
  firstName,
  lastName,
}: CreateInvoiceFormProps): ReactElement {
  const [lastResult, action] = useActionState(createInvoice, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currenty, setCurrency] = useState<Currency>(Currency.USD);

  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  const calculteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="w-full shadow-lg">
        <CardHeader className="rounded-t-lg border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">New Invoice</CardTitle>
              <CardDescription>
                Create an invoice in the form below
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm py-1 px-3">
              Draft
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            id={form.id}
            action={action}
            onSubmit={form.onSubmit}
            noValidate
          >
            <input
              name={fields.date.name}
              key={fields.date.key}
              value={selectedDate.toISOString()}
              type="hidden"
            />
            <input
              name={fields.total.name}
              key={fields.total.key}
              value={calculteTotal}
              type="hidden"
            />

            {/* Section 1: Basic Invoice Details */}
            <div className="mb-8">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4">Invoice Details</h3>
                <Separator />
              </div>
              <div className="flex flex-col gap-2 mb-4 w-1/3">
                <Label>Invoce Name</Label>
                <Input
                  name={fields.invoiceName.name}
                  key={fields.invoiceName.key}
                  defaultValue={fields.invoiceName.initialValue}
                  placeholder="Invoice Test"
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceName.errors}
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium block">
                    Invoice No.
                  </Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none bg-slate-50"
                    >
                      <Hash className="h-4 w-4" />
                    </Button>
                    <Input
                      name={fields.invoiceNumber.name}
                      key={fields.invoiceNumber.key}
                      defaultValue={fields.invoiceNumber.initialValue}
                      placeholder="INV-001"
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-sm text-red-500">
                    {fields.invoiceNumber.errors}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium block">Currency</Label>
                  <Select
                    defaultValue={Currency.USD}
                    name={fields.currency.name}
                    key={fields.currency.key}
                    onValueChange={(value) => setCurrency(value as Currency)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Currency.USD}>
                        USD Dolar(USD)
                      </SelectItem>
                      <SelectItem value={Currency.EUR}>Euro (EUR)</SelectItem>
                      <SelectItem value={Currency.MXN}>
                        Peso Mexicano (MXN)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">
                    {fields.currency.errors}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium block">
                    Date Emision
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          new Intl.DateTimeFormat("es", {
                            dateStyle: "long",
                          }).format(selectedDate)
                        ) : (
                          <span>Pick a Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-red-500">{fields.date.errors}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium block">
                    Due on Reciept
                  </Label>
                  <Select
                    name={fields.dueDate.name}
                    key={fields.dueDate.key}
                    defaultValue={fields.dueDate.initialValue}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar Plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Due on Reciept</SelectItem>
                      <SelectItem value="15">Net 15</SelectItem>
                      <SelectItem value="30">Net 30</SelectItem>
                      <SelectItem value="60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">
                    {fields.dueDate.errors}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Section 2: From/To Information */}
            <div className="mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">From</Label>
                  <div className="space-y-3">
                    <Input
                      placeholder="Your Name"
                      className="bg-slate-50"
                      name={fields.fromName.name}
                      key={fields.fromName.key}
                      defaultValue={firstName + " " + lastName}
                    />
                    <p className="text-sm text-red-500">
                      {fields.fromName.errors}
                    </p>
                    <Input
                      placeholder="Your Email"
                      className="bg-slate-50"
                      name={fields.fromEmail.name}
                      key={fields.fromEmail.key}
                      defaultValue={email}
                    />
                    <p className="text-sm text-red-500">
                      {fields.fromEmail.errors}
                    </p>
                    <Textarea
                      name={fields.fromAddress.name}
                      key={fields.fromAddress.key}
                      placeholder="Your Address"
                      className="bg-slate-50"
                      rows={3}
                      defaultValue={address}
                    />
                    <p className="text-sm text-red-500">
                      {fields.fromAddress.errors}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">To</Label>
                  <div className="space-y-3">
                    <Input
                      placeholder="Client Name"
                      name={fields.clientName.name}
                      key={fields.clientName.key}
                      defaultValue={fields.clientName.initialValue}
                    />
                    <p className="text-sm text-red-500">
                      {fields.clientName.errors}
                    </p>
                    <Input
                      placeholder="Client Email"
                      name={fields.clientEmail.name}
                      key={fields.clientEmail.key}
                      defaultValue={fields.clientEmail.initialValue}
                    />
                    <p className="text-sm text-red-500">
                      {fields.clientEmail.errors}
                    </p>
                    <Textarea
                      placeholder="Client Address"
                      rows={3}
                      name={fields.clientAddress.name}
                      key={fields.clientAddress.key}
                      defaultValue={fields.clientAddress.initialValue}
                    />
                    <p className="text-sm text-red-500">
                      {fields.clientAddress.errors}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Section 3: Products and Services */}

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">
                Products and Services
              </h3>
              <div className="rounded-lg border overflow-hidden">
                {/* Encabezados */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b">
                  <p className="col-span-5 text-sm font-medium">Description</p>
                  <p className="col-span-2 text-sm font-medium text-center">
                    Quantity
                  </p>
                  <p className="col-span-2 text-sm font-medium text-center">
                    Rate
                  </p>
                  <p className="col-span-2 text-sm font-medium text-center">
                    Amount
                  </p>
                </div>

                {/* Versión desktop: Formato horizontal */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0">
                  <div className="col-span-5">
                    <Textarea
                      rows={2}
                      placeholder="Name and description"
                      name={fields.invoiceItemDescription.name}
                      key={fields.invoiceItemDescription.key}
                      defaultValue={fields.invoiceItemDescription.initialValue}
                    />
                    <p className="text-sm text-red-500">
                      {fields.invoiceItemDescription.errors}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="text-center"
                      name={fields.invoiceItemQuantity.name}
                      key={fields.invoiceItemQuantity.key}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <p className="text-sm text-red-500">
                      {fields.invoiceItemQuantity.errors}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Input
                      name={fields.invoiceItemRate.name}
                      key={fields.invoiceItemRate.key}
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="0.00"
                      className="text-center"
                    />
                    <p className="text-sm text-red-500">
                      {fields.invoiceItemRate.errors}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Input
                      className="text-center bg-slate-50"
                      disabled
                      value={formatCurrency(calculteTotal)}
                    />
                  </div>
                </div>
              </div>

              {/* Subtotal y total - Responsive */}
              <div className="flex justify-end mt-4">
                <div className="w-full sm:w-64 space-y-2">
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(calculteTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-dashed">
                    <span className="font-medium">Total ({currenty})</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(calculteTotal)}
                    </span>
                  </div>
                  <p className="text-sm text-red-500">{fields.total.errors}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Section 4: Notes and Terms */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Notes and Terms</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium block">Notes</Label>
                  <Textarea
                    placeholder="Add any note or additional information..."
                    rows={4}
                    name={fields.note.name}
                    key={fields.note.key}
                    defaultValue={fields.note.initialValue}
                  />
                  <p className="text-sm text-red-500">{fields.note.errors}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium block">
                    Terms and Conditions
                  </Label>
                  <Textarea
                    placeholder="Add the terms and conditions to your invoice..."
                    rows={4}
                    name={fields.terms.name}
                    key={fields.terms.key}
                    defaultValue={fields.terms.initialValue}
                  />
                  <p className="text-sm text-red-500">{fields.terms.errors}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
              <SubmitButton text="Create Invoice" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
