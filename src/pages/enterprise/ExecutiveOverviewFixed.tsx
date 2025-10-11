import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Globe,
  Target,
  Zap,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const ExecutiveOverviewFixed = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const kpis = [
    {
      title: "Total Revenue",
      value: "KES 2,847,692",
      change: 12.5,
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Users",
      value: "12,847",
      change: 8.2,
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Market Share",
      value: "23.4%",
      change: -2.1,
      trend: "down",
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Customer Satisfaction",
      value: "94.2%",
      change: 3.7,
      trend: "up",
      icon: <Award className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New supplier onboarded",
      time: "2 hours ago",
      type: "success",
    },
    { id: 2, action: "Payment processed", time: "4 hours ago", type: "info" },
    {
      id: 3,
      action: "System maintenance completed",
      time: "6 hours ago",
      type: "success",
    },
    {
      id: 4,
      action: "Security audit completed",
      time: "1 day ago",
      type: "warning",
    },
  ];

  const topCategories = [
    { name: "Electronics", revenue: 847692, growth: 15.2 },
    { name: "Fashion", revenue: 623451, growth: 8.7 },
    { name: "Home & Garden", revenue: 456789, growth: 22.1 },
    { name: "Sports", revenue: 234567, growth: -3.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="w-8 h-8 text-yellow-600 mr-3" />
                Executive Overview
              </h1>
              <p className="text-gray-600 mt-1">
                High-level business metrics and KPI dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button
                onClick={() => setIsLoading(!isLoading)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {kpi.value}
                    </p>
                    <div
                      className={`flex items-center mt-2 ${
                        kpi.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {kpi.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(kpi.change)}%
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${kpi.bgColor} ${kpi.color} p-3 rounded-full`}
                  >
                    {kpi.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", revenue: 1800000 },
                      { month: "Feb", revenue: 2100000 },
                      { month: "Mar", revenue: 1950000 },
                      { month: "Apr", revenue: 2340000 },
                      { month: "May", revenue: 2847692 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {item.month}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(item.revenue / 2847692) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold min-w-[80px] text-right">
                            {(item.revenue / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Top Categories
                  </CardTitle>
                  <CardDescription>
                    Best performing product categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-gray-600">
                            KES {category.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div
                          className={`flex items-center ${
                            category.growth > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {category.growth > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {Math.abs(category.growth)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    KES 1.2M
                  </div>
                  <p className="text-sm text-gray-600">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    KES 4,567
                  </div>
                  <p className="text-sm text-gray-600">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Gross Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    34.2%
                  </div>
                  <p className="text-sm text-gray-600">+2.1% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Uptime</span>
                      <span className="font-bold text-green-600">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span className="font-bold">245ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Error Rate</span>
                      <span className="font-bold text-green-600">0.02%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Daily Active Users</span>
                      <span className="font-bold">8,945</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Session Duration</span>
                      <span className="font-bold">4m 32s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bounce Rate</span>
                      <span className="font-bold">32.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest system and business activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      {activity.type === "success" && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {activity.type === "warning" && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExecutiveOverviewFixed;
