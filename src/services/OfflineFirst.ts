/**
 * Offline-First African Mobile Architecture
 * Progressive Web App system optimized for intermittent connectivity
 * and low-bandwidth environments common across Africa
 */

import { openDB, IDBPDatabase } from "idb";

// Offline Data Types
export interface OfflineAction {
  id: string;
  type: "CREATE" | "UPDATE" | "DELETE" | "SYNC";
  resource: string;
  data: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  priority: "low" | "medium" | "high" | "critical";
}

export interface SyncStatus {
  lastSync: Date;
  pendingActions: number;
  failedActions: number;
  syncInProgress: boolean;
  connectionQuality: "offline" | "poor" | "good" | "excellent";
}

export interface CacheStrategy {
  resource: string;
  strategy:
    | "cache-first"
    | "network-first"
    | "cache-only"
    | "network-only"
    | "stale-while-revalidate";
  maxAge: number; // in milliseconds
  priority: number;
}

export interface OfflineCapabilities {
  browse: boolean;
  search: boolean;
  cart: boolean;
  orders: boolean;
  payments: boolean;
  messaging: boolean;
  inventory: boolean;
}

// Network Quality Detection
export interface NetworkQuality {
  effectiveType: "2g" | "3g" | "4g" | "unknown";
  downlink: number; // Mbps
  rtt: number; // milliseconds
  saveData: boolean;
  isOnline: boolean;
}

class OfflineFirstManager {
  private db: IDBPDatabase | null = null;
  private syncQueue: OfflineAction[] = [];
  private cacheStrategies: Map<string, CacheStrategy> = new Map();
  private syncStatus: SyncStatus = {
    lastSync: new Date(0),
    pendingActions: 0,
    failedActions: 0,
    syncInProgress: false,
    connectionQuality: "offline",
  };

  constructor() {
    this.initializeDatabase();
    this.setupNetworkMonitoring();
    this.setupCacheStrategies();
    this.startSyncWorker();
  }

  // Initialize IndexedDB for offline storage
  private async initializeDatabase(): Promise<void> {
    try {
      this.db = await openDB("savanna-offline", 1, {
        upgrade(db) {
          // Products store
          if (!db.objectStoreNames.contains("products")) {
            const productsStore = db.createObjectStore("products", {
              keyPath: "id",
            });
            productsStore.createIndex("category", "category");
            productsStore.createIndex("supplier", "supplier");
            productsStore.createIndex("lastUpdated", "lastUpdated");
          }

          // Orders store
          if (!db.objectStoreNames.contains("orders")) {
            const ordersStore = db.createObjectStore("orders", {
              keyPath: "id",
            });
            ordersStore.createIndex("status", "status");
            ordersStore.createIndex("userId", "userId");
            ordersStore.createIndex("timestamp", "timestamp");
          }

          // Cart store
          if (!db.objectStoreNames.contains("cart")) {
            db.createObjectStore("cart", { keyPath: "id" });
          }

          // Sync queue store
          if (!db.objectStoreNames.contains("syncQueue")) {
            const syncStore = db.createObjectStore("syncQueue", {
              keyPath: "id",
            });
            syncStore.createIndex("priority", "priority");
            syncStore.createIndex("timestamp", "timestamp");
            syncStore.createIndex("type", "type");
          }

          // User data store
          if (!db.objectStoreNames.contains("userData")) {
            db.createObjectStore("userData", { keyPath: "key" });
          }

          // Messages store
          if (!db.objectStoreNames.contains("messages")) {
            const messagesStore = db.createObjectStore("messages", {
              keyPath: "id",
            });
            messagesStore.createIndex("timestamp", "timestamp");
            messagesStore.createIndex("type", "type");
          }

          // Search cache store
          if (!db.objectStoreNames.contains("searchCache")) {
            const searchStore = db.createObjectStore("searchCache", {
              keyPath: "query",
            });
            searchStore.createIndex("timestamp", "timestamp");
          }
        },
      });
    } catch (error) {
      console.error("Failed to initialize offline database:", error);
    }
  }

  // Setup cache strategies for different resources
  private setupCacheStrategies(): void {
    const strategies: CacheStrategy[] = [
      {
        resource: "products",
        strategy: "cache-first",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        priority: 1,
      },
      {
        resource: "categories",
        strategy: "cache-first",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        priority: 1,
      },
      {
        resource: "user-profile",
        strategy: "cache-first",
        maxAge: 60 * 60 * 1000, // 1 hour
        priority: 2,
      },
      {
        resource: "orders",
        strategy: "network-first",
        maxAge: 5 * 60 * 1000, // 5 minutes
        priority: 3,
      },
      {
        resource: "cart",
        strategy: "cache-first",
        maxAge: 60 * 1000, // 1 minute
        priority: 3,
      },
      {
        resource: "search",
        strategy: "stale-while-revalidate",
        maxAge: 10 * 60 * 1000, // 10 minutes
        priority: 2,
      },
      {
        resource: "messages",
        strategy: "network-first",
        maxAge: 30 * 1000, // 30 seconds
        priority: 3,
      },
    ];

    strategies.forEach((strategy) => {
      this.cacheStrategies.set(strategy.resource, strategy);
    });
  }

  // Network quality monitoring
  private setupNetworkMonitoring(): void {
    // Monitor online/offline status
    window.addEventListener("online", () => {
      this.updateNetworkQuality();
      this.startSync();
    });

    window.addEventListener("offline", () => {
      this.updateNetworkQuality();
    });

    // Monitor connection quality
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener("change", () => {
        this.updateNetworkQuality();
      });
    }

    // Initial network quality check
    this.updateNetworkQuality();
  }

  // Update network quality metrics
  private updateNetworkQuality(): void {
    const connection = (navigator as any).connection;
    const isOnline = navigator.onLine;

    if (!isOnline) {
      this.syncStatus.connectionQuality = "offline";
      return;
    }

    if (connection) {
      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink;
      const rtt = connection.rtt;

      // Determine connection quality based on effective type and metrics
      if (effectiveType === "4g" && downlink > 1.5 && rtt < 300) {
        this.syncStatus.connectionQuality = "excellent";
      } else if (
        effectiveType === "4g" ||
        (effectiveType === "3g" && downlink > 0.5)
      ) {
        this.syncStatus.connectionQuality = "good";
      } else if (effectiveType === "3g" || effectiveType === "2g") {
        this.syncStatus.connectionQuality = "poor";
      } else {
        this.syncStatus.connectionQuality = "poor";
      }
    } else {
      // Fallback for browsers without connection API
      this.syncStatus.connectionQuality = "good";
    }
  }

  // Get current network quality
  getNetworkQuality(): NetworkQuality {
    const connection = (navigator as any).connection;

    return {
      effectiveType: connection?.effectiveType || "unknown",
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      saveData: connection?.saveData || false,
      isOnline: navigator.onLine,
    };
  }

  // Cache management with intelligent strategies
  async cacheData(resource: string, data: any, key?: string): Promise<void> {
    if (!this.db) return;

    try {
      const strategy = this.cacheStrategies.get(resource);
      const timestamp = Date.now();

      const cacheEntry = {
        id: key || this.generateId(),
        ...data,
        lastUpdated: timestamp,
        cacheStrategy: strategy?.strategy,
        expiresAt: strategy
          ? timestamp + strategy.maxAge
          : timestamp + 24 * 60 * 60 * 1000,
      };

      await this.db.put(resource, cacheEntry);
    } catch (error) {
      console.error(`Failed to cache ${resource}:`, error);
    }
  }

  // Retrieve cached data with strategy consideration
  async getCachedData(resource: string, key?: string): Promise<any> {
    if (!this.db) return null;

    try {
      const strategy = this.cacheStrategies.get(resource);

      if (key) {
        const data = await this.db.get(resource, key);
        if (data && this.isDataValid(data, strategy)) {
          return data;
        }
      } else {
        const allData = await this.db.getAll(resource);
        return allData.filter((item) => this.isDataValid(item, strategy));
      }
    } catch (error) {
      console.error(`Failed to retrieve cached ${resource}:`, error);
    }

    return null;
  }

  // Check if cached data is still valid
  private isDataValid(data: any, strategy?: CacheStrategy): boolean {
    if (!strategy) return true;

    const now = Date.now();
    const expiresAt = data.expiresAt || data.lastUpdated + strategy.maxAge;

    return now < expiresAt;
  }

  // Add action to sync queue
  async addToSyncQueue(
    action: Omit<OfflineAction, "id" | "timestamp" | "retryCount">,
  ): Promise<void> {
    if (!this.db) return;

    try {
      const offlineAction: OfflineAction = {
        id: this.generateId(),
        timestamp: Date.now(),
        retryCount: 0,
        ...action,
      };

      await this.db.add("syncQueue", offlineAction);
      this.syncQueue.push(offlineAction);
      this.syncStatus.pendingActions++;

      // Try immediate sync if online
      if (navigator.onLine) {
        this.processSyncQueue();
      }
    } catch (error) {
      console.error("Failed to add action to sync queue:", error);
    }
  }

  // Process sync queue
  private async processSyncQueue(): Promise<void> {
    if (this.syncStatus.syncInProgress || !navigator.onLine) return;

    this.syncStatus.syncInProgress = true;

    try {
      const actions = (await this.db?.getAll("syncQueue")) || [];
      const sortedActions = actions.sort((a, b) => {
        // Sort by priority and timestamp
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        const priorityDiff =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        return priorityDiff !== 0 ? priorityDiff : a.timestamp - b.timestamp;
      });

      for (const action of sortedActions) {
        try {
          await this.processAction(action);
          await this.db?.delete("syncQueue", action.id);
          this.syncStatus.pendingActions--;
        } catch (error) {
          console.error(`Failed to process action ${action.id}:`, error);
          action.retryCount++;

          if (action.retryCount >= action.maxRetries) {
            await this.db?.delete("syncQueue", action.id);
            this.syncStatus.failedActions++;
          } else {
            await this.db?.put("syncQueue", action);
          }
        }
      }

      this.syncStatus.lastSync = new Date();
    } catch (error) {
      console.error("Sync queue processing failed:", error);
    } finally {
      this.syncStatus.syncInProgress = false;
    }
  }

  // Process individual sync action
  private async processAction(action: OfflineAction): Promise<void> {
    const networkQuality = this.getNetworkQuality();

    // Adjust request based on network quality
    const requestOptions: RequestInit = {
      method: this.getMethodForAction(action.type),
      headers: {
        "Content-Type": "application/json",
        "X-Network-Quality": networkQuality.effectiveType,
        "X-Offline-Action": "true",
      },
    };

    if (action.data && (action.type === "CREATE" || action.type === "UPDATE")) {
      requestOptions.body = JSON.stringify(action.data);
    }

    // Adjust timeout based on network quality
    const timeout = this.getTimeoutForNetworkQuality(networkQuality);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      requestOptions.signal = controller.signal;
      const response = await fetch(
        this.getApiEndpoint(action.resource, action.data?.id),
        requestOptions,
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Update cache with fresh data if applicable
      if (action.type === "CREATE" || action.type === "UPDATE") {
        const responseData = await response.json();
        await this.cacheData(action.resource, responseData, responseData.id);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Helper methods
  private getMethodForAction(type: OfflineAction["type"]): string {
    switch (type) {
      case "CREATE":
        return "POST";
      case "UPDATE":
        return "PUT";
      case "DELETE":
        return "DELETE";
      case "SYNC":
        return "GET";
      default:
        return "GET";
    }
  }

  private getTimeoutForNetworkQuality(quality: NetworkQuality): number {
    switch (quality.effectiveType) {
      case "4g":
        return 10000; // 10 seconds
      case "3g":
        return 20000; // 20 seconds
      case "2g":
        return 30000; // 30 seconds
      default:
        return 15000; // 15 seconds
    }
  }

  private getApiEndpoint(resource: string, id?: string): string {
    const baseUrl = process.env.VITE_API_URL || "http://localhost:3001/api/v1";
    return id ? `${baseUrl}/${resource}/${id}` : `${baseUrl}/${resource}`;
  }

  private generateId(): string {
    return `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Start sync worker
  private startSyncWorker(): void {
    // Process sync queue every 30 seconds when online
    setInterval(() => {
      if (navigator.onLine && !this.syncStatus.syncInProgress) {
        this.processSyncQueue();
      }
    }, 30000);

    // Progressive sync based on network quality
    setInterval(() => {
      if (navigator.onLine) {
        this.progressiveSync();
      }
    }, 5000);
  }

  // Progressive sync based on connection quality
  private async progressiveSync(): Promise<void> {
    const quality = this.getNetworkQuality();

    // Sync high-priority items on poor connections
    if (quality.effectiveType === "2g" || quality.effectiveType === "3g") {
      await this.syncHighPriorityOnly();
    } else {
      await this.processSyncQueue();
    }
  }

  // Sync only high-priority items for poor connections
  private async syncHighPriorityOnly(): Promise<void> {
    if (!this.db || this.syncStatus.syncInProgress) return;

    try {
      const highPriorityActions = await this.db.getAllFromIndex(
        "syncQueue",
        "priority",
        "critical",
      );

      for (const action of highPriorityActions.slice(0, 3)) {
        // Max 3 at a time
        try {
          await this.processAction(action);
          await this.db.delete("syncQueue", action.id);
          this.syncStatus.pendingActions--;
        } catch (error) {
          console.error(`Failed to sync high-priority action:`, error);
        }
      }
    } catch (error) {
      console.error("High-priority sync failed:", error);
    }
  }

  // Public methods for application use

  // Start sync manually
  async startSync(): Promise<void> {
    if (navigator.onLine) {
      await this.processSyncQueue();
    }
  }

  // Get sync status
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  // Get offline capabilities
  getOfflineCapabilities(): OfflineCapabilities {
    return {
      browse: true, // Can browse cached products
      search: true, // Can search cached data
      cart: true, // Can manage cart offline
      orders: false, // Cannot place orders offline (payment required)
      payments: false, // Cannot process payments offline
      messaging: true, // Can compose messages offline
      inventory: true, // Can view cached inventory
    };
  }

  // Clear old cache data
  async cleanupCache(): Promise<void> {
    if (!this.db) return;

    try {
      const stores = ["products", "searchCache", "messages"];

      for (const storeName of stores) {
        const items = await this.db.getAll(storeName);
        for (const item of items) {
          const strategy = this.cacheStrategies.get(storeName);
          if (!this.isDataValid(item, strategy)) {
            await this.db.delete(storeName, item.id);
          }
        }
      }
    } catch (error) {
      console.error("Cache cleanup failed:", error);
    }
  }

  // Save for offline use
  async saveForOffline(resource: string, data: any): Promise<void> {
    await this.cacheData(resource, { ...data, offlineOnly: true });
  }

  // Check if data is available offline
  async isAvailableOffline(resource: string, id?: string): Promise<boolean> {
    const cachedData = await this.getCachedData(resource, id);
    return cachedData !== null;
  }

  // Get storage usage
  async getStorageUsage(): Promise<{
    used: number;
    quota: number;
    percentage: number;
  }> {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const used = estimate.usage || 0;
      const quota = estimate.quota || 0;
      return {
        used,
        quota,
        percentage: quota > 0 ? (used / quota) * 100 : 0,
      };
    }

    return { used: 0, quota: 0, percentage: 0 };
  }
}

// Export singleton instance
export const offlineManager = new OfflineFirstManager();

// Service Worker registration for PWA
export const registerServiceWorker = async (): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

export default offlineManager;
