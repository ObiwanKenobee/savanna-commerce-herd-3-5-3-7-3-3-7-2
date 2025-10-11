/**
 * Unified API Layer for Modular Monolith
 * Single entry point for all API requests
 */

import express from "express";
import { modularMonolith } from "../services/ModularMonolithService";
import { authenticateToken } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { rateLimit } from "../middleware/rateLimit";

const router = express.Router();

// Middleware
router.use(rateLimit);
router.use(express.json());

// Health Check
router.get("/health", async (req, res) => {
  try {
    const health = await modularMonolith.healthCheck();
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: "Health check failed" });
  }
});

// Authentication Routes
router.post("/auth/login", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "auth",
      { moduleId: "auth", requestId: req.id },
      { action: "login", ...req.body },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(401).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "auth",
      { moduleId: "auth", requestId: req.id },
      { action: "register", ...req.body },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Protected Routes
router.use("/retailers", authenticateToken);
router.use("/suppliers", authenticateToken);
router.use("/logistics", authenticateToken);
router.use("/analytics", authenticateToken);

// Retailer API Routes
router.post("/retailers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "createRetailer", data: req.body },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create retailer" });
  }
});

router.get("/retailers/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getRetailer", retailerId: req.params.id },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get retailer" });
  }
});

router.put("/retailers/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "updateRetailer", retailerId: req.params.id, data: req.body },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update retailer" });
  }
});

router.get("/retailers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "listRetailers", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list retailers" });
  }
});

// Order Management
router.post("/orders", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api", retailerId: req.body.retailerId },
      },
      { action: "createOrder", data: req.body },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getOrder", orderId: req.params.id },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
});

router.put("/orders/:id/status", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "updateOrderStatus",
        orderId: req.params.id,
        status: req.body.status,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "listOrders", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list orders" });
  }
});

// Supplier API Routes
router.post("/suppliers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "createSupplier", data: req.body },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create supplier" });
  }
});

router.get("/suppliers/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getSupplier", supplierId: req.params.id },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get supplier" });
  }
});

router.get("/suppliers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "listSuppliers", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list suppliers" });
  }
});

// Product Management
router.post("/suppliers/:id/products", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "createProduct",
        data: { ...req.body, supplierId: req.params.id },
      },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.get("/suppliers/:id/products", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getProducts", supplierId: req.params.id },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
});

router.put("/products/:id/stock", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "updateStock",
        productId: req.params.id,
        quantity: req.body.quantity,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
});

// Logistics API Routes
router.get("/deliveries/track/:trackingNumber", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "trackDelivery", trackingNumber: req.params.trackingNumber },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to track delivery" });
  }
});

router.get("/deliveries", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "listDeliveries", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list deliveries" });
  }
});

router.put("/deliveries/:id/status", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "updateDeliveryStatus",
        deliveryId: req.params.id,
        status: req.body.status,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update delivery status" });
  }
});

// Vehicle Management
router.post("/vehicles", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "createVehicle", data: req.body },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
});

router.get("/vehicles", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getVehicles", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get vehicles" });
  }
});

router.put("/vehicles/:id/location", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "updateVehicleLocation",
        vehicleId: req.params.id,
        location: req.body.location,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update vehicle location" });
  }
});

// Driver Management
router.post("/drivers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "createDriver", data: req.body },
    );

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create driver" });
  }
});

router.get("/drivers", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getDrivers", filters: req.query },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get drivers" });
  }
});

// Route Optimization
router.post("/routes/optimize", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "optimizeRoutes", zone: req.body.zone, date: req.body.date },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to optimize routes" });
  }
});

// Cost Calculation
router.post("/delivery-cost", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "calculateDeliveryCost", ...req.body },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate delivery cost" });
  }
});

// Analytics Routes
router.get("/analytics/retailers/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "retailer",
      {
        moduleId: "retailer",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "getAnalytics",
        retailerId: req.params.id,
        timeframe: req.query.timeframe,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get retailer analytics" });
  }
});

router.get("/analytics/suppliers/:id", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "supplier",
      {
        moduleId: "supplier",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      {
        action: "getAnalytics",
        supplierId: req.params.id,
        timeframe: req.query.timeframe,
      },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get supplier analytics" });
  }
});

router.get("/analytics/logistics", async (req, res) => {
  try {
    const result = await modularMonolith.executeModule(
      "logistics",
      {
        moduleId: "logistics",
        requestId: req.id,
        userId: req.user?.id,
        metadata: { source: "api" },
      },
      { action: "getAnalytics", timeframe: req.query.timeframe },
    );

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get logistics analytics" });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  console.error("API Error:", error);
  res.status(500).json({
    error: "Internal server error",
    requestId: req.id,
  });
});

export default router;
