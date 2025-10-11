import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Desktop,
  MapPin,
  Calendar,
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  percentage?: number;
}

interface GeographicData {
  country: string;
  users: number;
  revenue: number;
  growth: number;
}

export const AnalyticsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "1y">(
    "30d",
  );
  const [realTimeMode, setRealTimeMode] = useState(true);

  // Real-time metrics
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: "Total Revenue",
      value: "$2,847,692",
      change: 12.5,
      changeType: "increase",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "12,847",
      change: 8.2,
      changeType: "increase",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "4,923",
      change: -2.1,
      changeType: "decrease",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: 0.8,
      changeType: "increase",
      icon: <Target className="w-6 h-6" />,
      color: "text-orange-600",
    },
  ]);

  // Revenue data for the past 30 days
  const [revenueData] = useState<ChartData[]>([
    { name: "Week 1", value: 65000 },
    { name: "Week 2", value: 78000 },
    { name: "Week 3", value: 92000 },
    { name: "Week 4", value: 88000 },
  ]);

  // User acquisition channels
  const [channelData] = useState<ChartData[]>([
    { name: "Organic Search", value: 45, percentage: 45 },
    { name: "Social Media", value: 25, percentage: 25 },
    { name: "Direct Traffic", value: 15, percentage: 15 },
    { name: "Email Marketing", value: 10, percentage: 10 },
    { name: "Paid Ads", value: 5, percentage: 5 },
  ]);

  // Device breakdown
  const [deviceData] = useState<ChartData[]>([
    { name: "Mobile", value: 68, percentage: 68 },
    { name: "Desktop", value: 28, percentage: 28 },
    { name: "Tablet", value: 4, percentage: 4 },
  ]);

  // Geographic data
  const [geoData] = useState<GeographicData[]>([
    { country: "Kenya", users: 8945, revenue: 1847692, growth: 15.2 },
    { country: "Tanzania", users: 2134, revenue: 456890, growth: 22.8 },
    { country: "Uganda", users: 1456, revenue: 298456, growth: 18.9 },
    { country: "Rwanda", users: 312, revenue: 89654, growth: 31.5 },
  ]);

  // Real-time updates
  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.title === "Total Revenue"
              ? `$${(parseFloat(metric.value.replace(/[$,]/g, "")) + Math.random() * 1000).toLocaleString()}`
              : metric.title === "Active Users"
                ? `${(parseInt(metric.value.replace(/,/g, "")) + Math.floor(Math.random() * 10)).toLocaleString()}`
                : metric.value,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  const getChangeIndicator = (
    change: number,
    type: "increase" | "decrease",
  ) => {
    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? "text-green-600" : "text-red-600";

    return (
      <div className={`flex items-center ${colorClass}`}>
        <Icon className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">
            Analytics Dashboard
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-lg">
              {(["7d", "30d", "90d", "1y"] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  {period}
                </Button>
              ))}
            </div>
            <Button
              variant={realTimeMode ? "default" : "outline"}
              size="sm"
              onClick={() => setRealTimeMode(!realTimeMode)}
            >
              <Activity className="w-4 h-4 mr-1" />
              {realTimeMode ? "Live" : "Paused"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  {getChangeIndicator(metric.change, metric.changeType)}
                </div>
                <div className={`${metric.color} opacity-80`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(item.value / Math.max(...revenueData.map((d) => d.value))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Acquisition Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Acquisition Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {channelData.map((channel, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {channel.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${channel.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">
                          {channel.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deviceData.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border rounded-lg"
                  >
                    {device.name === "Mobile" && (
                      <Smartphone className="w-8 h-8 text-green-600" />
                    )}
                    {device.name === "Desktop" && (
                      <Desktop className="w-8 h-8 text-blue-600" />
                    )}
                    {device.name === "Tablet" && (
                      <Calendar className="w-8 h-8 text-purple-600" />
                    )}
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-2xl font-bold">{device.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Monthly Recurring Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        $284,567
                      </p>
                      <p className="text-sm text-green-600">
                        +15.3% from last month
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Average Order Value
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        $186.42
                      </p>
                      <p className="text-sm text-blue-600">
                        +8.7% from last month
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Customer Lifetime Value
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        $1,247
                      </p>
                      <p className="text-sm text-purple-600">
                        +12.1% from last month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Goal</span>
                      <span className="text-sm">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "89%" }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      $284,567 / $320,000
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Quarterly Goal
                      </span>
                      <span className="text-sm">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "76%" }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      $847,692 / $1,200,000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Geographic Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geoData.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{country.country}</p>
                        <p className="text-sm text-gray-600">
                          {country.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {formatCurrency(country.revenue)}
                      </p>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">
                          {country.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">New Users</p>
                      <p className="text-xl font-bold text-blue-600">2,847</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Returning Users</p>
                      <p className="text-xl font-bold text-green-600">10,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="font-bold">8,947</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Duration</span>
                    <span className="font-bold">4m 32s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bounce Rate</span>
                    <span className="font-bold">32.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Page Views/Session</span>
                    <span className="font-bold">3.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Premium Subscription",
                    sales: 1247,
                    revenue: 62350,
                    growth: 15.2,
                  },
                  {
                    name: "Basic Plan",
                    sales: 3456,
                    revenue: 34560,
                    growth: 8.7,
                  },
                  {
                    name: "Enterprise Package",
                    sales: 89,
                    revenue: 178000,
                    growth: 22.1,
                  },
                  {
                    name: "Add-ons & Extras",
                    sales: 2134,
                    revenue: 21340,
                    growth: -3.2,
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${product.revenue.toLocaleString()}
                      </p>
                      <div
                        className={`flex items-center ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {product.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm">
                          {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
