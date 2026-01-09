import { useState, useMemo, useRef } from "react";
import { Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const companies = [
  { id: 1, name: "Alpha Traders" },
  { id: 2, name: "Beta Pvt Ltd" },
  { id: 3, name: "ExtremeAccountant Demo" },
];

const rawData = [
  { month: "Jan", companyId: 1, sales: 80000, purchases: 50000 },
  { month: "Feb", companyId: 1, sales: 90000, purchases: 60000 },
  { month: "Mar", companyId: 2, sales: 110000, purchases: 75000 },
  { month: "Apr", companyId: 3, sales: 140000, purchases: 90000 },
  { month: "May", companyId: 3, sales: 160000, purchases: 100000 },
];

const TAX_RATE = 0.15;

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  /* ---------- FILTER DATA ---------- */
  const filteredData = useMemo(() => {
    let data = rawData;

    if (selectedCompany) {
      data = data.filter(d => d.companyId === selectedCompany);
    }

    return data.map(d => {
      const profit = d.sales - d.purchases;
      return {
        ...d,
        profit,
        tax: profit * TAX_RATE,
      };
    });
  }, [selectedCompany, dateRange]);

  /* ---------- TOTALS ---------- */
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, cur) => {
        acc.sales += cur.sales;
        acc.purchases += cur.purchases;
        acc.profit += cur.profit;
        acc.tax += cur.tax;
        return acc;
      },
      { sales: 0, purchases: 0, profit: 0, tax: 0 }
    );
  }, [filteredData]);

  /* ---------- EXPORT EXCEL ---------- */
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dashboard");
    XLSX.writeFile(wb, "ExtremeAccountant_Report.xlsx");
  };

  /* ---------- EXPORT PDF ---------- */
  const exportPDF = async () => {
    if (!dashboardRef.current) return;

    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    pdf.addImage(imgData, "PNG", 20, 20, 800, 450);
    pdf.save("ExtremeAccountant_Report.pdf");
  };

  return (
    <div className="p-6 space-y-6" ref={dashboardRef}>

      {/* -------- FILTER BAR -------- */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow">
        <Select
          placeholder="Select Company"
          allowClear
        //   className="w-56"
          className="h-10 rounded-sm"
          onChange={(val) => setSelectedCompany(val)}
        >
          {companies.map(c => (
            <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
          ))}
        </Select>

        <DatePicker.RangePicker
          onChange={(dates) => setDateRange(dates)}
          className="h-10 rounded-sm"
        />

        <Button onClick={exportExcel}>Export Excel</Button>
        <Button onClick={exportPDF}>Export PDF</Button>
      </div>

      {/* -------- STATS -------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Sales" value={totals.sales} />
        <Stat title="Purchases" value={totals.purchases} />
        <Stat title="Profit" value={totals.profit} />
        <Stat title="Tax (15%)" value={totals.tax} />
      </div>

      {/* -------- CHARTS -------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Sales vs Purchases */}
        <ChartBox title="Sales vs Purchases">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={filteredData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#22c55e" />
              <Bar dataKey="purchases" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Profit & Tax */}
        <ChartBox title="Profit & Tax">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={filteredData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="profit" stroke="#2563eb" strokeWidth={3} />
              <Line dataKey="tax" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Tax Pie */}
        <ChartBox title="Tax Breakdown">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: "Tax Paid", value: totals.tax },
                  { name: "Remaining Profit", value: totals.profit - totals.tax },
                ]}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                <Cell fill="#f59e0b" />
                <Cell fill="#22c55e" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

      </div>
    </div>
  );
};

/* ---------------- UI HELPERS ---------------- */

const Stat = ({ title, value }: any) => (
  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2">
      PKR {value.toLocaleString()}
    </h2>
  </div>
);

const ChartBox = ({ title, children }: any) => (
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;
