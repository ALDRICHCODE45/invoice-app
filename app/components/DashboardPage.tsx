"use client";

import { LineChart, Line } from "recharts";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Filter, Download, ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Definición de tipos
interface SummaryItem {
  value: string;
  percentChange: string;
  lastMonth: string;
}

interface RecentInvoice {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "paid" | "pending" | "overdue";
  amount: string;
  date: string;
}

export const Dashboard: React.FC = () => {
  // Datos de ejemplo para el dashboard
  const [activeTab, setActiveTab] = useState("overview");

  // Datos para las tarjetas de resumen
  const summaryData: Record<string, SummaryItem> = {
    paidInvoices: {
      value: "$28,450",
      percentChange: "+12%",
      lastMonth: "vs último mes",
    },
    unpaidInvoices: {
      value: "$12,380",
      percentChange: "+10%",
      lastMonth: "vs último mes",
    },
    totalInvoices: {
      value: "$40,830",
      percentChange: "+9%",
      lastMonth: "vs último mes",
    },
  };

  // Datos para el gráfico
  const chartData = [
    { month: "Ene", amount: 2800 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 2700 },
    { month: "Abr", amount: 3000 },
    { month: "May", amount: 2000 },
    { month: "Jun", amount: 2500 },
    { month: "Jul", amount: 3800 },
    { month: "Ago", amount: 3500 },
    { month: "Sep", amount: 3000 },
    { month: "Oct", amount: 3700 },
    { month: "Nov", amount: 4200 },
    { month: "Dic", amount: 3900 },
  ];

  // Datos para los clientes activos
  const activeCustomers = {
    total: "5,428",
    lastMonth: "Comparar con el mes pasado",
    countries: [
      { country: "México", count: 2418, percentage: 45, flag: "🇲🇽" },
      { country: "Colombia", count: 1693, percentage: 31, flag: "🇨🇴" },
      { country: "España", count: 1317, percentage: 24, flag: "🇪🇸" },
    ],
  };

  // Datos para la tabla de facturas recientes
  const recentInvoices: RecentInvoice[] = [
    {
      id: "INV12893",
      customer: {
        name: "Carlos Méndez",
        email: "carlos@example.com",
        avatar: "CM",
      },
      status: "paid",
      amount: "$780.00",
      date: "Oct 19, 2024",
    },
    {
      id: "INV12894",
      customer: {
        name: "Ana Martínez",
        email: "ana@example.com",
        avatar: "AM",
      },
      status: "pending",
      amount: "$1,829.00",
      date: "Oct 23, 2024",
    },
    {
      id: "INV12895",
      customer: {
        name: "Luis Ramírez",
        email: "luis@example.com",
        avatar: "LR",
      },
      status: "overdue",
      amount: "$950.00",
      date: "Oct 25, 2024",
    },
    {
      id: "INV12896",
      customer: {
        name: "María García",
        email: "maria@example.com",
        avatar: "MG",
      },
      status: "paid",
      amount: "$1,200.00",
      date: "Oct 27, 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagada";
      case "pending":
        return "Pendiente";
      case "overdue":
        return "Vencida";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Vista general</TabsTrigger>
          <TabsTrigger value="invoices">Facturas</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Tarjeta de Facturas Pagadas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Facturas Pagadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData.paidInvoices.value}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-1">
                {summaryData.paidInvoices.percentChange}
              </span>
              <span className="text-gray-500">
                {summaryData.paidInvoices.lastMonth}
              </span>
            </div>
            <div className="mt-2 text-sm text-right">
              <Button variant="link" size="sm" className="p-0 h-auto">
                Ver detalles <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Facturas No Pagadas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Facturas No Pagadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData.unpaidInvoices.value}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-yellow-500 mr-1">
                {summaryData.unpaidInvoices.percentChange}
              </span>
              <span className="text-gray-500">
                {summaryData.unpaidInvoices.lastMonth}
              </span>
            </div>
            <div className="mt-2 text-sm text-right">
              <Button variant="link" size="sm" className="p-0 h-auto">
                Ver detalles <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Total de Facturas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total de Facturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData.totalInvoices.value}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-blue-500 mr-1">
                {summaryData.totalInvoices.percentChange}
              </span>
              <span className="text-gray-500">
                {summaryData.totalInvoices.lastMonth}
              </span>
            </div>
            <div className="mt-2 text-sm text-right">
              <Button variant="link" size="sm" className="p-0 h-auto">
                Ver detalles <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Gráfico de análisis */}
        <div className="md:col-span-2">
          <MinimalistChart />
        </div>

        {/* Clientes activos */}
        <Card>
          <CardHeader>
            <CardTitle>Clientes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              {activeCustomers.total}
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {activeCustomers.lastMonth}
            </p>

            <div className="space-y-4">
              {activeCustomers.countries.map((country, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{country.flag}</span>
                      <span>{country.country}</span>
                    </div>
                    <span className="text-sm">
                      {country.count} ({country.percentage}%)
                    </span>
                  </div>
                  <Progress value={country.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de facturas recientes */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between">
          <CardTitle>Facturas Recientes</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar..." className="pl-8 h-9" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={invoice.customer.name} />
                        <AvatarFallback>
                          {invoice.customer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {invoice.customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {invoice.customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

interface ChartData {
  month: string;
  amount: number;
}

const MinimalistChart: React.FC = () => {
  // Datos de ejemplo para el gráfico
  const chartData: ChartData[] = [
    { month: "Ene", amount: 2800 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 2700 },
    { month: "Abr", amount: 3000 },
    { month: "May", amount: 2000 },
    { month: "Jun", amount: 2500 },
    { month: "Jul", amount: 3800 },
    { month: "Ago", amount: 3500 },
    { month: "Sep", amount: 3000 },
    { month: "Oct", amount: 3700 },
    { month: "Nov", amount: 4200 },
    { month: "Dic", amount: 3900 },
  ];

  // Configuración personalizada para el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-100">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-blue-600">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Ingresos Mensuales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinimalistChart;
