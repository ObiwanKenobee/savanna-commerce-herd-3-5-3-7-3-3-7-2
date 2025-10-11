import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import crudService from "@/services/completeCrudService";

const TradingHubsTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hubCount, setHubCount] = useState<number>(0);

  const testTradingHubsAPI = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Testing trading hubs API...");
      const hubs = await crudService.getTradingHubs({
        page: 1,
        limit: 10,
      });

      setHubCount(hubs.length);
      setSuccess(`Successfully loaded ${hubs.length} trading hubs`);
      console.log("API test successful:", hubs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`API test failed: ${errorMessage}`);
      console.error("API test failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testTradingHubsAPI();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Trading Hubs API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={testTradingHubsAPI}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Testing..." : "Test API"}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600">Hubs loaded: {hubCount}</div>
      </CardContent>
    </Card>
  );
};

export default TradingHubsTest;
