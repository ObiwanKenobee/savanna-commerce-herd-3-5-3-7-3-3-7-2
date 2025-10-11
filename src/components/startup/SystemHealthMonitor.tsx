import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Database,
  Server,
  Wifi,
  Zap,
} from "lucide-react";

interface HealthMetric {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical";
  value: number;
  threshold: number;
  unit: string;
  lastUpdated: Date;
}

interface SystemStatus {
  overall: "healthy" | "warning" | "critical";
  uptime: number;
  activeUsers: number;
  requestsPerMinute: number;
  errorRate: number;
  metrics: HealthMetric[];
}

export const SystemHealthMonitor: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    overall: "healthy",
    uptime: 99.9,
    activeUsers: 1247,
    requestsPerMinute: 342,
    errorRate: 0.02,
    metrics: [
      {
        id: "cpu",
        name: "CPU Usage",
        status: "healthy",
        value: 23.5,
        threshold: 80,
        unit: "%",
        lastUpdated: new Date(),
      },
      {
        id: "memory",
        name: "Memory Usage",
        status: "healthy",
        value: 67.2,
        threshold: 85,
        unit: "%",
        lastUpdated: new Date(),
      },
      {
        id: "database",
        name: "Database Response",
        status: "healthy",
        value: 45,
        threshold: 200,
        unit: "ms",
        lastUpdated: new Date(),
      },
      {
        id: "api",
        name: "API Response Time",
        status: "healthy",
        value: 120,
        threshold: 500,
        unit: "ms",
        lastUpdated: new Date(),
      },
    ],
  });

  const [realTimeMode, setRealTimeMode] = useState(true);

  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        requestsPerMinute:
          prev.requestsPerMinute + Math.floor(Math.random() * 40 - 20),
        errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.01),
        metrics: prev.metrics.map((metric) => ({
          ...metric,
          value: Math.max(
            0,
            metric.value + (Math.random() - 0.5) * (metric.value * 0.1),
          ),
          status: determineStatus(metric.value, metric.threshold),
          lastUpdated: new Date(),
        })),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const determineStatus = (
    value: number,
    threshold: number,
  ): "healthy" | "warning" | "critical" => {
    if (value >= threshold * 0.9) return "critical";
    if (value >= threshold * 0.7) return "warning";
    return "healthy";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            System Health Dashboard
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(status.overall)}>
              {getStatusIcon(status.overall)}
              <span className="ml-1">{status.overall.toUpperCase()}</span>
            </Badge>
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
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-green-600">
                  {status.uptime}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">
                  {status.activeUsers.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Requests/min</p>
                <p className="text-2xl font-bold">{status.requestsPerMinute}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold">
                  {(status.errorRate * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {status.metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              {getStatusIcon(metric.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value.toFixed(1)}
                {metric.unit}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-600">
                  Threshold: {metric.threshold}
                  {metric.unit}
                </p>
                <Badge
                  variant="outline"
                  className={getStatusColor(metric.status)}
                >
                  {metric.status}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.status === "critical"
                      ? "bg-red-500"
                      : metric.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(100, (metric.value / metric.threshold) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {metric.lastUpdated.toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {[
              {
                time: new Date(),
                message: "New user registration from Nairobi",
                type: "info",
              },
              {
                time: new Date(Date.now() - 30000),
                message: "Payment processed successfully",
                type: "success",
              },
              {
                time: new Date(Date.now() - 60000),
                message: "API response time spike detected",
                type: "warning",
              },
              {
                time: new Date(Date.now() - 90000),
                message: "Database connection restored",
                type: "success",
              },
              {
                time: new Date(Date.now() - 120000),
                message: "Bulk order placed: 500 items",
                type: "info",
              },
            ].map((log, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">
                  {log.time.toLocaleTimeString()}
                </span>
                <Badge
                  variant="outline"
                  className={
                    log.type === "success"
                      ? "text-green-600 border-green-300"
                      : log.type === "warning"
                        ? "text-yellow-600 border-yellow-300"
                        : "text-blue-600 border-blue-300"
                  }
                >
                  {log.type}
                </Badge>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthMonitor;
