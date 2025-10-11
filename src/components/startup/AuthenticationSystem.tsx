import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Key,
  Smartphone,
  Mail,
  Users,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  QrCode,
  Fingerprint,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "premium";
  lastLogin: Date;
  isActive: boolean;
  mfaEnabled: boolean;
  loginAttempts: number;
  createdAt: Date;
}

interface SecurityEvent {
  id: string;
  type: "login" | "logout" | "failed_login" | "mfa_setup" | "password_change";
  userId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
}

export const AuthenticationSystem: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "admin@savanna.ke",
      name: "System Admin",
      role: "admin",
      lastLogin: new Date(),
      isActive: true,
      mfaEnabled: true,
      loginAttempts: 0,
      createdAt: new Date(Date.now() - 86400000 * 30),
    },
    {
      id: "2",
      email: "supplier@savanna.ke",
      name: "Premium Supplier",
      role: "premium",
      lastLogin: new Date(Date.now() - 3600000),
      isActive: true,
      mfaEnabled: false,
      loginAttempts: 1,
      createdAt: new Date(Date.now() - 86400000 * 7),
    },
  ]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      type: "login",
      userId: "1",
      timestamp: new Date(),
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/91.0",
      success: true,
    },
    {
      id: "2",
      type: "failed_login",
      userId: "2",
      timestamp: new Date(Date.now() - 1800000),
      ipAddress: "10.0.0.50",
      userAgent: "Safari/14.0",
      success: false,
    },
  ]);

  const [authSettings, setAuthSettings] = useState({
    requireMFA: false,
    passwordMinLength: 8,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableBiometric: true,
    enableSSOGoogle: true,
    enableSSOGitHub: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState("overview");

  const getStatusBadge = (isActive: boolean) => (
    <Badge
      className={
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );

  const getRoleBadge = (role: string) => (
    <Badge
      className={
        role === "admin"
          ? "bg-purple-100 text-purple-800"
          : role === "premium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
      }
    >
      {role.toUpperCase()}
    </Badge>
  );

  const generateAPIKey = () => {
    return (
      "sk_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API",
      key: generateAPIKey(),
      created: new Date(),
      lastUsed: new Date(),
    },
    {
      id: "2",
      name: "Development API",
      key: generateAPIKey(),
      created: new Date(Date.now() - 86400000),
      lastUsed: null,
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Shield className="w-6 h-6 mr-2 text-green-600" />
            Authentication & Security Center
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Auth Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Sessions</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">MFA Enabled</p>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.mfaEnabled).length}
                    </p>
                  </div>
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Failed Logins</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {event.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">
                          {event.type.replace("_", " ").toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          User ID: {event.userId} • IP: {event.ipAddress}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {event.timestamp.toLocaleString()}
                      </p>
                      <Badge
                        className={
                          event.success
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {event.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Last login: {user.lastLogin.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.isActive)}
                      {user.mfaEnabled && (
                        <Smartphone className="w-4 h-4 text-green-600" />
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fingerprint className="w-5 h-5 mr-2" />
                  Multi-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Require MFA for all users</span>
                  <Button
                    variant={authSettings.requireMFA ? "default" : "outline"}
                    onClick={() =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        requireMFA: !prev.requireMFA,
                      }))
                    }
                  >
                    {authSettings.requireMFA ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Biometric Authentication</span>
                  <Button
                    variant={
                      authSettings.enableBiometric ? "default" : "outline"
                    }
                    onClick={() =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        enableBiometric: !prev.enableBiometric,
                      }))
                    }
                  >
                    {authSettings.enableBiometric ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Session Timeout (minutes)
                  </label>
                  <Input
                    type="number"
                    value={authSettings.sessionTimeout}
                    onChange={(e) =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        sessionTimeout: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Password Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Minimum Password Length
                  </label>
                  <Input
                    type="number"
                    value={authSettings.passwordMinLength}
                    onChange={(e) =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        passwordMinLength: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Max Login Attempts
                  </label>
                  <Input
                    type="number"
                    value={authSettings.maxLoginAttempts}
                    onChange={(e) =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        maxLoginAttempts: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Google SSO</span>
                  <Button
                    variant={
                      authSettings.enableSSOGoogle ? "default" : "outline"
                    }
                    onClick={() =>
                      setAuthSettings((prev) => ({
                        ...prev,
                        enableSSOGoogle: !prev.enableSSOGoogle,
                      }))
                    }
                  >
                    {authSettings.enableSSOGoogle ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>API Key Management</CardTitle>
              <Button
                onClick={() => {
                  const newKey = {
                    id: Date.now().toString(),
                    name: `API Key ${apiKeys.length + 1}`,
                    key: generateAPIKey(),
                    created: new Date(),
                    lastUsed: null,
                  };
                  setApiKeys((prev) => [...prev, newKey]);
                }}
              >
                Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{apiKey.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge>Active</Badge>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                        {showPassword
                          ? apiKey.key
                          : `${apiKey.key.substring(0, 10)}...`}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Created: {apiKey.created.toLocaleString()}</p>
                      <p>
                        Last used:{" "}
                        {apiKey.lastUsed
                          ? apiKey.lastUsed.toLocaleString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Role for New Users
                    </label>
                    <select className="w-full p-2 border rounded">
                      <option value="user">User</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Account Verification Method
                    </label>
                    <select className="w-full p-2 border rounded">
                      <option value="email">Email Verification</option>
                      <option value="sms">SMS Verification</option>
                      <option value="both">Both Email & SMS</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Backup & Recovery</h3>
                  <div className="space-y-2">
                    <Button className="w-full md:w-auto">
                      Generate Recovery Codes
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full md:w-auto ml-0 md:ml-2"
                    >
                      Export User Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationSystem;
