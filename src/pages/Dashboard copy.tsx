import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({ title, value }: { title: string; value: any }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-semibold mt-1">{value}</h2>
  </div>
);

const ChartBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Dashboard = () => {
  /* ---------- DATA ---------- */

  const cashFlowData = [
    { month: "Jan", inflow: 120000, outflow: 80000 },
    { month: "Feb", inflow: 150000, outflow: 90000 },
    { month: "Mar", inflow: 180000, outflow: 130000 },
  ];

  const bankBalanceData = [
    { date: "01 Jan", balance: 500000 },
    { date: "10 Jan", balance: 470000 },
    { date: "20 Jan", balance: 520000 },
  ];

  const plData = [
    { month: "Jan", revenue: 180000, expense: 120000 },
    { month: "Feb", revenue: 220000, expense: 140000 },
    { month: "Mar", revenue: 260000, expense: 170000 },
  ];

  const inventoryData = [
    { category: "Raw Material", value: 350000 },
    { category: "WIP", value: 200000 },
    { category: "Finished Goods", value: 480000 },
  ];

  const receivableData = [
    { name: "0–30 Days", value: 400000 },
    { name: "31–60 Days", value: 180000 },
    { name: "61–90 Days", value: 90000 },
    { name: "90+ Days", value: 60000 },
  ];

  const payableData = [
    { range: "0–30", amount: 250000 },
    { range: "31–60", amount: 130000 },
    { range: "61–90", amount: 70000 },
    { range: "90+", amount: 40000 },
  ];

  const taxData = [
    { month: "Jan", taxCollected: 45000, taxSubmitted: 40000 },
    { month: "Feb", taxCollected: 52000, taxSubmitted: 52000 },
    { month: "Mar", taxCollected: 60000, taxSubmitted: 50000 },
  ];

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">

      {/* KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Companies" value={12} />
        <StatCard title="Users" value={48} />
        <StatCard title="Revenue" value="₨ 820,000" />
        <StatCard title="Receivables" value="₨ 730,000" />
        <StatCard title="Payables" value="₨ 490,000" />
        <StatCard title="Inventory Value" value="₨ 1.03M" />
      </div>

      {/* CASH FLOW & BANK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="Cash Flow (Inflow vs Outflow)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cashFlowData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inflow" fill="#22c55e" />
              <Bar dataKey="outflow" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Bank Balance Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={bankBalanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="balance" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* PROFIT & INVENTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="Revenue vs Expense">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={plData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="revenue" stroke="#22c55e" strokeWidth={3} />
              <Line dataKey="expense" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Inventory Valuation">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={inventoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* RECEIVABLE / PAYABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="Accounts Receivable Aging">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={receivableData} dataKey="value" outerRadius={100}>
                <Cell fill="#22c55e" />
                <Cell fill="#f59e0b" />
                <Cell fill="#fb7185" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Accounts Payable Aging">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={payableData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* TAX */}
      <ChartBox title="Tax Liability & FBR Submission">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={taxData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="taxCollected" fill="#f59e0b" />
            <Bar dataKey="taxSubmitted" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
};

export default Dashboard;
