import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Shield,
  Smartphone,
  Globe,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  method: "card" | "mpesa" | "bank" | "wallet";
  customer: string;
  timestamp: Date;
  fees: number;
  description: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "mobile" | "bank" | "crypto";
  enabled: boolean;
  fees: number;
  dailyLimit: number;
  monthlyVolume: number;
  successRate: number;
}

interface FinancialMetric {
  period: string;
  revenue: number;
  transactions: number;
  fees: number;
  refunds: number;
  growth: number;
}

export const PaymentProcessingSystem: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "24h" | "7d" | "30d" | "90d"
  >("30d");
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "txn_001",
      amount: 15600,
      currency: "KES",
      status: "completed",
      method: "mpesa",
      customer: "john@example.com",
      timestamp: new Date(),
      fees: 156,
      description: "Premium subscription payment",
    },
    {
      id: "txn_002",
      amount: 45000,
      currency: "KES",
      status: "pending",
      method: "bank",
      customer: "supplier@savanna.ke",
      timestamp: new Date(Date.now() - 1800000),
      fees: 450,
      description: "Bulk order payment",
    },
    {
      id: "txn_003",
      amount: 8900,
      currency: "KES",
      status: "failed",
      method: "card",
      customer: "customer@email.com",
      timestamp: new Date(Date.now() - 3600000),
      fees: 0,
      description: "Product purchase",
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "mpesa",
      name: "M-Pesa",
      type: "mobile",
      enabled: true,
      fees: 1.0,
      dailyLimit: 1000000,
      monthlyVolume: 15600000,
      successRate: 97.8,
    },
    {
      id: "card",
      name: "Credit/Debit Cards",
      type: "card",
      enabled: true,
      fees: 2.9,
      dailyLimit: 500000,
      monthlyVolume: 8900000,
      successRate: 94.2,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      type: "bank",
      enabled: true,
      fees: 0.5,
      dailyLimit: 5000000,
      monthlyVolume: 23400000,
      successRate: 99.1,
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      type: "crypto",
      enabled: false,
      fees: 1.5,
      dailyLimit: 100000,
      monthlyVolume: 0,
      successRate: 0,
    },
  ]);

  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetric[]>([
    {
      period: "Week 1",
      revenue: 1840000,
      transactions: 234,
      fees: 18400,
      refunds: 12000,
      growth: 15.2,
    },
    {
      period: "Week 2",
      revenue: 2100000,
      transactions: 289,
      fees: 21000,
      refunds: 8500,
      growth: 14.1,
    },
    {
      period: "Week 3",
      revenue: 1950000,
      transactions: 267,
      fees: 19500,
      refunds: 15600,
      growth: -7.1,
    },
    {
      period: "Week 4",
      revenue: 2340000,
      transactions: 312,
      fees: 23400,
      refunds: 9800,
      growth: 20.0,
    },
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new transaction
      const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        amount: Math.floor(Math.random() * 50000) + 1000,
        currency: "KES",
        status:
          Math.random() > 0.15
            ? "completed"
            : Math.random() > 0.5
              ? "pending"
              : "failed",
        method: ["mpesa", "card", "bank"][Math.floor(Math.random() * 3)] as any,
        customer: `customer${Math.floor(Math.random() * 1000)}@example.com`,
        timestamp: new Date(),
        fees: Math.floor(Math.random() * 500) + 50,
        description: ["Product purchase", "Subscription payment", "Bulk order"][
          Math.floor(Math.random() * 3)
        ],
      };

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    const config = {
      completed: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-3 h-3" />,
      },
      failed: {
        color: "bg-red-100 text-red-800",
        icon: <AlertTriangle className="w-3 h-3" />,
      },
      refunded: {
        color: "bg-gray-100 text-gray-800",
        icon: <RefreshCw className="w-3 h-3" />,
      },
    };

    const { color, icon } = config[status as keyof typeof config];
    return (
      <Badge className={`${color} flex items-center gap-1`}>
        {icon}
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "mpesa":
        return <Smartphone className="w-4 h-4 text-green-600" />;
      case "card":
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case "bank":
        return <Globe className="w-4 h-4 text-purple-600" />;
      case "wallet":
        return <DollarSign className="w-4 h-4 text-orange-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number, currency: string = "KES") => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.fees, 0);

  const successRate =
    (transactions.filter((t) => t.status === "completed").length /
      transactions.length) *
    100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-green-600" />
            Payment Processing Center
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={showSensitiveData ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
            >
              {showSensitiveData ? (
                <EyeOff className="w-4 h-4 mr-1" />
              ) : (
                <Eye className="w-4 h-4 mr-1" />
              )}
              {showSensitiveData ? "Hide" : "Show"} Details
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {showSensitiveData ? formatCurrency(totalRevenue) : "••••••"}
                </p>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Transactions
                </p>
                <p className="text-2xl font-bold">{transactions.length}</p>
                <div className="flex items-center text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+8.2%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Success Rate
                </p>
                <p className="text-2xl font-bold">{successRate.toFixed(1)}%</p>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Excellent</span>
                </div>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold">
                  {showSensitiveData ? formatCurrency(totalFees) : "••••••"}
                </p>
                <div className="flex items-center text-orange-600">
                  <PieChart className="w-4 h-4 mr-1" />
                  <span className="text-sm">2.1% avg</span>
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {getMethodIcon(transaction.method)}
                      <div>
                        <p className="font-medium">
                          {showSensitiveData
                            ? transaction.id
                            : `••••${transaction.id.slice(-4)}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {showSensitiveData
                            ? transaction.customer
                            : "••••••@••••••.com"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {showSensitiveData
                          ? formatCurrency(transaction.amount)
                          : "••••••"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fee:{" "}
                        {showSensitiveData
                          ? formatCurrency(transaction.fees)
                          : "••••"}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(transaction.status)}
                        <span className="text-xs text-gray-500">
                          {transaction.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="flex items-center">
                    {getMethodIcon(method.type)}
                    <span className="ml-2">{method.name}</span>
                  </CardTitle>
                  <Badge
                    className={
                      method.enabled
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {method.enabled ? "Active" : "Inactive"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Processing Fee
                      </span>
                      <span className="font-medium">{method.fees}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Daily Limit</span>
                      <span className="font-medium">
                        {showSensitiveData
                          ? formatCurrency(method.dailyLimit)
                          : "••••••"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Monthly Volume
                      </span>
                      <span className="font-medium">
                        {showSensitiveData
                          ? formatCurrency(method.monthlyVolume)
                          : "••••••"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Success Rate
                      </span>
                      <span className="font-medium text-green-600">
                        {method.successRate}%
                      </span>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant={method.enabled ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setPaymentMethods((prev) =>
                            prev.map((m) =>
                              m.id === method.id
                                ? { ...m, enabled: !m.enabled }
                                : m,
                            ),
                          );
                        }}
                      >
                        {method.enabled ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {metric.period}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(metric.revenue / Math.max(...financialMetrics.map((m) => m.revenue))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold w-20 text-right">
                          {showSensitiveData
                            ? formatCurrency(metric.revenue)
                            : "••••••"}
                        </span>
                        <div
                          className={`flex items-center ${metric.growth > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {metric.growth > 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          <span className="text-xs">
                            {Math.abs(metric.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods
                    .filter((m) => m.enabled)
                    .map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(method.type)}
                          <span className="text-sm font-medium">
                            {method.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${method.successRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold w-12 text-right">
                            {method.successRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Net Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    {showSensitiveData
                      ? formatCurrency(totalRevenue - totalFees)
                      : "••••••"}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Processing Fees</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {showSensitiveData ? formatCurrency(totalFees) : "••••••"}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Transaction</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {showSensitiveData
                      ? formatCurrency(totalRevenue / transactions.length)
                      : "••••••"}
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Fee Rate</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {((totalFees / totalRevenue) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Default Currency
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option value="KES">Kenyan Shilling (KES)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Payment Timeout (minutes)
                  </label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Auto-refund Failed Payments
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option value="immediate">Immediate</option>
                    <option value="24h">After 24 hours</option>
                    <option value="manual">Manual only</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Require 3D Secure</span>
                  <Button variant="default" size="sm">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fraud Detection</span>
                  <Button variant="default" size="sm">
                    Active
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>IP Whitelisting</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Threshold</label>
                  <select className="w-full p-2 border rounded">
                    <option value="low">Low (Strict)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Permissive)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentProcessingSystem;
