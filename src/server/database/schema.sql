-- Modular Monolith Database Schema
-- Unified schema for all business domains

-- Core Tables
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Retailers Domain
CREATE TABLE retailers (
    id VARCHAR(50) PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    membership_tier VARCHAR(20) NOT NULL DEFAULT 'bronze',
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    performance_score DECIMAL(5,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_retailers_status ON retailers(status);
CREATE INDEX idx_retailers_category ON retailers(category);
CREATE INDEX idx_retailers_location ON retailers(location);

-- Customers
CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(15,2) DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_retailer ON customers(retailer_id);

-- Suppliers Domain
CREATE TABLE suppliers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    rating DECIMAL(3,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    monthly_volume DECIMAL(15,2) DEFAULT 0,
    on_time_delivery DECIMAL(5,2) DEFAULT 0,
    quality_score DECIMAL(5,2) DEFAULT 0,
    contract_value DECIMAL(15,2) DEFAULT 0,
    join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_order TIMESTAMP WITH TIME ZONE,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_manager VARCHAR(255) NOT NULL,
    capabilities JSONB DEFAULT '[]',
    certifications JSONB DEFAULT '[]',
    risk_level VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_suppliers_status ON suppliers(status);
CREATE INDEX idx_suppliers_category ON suppliers(category);
CREATE INDEX idx_suppliers_risk_level ON suppliers(risk_level);

-- Products
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    unit VARCHAR(20) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    images JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    min_order_quantity INTEGER DEFAULT 1,
    lead_time_days INTEGER DEFAULT 7,
    availability VARCHAR(20) NOT NULL DEFAULT 'in-stock',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_availability ON products(availability);
CREATE INDEX idx_products_sku ON products(sku);

-- Orders Domain
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    customer_id VARCHAR(50) REFERENCES customers(id),
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    delivery_address TEXT,
    delivery_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_retailer ON orders(retailer_id);
CREATE INDEX idx_orders_supplier ON orders(supplier_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES orders(id),
    product_id VARCHAR(50) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Supplier Orders (Internal supplier processing)
CREATE TABLE supplier_orders (
    id VARCHAR(50) PRIMARY KEY,
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'received',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    expected_delivery TIMESTAMP WITH TIME ZONE,
    actual_delivery TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_supplier_orders_supplier ON supplier_orders(supplier_id);
CREATE INDEX idx_supplier_orders_status ON supplier_orders(status);

-- Supplier Order Products
CREATE TABLE supplier_order_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) REFERENCES supplier_orders(id),
    product_id VARCHAR(50) REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL
);

-- Inventory Management
CREATE TABLE inventory (
    id VARCHAR(50) PRIMARY KEY,
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    product_id VARCHAR(50) REFERENCES products(id),
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    current_stock INTEGER NOT NULL DEFAULT 0,
    min_threshold INTEGER NOT NULL DEFAULT 0,
    max_capacity INTEGER NOT NULL DEFAULT 1000,
    last_restocked TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unit_cost DECIMAL(10,2) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inventory_retailer ON inventory(retailer_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_supplier ON inventory(supplier_id);

-- Logistics Domain
CREATE TABLE drivers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_id VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    rating DECIMAL(3,2) DEFAULT 5.0,
    total_deliveries INTEGER DEFAULT 0,
    on_time_performance DECIMAL(5,2) DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_drivers_status ON drivers(status);

CREATE TABLE vehicles (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    driver_id VARCHAR(50) REFERENCES drivers(id),
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    current_location JSONB DEFAULT '{}',
    fuel_level INTEGER DEFAULT 100,
    load_capacity DECIMAL(10,2) NOT NULL,
    current_load DECIMAL(10,2) DEFAULT 0,
    next_maintenance DATE,
    daily_deliveries INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_type ON vehicles(type);
CREATE INDEX idx_vehicles_driver ON vehicles(driver_id);

CREATE TABLE deliveries (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id),
    supplier_order_id VARCHAR(50) REFERENCES supplier_orders(id),
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    customer_id VARCHAR(50) REFERENCES customers(id),
    driver_id VARCHAR(50) REFERENCES drivers(id),
    vehicle_id VARCHAR(50) REFERENCES vehicles(id),
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
    priority VARCHAR(20) NOT NULL DEFAULT 'standard',
    pickup_address TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    scheduled_pickup TIMESTAMP WITH TIME ZONE,
    actual_pickup TIMESTAMP WITH TIME ZONE,
    estimated_delivery TIMESTAMP WITH TIME ZONE,
    actual_delivery TIMESTAMP WITH TIME ZONE,
    package_count INTEGER NOT NULL,
    weight DECIMAL(8,2) NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_deliveries_order ON deliveries(order_id);
CREATE INDEX idx_deliveries_driver ON deliveries(driver_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_tracking ON deliveries(tracking_number);

CREATE TABLE routes (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    driver_id VARCHAR(50) REFERENCES drivers(id),
    vehicle_id VARCHAR(50) REFERENCES vehicles(id),
    deliveries JSONB DEFAULT '[]',
    status VARCHAR(20) NOT NULL DEFAULT 'planned',
    start_location VARCHAR(255) NOT NULL,
    end_location VARCHAR(255) NOT NULL,
    total_distance DECIMAL(8,2) DEFAULT 0,
    estimated_duration INTEGER DEFAULT 0,
    actual_duration INTEGER,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_routes_driver ON routes(driver_id);
CREATE INDEX idx_routes_status ON routes(status);

-- Contracts
CREATE TABLE contracts (
    id VARCHAR(50) PRIMARY KEY,
    supplier_id VARCHAR(50) REFERENCES suppliers(id),
    retailer_id VARCHAR(50) REFERENCES retailers(id),
    type VARCHAR(20) NOT NULL DEFAULT 'standard',
    terms TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    renewal_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contracts_supplier ON contracts(supplier_id);
CREATE INDEX idx_contracts_status ON contracts(status);

-- Analytics and Metrics
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(20) NOT NULL, -- 'retailer', 'supplier', 'driver'
    entity_id VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_metrics_entity ON performance_metrics(entity_type, entity_id);
CREATE INDEX idx_metrics_period ON performance_metrics(period_start, period_end);

-- Event Logs for Audit Trail
CREATE TABLE event_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_name VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    user_id UUID REFERENCES users(id),
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_logs_module ON event_logs(module_name);
CREATE INDEX idx_event_logs_type ON event_logs(event_type);
CREATE INDEX idx_event_logs_entity ON event_logs(entity_type, entity_id);
CREATE INDEX idx_event_logs_date ON event_logs(created_at);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_type VARCHAR(20) NOT NULL, -- 'retailer', 'supplier', 'driver'
    recipient_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_recipient ON notifications(recipient_type, recipient_id);
CREATE INDEX idx_notifications_status ON notifications(status);

-- System Configuration
CREATE TABLE system_config (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default configuration
INSERT INTO system_config (key, value, description) VALUES
('delivery_zones', '[]', 'Configured delivery zones with pricing'),
('business_hours', '{"start": "08:00", "end": "18:00"}', 'Default business hours'),
('default_lead_time', '7', 'Default lead time in days'),
('max_delivery_distance', '50', 'Maximum delivery distance in km');

-- Create Views for Analytics
CREATE VIEW retailer_performance AS
SELECT 
    r.id,
    r.business_name,
    r.total_orders,
    r.total_revenue,
    COUNT(o.id) as current_month_orders,
    SUM(o.total_amount) as current_month_revenue,
    AVG(CASE WHEN d.actual_delivery IS NOT NULL 
        THEN EXTRACT(EPOCH FROM (d.actual_delivery - d.scheduled_pickup))/3600 
        ELSE NULL END) as avg_delivery_time_hours
FROM retailers r
LEFT JOIN orders o ON r.id = o.retailer_id 
    AND o.created_at >= DATE_TRUNC('month', CURRENT_DATE)
LEFT JOIN deliveries d ON o.id = d.order_id
GROUP BY r.id, r.business_name, r.total_orders, r.total_revenue;

CREATE VIEW supplier_performance AS
SELECT 
    s.id,
    s.name,
    s.rating,
    s.on_time_delivery,
    s.quality_score,
    COUNT(so.id) as current_month_orders,
    SUM(so.total_amount) as current_month_revenue
FROM suppliers s
LEFT JOIN supplier_orders so ON s.id = so.supplier_id 
    AND so.created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY s.id, s.name, s.rating, s.on_time_delivery, s.quality_score;

CREATE VIEW logistics_performance AS
SELECT 
    d.id,
    d.name,
    d.rating,
    d.total_deliveries,
    d.on_time_performance,
    COUNT(del.id) as current_month_deliveries,
    AVG(CASE WHEN del.actual_delivery IS NOT NULL AND del.estimated_delivery IS NOT NULL
        THEN CASE WHEN del.actual_delivery <= del.estimated_delivery THEN 1 ELSE 0 END
        ELSE NULL END) * 100 as current_month_on_time_rate
FROM drivers d
LEFT JOIN deliveries del ON d.id = del.driver_id 
    AND del.created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY d.id, d.name, d.rating, d.total_deliveries, d.on_time_performance;

-- Add Triggers for Updated Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_retailers_updated_at BEFORE UPDATE ON retailers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_supplier_orders_updated_at BEFORE UPDATE ON supplier_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
