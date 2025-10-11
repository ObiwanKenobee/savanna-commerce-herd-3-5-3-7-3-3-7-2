import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { aiCommerceEngine } from "@/services/AICommerce";
import { offlineManager } from "@/services/OfflineFirst";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Package,
  Globe,
  Smartphone,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Zap,
  Gauge,
  MapPin,
  RefreshCw,
} from "lucide-react";

// Data Types for Real-time Analytics
interface RealTimeMetrics {
  timestamp: number;
  activeUsers: number;
  transactions: number;
  revenue: number;
  conversionRate: number;
  pageViews: number;
  avgSessionTime: number;
  bounceRate: number;
}

interface RegionalData {
  region: string;
  country: string;
  users: number;
  transactions: number;
  revenue: number;
  topProducts: string[];
  paymentMethods: { method: string; percentage: number }[];
  demographics: { age: string; gender: string; percentage: number }[];
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  views: number;
  sales: number;
  revenue: number;
  conversionRate: number;
  rating: number;
  stockLevel: number;
  trend: "up" | "down" | "stable";
}

interface MarketTrend {
  timestamp: number;
  category: string;
  demand: number;
  sentiment: number;
  priceIndex: number;
  seasonalFactor: number;
}

interface NetworkAnalytics {
  connectionQuality: "poor" | "good" | "excellent";
  offlineUsers: number;
  avgLoadTime: number;
  failureRate: number;
  cacheHitRate: number;
}

const RealTimeAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("1h");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const websocketRef = useRef<WebSocket | null>(null);

  // State for real-time data
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [productPerformance, setProductPerformance] = useState<
    ProductPerformance[]
  >([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [networkAnalytics, setNetworkAnalytics] = useState<NetworkAnalytics>({
    connectionQuality: "good",
    offlineUsers: 0,
    avgLoadTime: 0,
    failureRate: 0,
    cacheHitRate: 0,
  });

  // Colors for charts
  const colors = {
    primary: "#2563eb",
    secondary: "#7c3aed",
    success: "#059669",
    warning: "#d97706",
    danger: "#dc2626",
    info: "#0891b2",
  };

  const africanCountryColors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];

  useEffect(() => {
    initializeRealTimeData();
    setupWebSocketConnection();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => {
      clearInterval(interval);
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [timeRange, selectedRegion]);

  // Initialize with sample data
  const initializeRealTimeData = async () => {
    setIsLoading(true);
    try {
      // Generate sample real-time metrics
      const metrics = generateSampleMetrics();
      setRealTimeMetrics(metrics);

      // Generate sample regional data
      const regions = generateSampleRegionalData();
      setRegionalData(regions);

      // Generate sample product performance
      const products = generateSampleProductPerformance();
      setProductPerformance(products);

      // Generate sample market trends
      const trends = generateSampleMarketTrends();
      setMarketTrends(trends);

      // Get network analytics
      const networkData = await getNetworkAnalytics();
      setNetworkAnalytics(networkData);

      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to load analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Setup WebSocket for real-time updates
  const setupWebSocketConnection = () => {
    const wsUrl = process.env.VITE_WS_URL || "ws://localhost:3001/analytics";

    try {
      websocketRef.current = new WebSocket(wsUrl);

      websocketRef.current.onopen = () => {
        console.log("Real-time analytics WebSocket connected");
      };

      websocketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleRealTimeUpdate(data);
      };

      websocketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      websocketRef.current.onclose = () => {
        console.log("WebSocket connection closed, attempting to reconnect...");
        setTimeout(setupWebSocketConnection, 5000);
      };
    } catch (error) {
      console.error("Failed to setup WebSocket:", error);
    }
  };

  // Handle real-time updates
  const handleRealTimeUpdate = (data: any) => {
    switch (data.type) {
      case "metrics_update":
        setRealTimeMetrics((prev) => [...prev.slice(-59), data.payload]);
        break;
      case "regional_update":
        setRegionalData((prev) =>
          prev.map((region) =>
            region.region === data.payload.region
              ? { ...region, ...data.payload }
              : region,
          ),
        );
        break;
      case "product_update":
        setProductPerformance((prev) =>
          prev.map((product) =>
            product.id === data.payload.id
              ? { ...product, ...data.payload }
              : product,
          ),
        );
        break;
      default:
        console.log("Unknown real-time update type:", data.type);
    }
    setLastUpdate(new Date());
  };

  // Generate sample data functions
  const generateSampleMetrics = (): RealTimeMetrics[] => {
    const now = Date.now();
    const data: RealTimeMetrics[] = [];

    for (let i = 59; i >= 0; i--) {
      const timestamp = now - i * 60000; // Every minute for last hour
      data.push({
        timestamp,
        activeUsers: Math.floor(Math.random() * 500) + 1200,
        transactions: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 10000) + 5000,
        conversionRate: Math.random() * 5 + 2,
        pageViews: Math.floor(Math.random() * 200) + 500,
        avgSessionTime: Math.random() * 300 + 180,
        bounceRate: Math.random() * 30 + 15,
      });
    }
    return data;
  };

  const generateSampleRegionalData = (): RegionalData[] => {
    return [
      {
        region: "East Africa",
        country: "Kenya",
        users: 2450,
        transactions: 1230,
        revenue: 125000,
        topProducts: ["Coffee Beans", "Mobile Phones", "Solar Panels"],
        paymentMethods: [
          { method: "M-Pesa", percentage: 65 },
          { method: "Cash on Delivery", percentage: 25 },
          { method: "Credit Card", percentage: 10 },
        ],
        demographics: [
          { age: "18-24", gender: "M", percentage: 15 },
          { age: "25-34", gender: "M", percentage: 25 },
          { age: "35-44", gender: "F", percentage: 20 },
        ],
      },
      {
        region: "West Africa",
        country: "Nigeria",
        users: 3200,
        transactions: 1850,
        revenue: 189000,
        topProducts: ["Textiles", "Electronics", "Food Products"],
        paymentMethods: [
          { method: "Bank Transfer", percentage: 45 },
          { method: "Cash on Delivery", percentage: 35 },
          { method: "Mobile Money", percentage: 20 },
        ],
        demographics: [
          { age: "18-24", gender: "F", percentage: 18 },
          { age: "25-34", gender: "M", percentage: 28 },
          { age: "35-44", gender: "F", percentage: 22 },
        ],
      },
      {
        region: "South Africa",
        country: "South Africa",
        users: 1890,
        transactions: 945,
        revenue: 156000,
        topProducts: ["Wine", "Automotive Parts", "Mining Equipment"],
        paymentMethods: [
          { method: "Credit Card", percentage: 50 },
          { method: "EFT", percentage: 30 },
          { method: "Cash on Delivery", percentage: 20 },
        ],
        demographics: [
          { age: "25-34", gender: "M", percentage: 22 },
          { age: "35-44", gender: "F", percentage: 26 },
          { age: "45-54", gender: "M", percentage: 20 },
        ],
      },
    ];
  };

  const generateSampleProductPerformance = (): ProductPerformance[] => {
    const products = [
      "Solar Panel Kit",
      "Smartphone",
      "Coffee Beans",
      "Textile Fabric",
      "Motorcycle Parts",
      "Medical Supplies",
      "Educational Materials",
      "Agricultural Tools",
      "Water Purification",
      "Power Bank",
    ];

    return products.map((name, index) => ({
      id: `product_${index}`,
      name,
      category: ["Electronics", "Agriculture", "Health", "Education", "Energy"][
        index % 5
      ],
      views: Math.floor(Math.random() * 1000) + 500,
      sales: Math.floor(Math.random() * 100) + 20,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      conversionRate: Math.random() * 10 + 2,
      rating: Math.random() * 2 + 3,
      stockLevel: Math.floor(Math.random() * 100),
      trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as
        | "up"
        | "down"
        | "stable",
    }));
  };

  const generateSampleMarketTrends = (): MarketTrend[] => {
    const categories = [
      "Electronics",
      "Agriculture",
      "Health",
      "Education",
      "Energy",
    ];
    const now = Date.now();
    const data: MarketTrend[] = [];

    categories.forEach((category) => {
      for (let i = 23; i >= 0; i--) {
        data.push({
          timestamp: now - i * 3600000, // Every hour for last 24 hours
          category,
          demand: Math.random() * 100 + 50,
          sentiment: (Math.random() - 0.5) * 2,
          priceIndex: Math.random() * 20 + 90,
          seasonalFactor: Math.random() * 0.4 + 0.8,
        });
      }
    });

    return data;
  };

  const getNetworkAnalytics = async (): Promise<NetworkAnalytics> => {
    const networkQuality = offlineManager.getNetworkQuality();
    const syncStatus = offlineManager.getSyncStatus();

    return {
      connectionQuality:
        networkQuality.effectiveType === "4g"
          ? "excellent"
          : networkQuality.effectiveType === "3g"
            ? "good"
            : "poor",
      offlineUsers: Math.floor(Math.random() * 50) + 10,
      avgLoadTime: networkQuality.rtt || Math.random() * 1000 + 500,
      failureRate: Math.random() * 5,
      cacheHitRate: Math.random() * 30 + 70,
    };
  };

  const updateMetrics = () => {
    // Simulate real-time metric updates
    setRealTimeMetrics((prev) => {
      const newMetric: RealTimeMetrics = {
        timestamp: Date.now(),
        activeUsers: Math.floor(Math.random() * 500) + 1200,
        transactions: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 10000) + 5000,
        conversionRate: Math.random() * 5 + 2,
        pageViews: Math.floor(Math.random() * 200) + 500,
        avgSessionTime: Math.random() * 300 + 180,
        bounceRate: Math.random() * 30 + 15,
      };
      return [...prev.slice(-59), newMetric];
    });
    setLastUpdate(new Date());
  };

  // Render components
  const renderRealTimeOverview = () => {
    const latest = realTimeMetrics[realTimeMetrics.length - 1];
    if (!latest) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {latest.activeUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  Live now
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {latest.transactions}
                </p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+
                  {Math.floor(Math.random() * 10)}% vs 1h ago
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${(latest.revenue / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-purple-500 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Real-time
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {latest.conversionRate.toFixed(1)}%
                </p>
                <p className="text-xs text-orange-500 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  Optimizing
                </p>
              </div>
              <Gauge className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderRealTimeCharts = () => (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Real-Time User Activity</CardTitle>
          <CardDescription>
            Active users and page views over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={realTimeMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString().slice(0, 5)
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                formatter={(value, name) => [
                  value,
                  name === "activeUsers" ? "Active Users" : "Page Views",
                ]}
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stackId="1"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="pageViews"
                stackId="2"
                stroke={colors.secondary}
                fill={colors.secondary}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue & Transactions</CardTitle>
          <CardDescription>
            Real-time revenue and transaction volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realTimeMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString().slice(0, 5)
                }
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke={colors.success}
                strokeWidth={2}
                name="Revenue ($)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="transactions"
                stroke={colors.warning}
                strokeWidth={2}
                name="Transactions"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegionalAnalytics = () => (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>
            Revenue distribution across African regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? `$${value.toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Users",
                ]}
              />
              <Legend />
              <Bar dataKey="revenue" fill={colors.success} name="Revenue ($)" />
              <Bar dataKey="users" fill={colors.info} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method Distribution</CardTitle>
          <CardDescription>Preferred payment methods by region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionalData.flatMap((region, regionIndex) =>
                  region.paymentMethods.map((method) => ({
                    ...method,
                    region: region.region,
                    fill: africanCountryColors[
                      regionIndex % africanCountryColors.length
                    ],
                  })),
                )}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="percentage"
                nameKey="method"
                label={({ method, percentage }) => `${method}: ${percentage}%`}
              >
                {regionalData.flatMap((region, regionIndex) =>
                  region.paymentMethods.map((method, methodIndex) => (
                    <Cell
                      key={`cell-${regionIndex}-${methodIndex}`}
                      fill={
                        africanCountryColors[
                          (regionIndex * 3 + methodIndex) %
                            africanCountryColors.length
                        ]
                      }
                    />
                  )),
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductPerformance = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
        <CardDescription>
          Real-time product analytics and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productPerformance.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-slate-600">{product.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm font-semibold">{product.views}</div>
                  <div className="text-xs text-slate-600">Views</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{product.sales}</div>
                  <div className="text-xs text-slate-600">Sales</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    ${(product.revenue / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs text-slate-600">Revenue</div>
                </div>
                <div>
                  <div
                    className={`text-sm font-semibold flex items-center ${
                      product.trend === "up"
                        ? "text-green-600"
                        : product.trend === "down"
                          ? "text-red-600"
                          : "text-slate-600"
                    }`}
                  >
                    {product.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : product.trend === "down" ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : (
                      <Activity className="h-3 w-3 mr-1" />
                    )}
                    {product.conversionRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-600">Conv. Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderNetworkAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {networkAnalytics.connectionQuality === "excellent" ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : networkAnalytics.connectionQuality === "good" ? (
            <Wifi className="h-5 w-5 text-yellow-600" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-600" />
          )}
          <span>Network & Performance Analytics</span>
        </CardTitle>
        <CardDescription>
          Connection quality and offline capabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {networkAnalytics.connectionQuality.toUpperCase()}
            </div>
            <div className="text-xs text-slate-600">Connection Quality</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {networkAnalytics.offlineUsers}
            </div>
            <div className="text-xs text-slate-600">Offline Users</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {networkAnalytics.cacheHitRate.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-600">Cache Hit Rate</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {networkAnalytics.avgLoadTime.toFixed(0)}ms
            </div>
            <div className="text-xs text-slate-600">Avg Load Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Real-Time Analytics
          </h2>
          <p className="text-slate-600">
            Live marketplace performance and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="east">East Africa</SelectItem>
              <SelectItem value="west">West Africa</SelectItem>
              <SelectItem value="south">South Africa</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={initializeRealTimeData}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Last Update Indicator */}
      <div className="flex items-center space-x-4 text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live Updates Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Real-time Overview */}
      {renderRealTimeOverview()}

      {/* Real-time Charts */}
      {renderRealTimeCharts()}

      {/* Regional Analytics */}
      {renderRegionalAnalytics()}

      {/* Product Performance */}
      {renderProductPerformance()}

      {/* Network Analytics */}
      {renderNetworkAnalytics()}
    </div>
  );
};

export default RealTimeAnalytics;
