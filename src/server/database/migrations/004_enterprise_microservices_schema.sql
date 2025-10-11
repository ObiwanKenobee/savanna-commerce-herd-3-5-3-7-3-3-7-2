-- ===================================================================
-- ENTERPRISE MICROSERVICES DATABASE SCHEMA
-- Comprehensive schema supporting all enterprise dashboard modules
-- ===================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ===================================================================
-- CORE ENTERPRISE TABLES
-- ===================================================================

-- Enterprise Organizations
CREATE TABLE enterprise_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('silver', 'gold', 'platinum')),
    industry VARCHAR(100),
    employee_count INTEGER,
    annual_revenue BIGINT,
    headquarters JSONB,
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enterprise Users
CREATE TABLE enterprise_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    permissions TEXT[],
    dashboard_preferences JSONB DEFAULT '{}',
    last_active_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- REVENUE OPERATIONS TABLES
-- ===================================================================

-- Revenue Metrics
CREATE TABLE revenue_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    recurring_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    consumption_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    one_time_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    growth_rate DECIMAL(5,2),
    churn_rate DECIMAL(5,2),
    expansion_rate DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Segments
CREATE TABLE customer_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    segment_name VARCHAR(100) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    customer_count INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    arpu DECIMAL(10,2) DEFAULT 0,
    ltv DECIMAL(15,2) DEFAULT 0,
    churn_rate DECIMAL(5,2) DEFAULT 0,
    expansion_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue Opportunities
CREATE TABLE revenue_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    opportunity_type VARCHAR(50) NOT NULL CHECK (opportunity_type IN ('upsell', 'cross-sell', 'renewal', 'expansion')),
    value DECIMAL(15,2) NOT NULL,
    probability INTEGER CHECK (probability >= 0 AND probability <= 100),
    stage VARCHAR(50) NOT NULL,
    owner_id UUID REFERENCES enterprise_users(id),
    expected_close_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing Strategies
CREATE TABLE pricing_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL,
    current_price DECIMAL(10,2) NOT NULL,
    recommended_price DECIMAL(10,2) NOT NULL,
    price_elasticity DECIMAL(5,2),
    revenue_impact DECIMAL(15,2),
    customer_impact DECIMAL(5,2),
    effective_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- SUPPLY CHAIN MANAGEMENT TABLES
-- ===================================================================

-- Suppliers
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location JSONB,
    category VARCHAR(100),
    contact_info JSONB,
    performance_score DECIMAL(5,2) DEFAULT 0,
    risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high')),
    contract_value DECIMAL(15,2) DEFAULT 0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 0,
    quality_rating DECIMAL(3,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipments
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES suppliers(id),
    tracking_number VARCHAR(100) UNIQUE,
    origin JSONB,
    destination JSONB,
    product_details JSONB,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in-transit', 'customs', 'delivered', 'delayed', 'cancelled')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    estimated_delivery TIMESTAMP WITH TIME ZONE,
    actual_delivery TIMESTAMP WITH TIME ZONE,
    value DECIMAL(15,2),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Items
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    supplier_id UUID REFERENCES suppliers(id),
    current_stock INTEGER DEFAULT 0,
    min_threshold INTEGER DEFAULT 0,
    max_capacity INTEGER DEFAULT 0,
    unit_cost DECIMAL(10,2),
    turnover_rate DECIMAL(5,2),
    last_restocked_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'optimal' CHECK (status IN ('optimal', 'low', 'critical', 'excess')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- FINANCIAL ANALYTICS TABLES
-- ===================================================================

-- Financial Metrics
CREATE TABLE financial_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL,
    cash_flow DECIMAL(15,2),
    profit_margin DECIMAL(5,2),
    operating_expenses DECIMAL(15,2),
    gross_revenue DECIMAL(15,2),
    net_revenue DECIMAL(15,2),
    ebitda DECIMAL(15,2),
    burn_rate DECIMAL(15,2),
    runway_months INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budget Allocations
CREATE TABLE budget_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    allocated_amount DECIMAL(15,2) NOT NULL,
    spent_amount DECIMAL(15,2) DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    owner_id UUID REFERENCES enterprise_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- COMPLIANCE AND GOVERNANCE TABLES
-- ===================================================================

-- Compliance Requirements
CREATE TABLE compliance_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    framework VARCHAR(100) NOT NULL, -- SOX, GDPR, HIPAA, etc.
    requirement_title VARCHAR(255) NOT NULL,
    description TEXT,
    compliance_status VARCHAR(50) DEFAULT 'pending' CHECK (compliance_status IN ('pending', 'compliant', 'non-compliant', 'review')),
    due_date DATE,
    assigned_to UUID REFERENCES enterprise_users(id),
    evidence JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Trails
CREATE TABLE audit_trails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES enterprise_users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id VARCHAR(100),
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- SECURITY OPERATIONS TABLES
-- ===================================================================

-- Security Incidents
CREATE TABLE security_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    incident_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
    assigned_to UUID REFERENCES enterprise_users(id),
    affected_systems TEXT[],
    remediation_steps JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security Alerts
CREATE TABLE security_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    source VARCHAR(100),
    metadata JSONB,
    acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_by UUID REFERENCES enterprise_users(id),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- AI AND ANALYTICS TABLES
-- ===================================================================

-- AI Models
CREATE TABLE ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    model_name VARCHAR(255) NOT NULL,
    model_type VARCHAR(100) NOT NULL, -- 'prediction', 'classification', 'recommendation'
    version VARCHAR(50) DEFAULT '1.0',
    accuracy DECIMAL(5,2),
    training_data_size INTEGER,
    last_trained_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'training', 'deprecated')),
    configuration JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Predictions
CREATE TABLE ai_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    model_id UUID REFERENCES ai_models(id),
    prediction_type VARCHAR(100) NOT NULL,
    input_data JSONB,
    prediction_result JSONB,
    confidence_score DECIMAL(5,2),
    actual_outcome JSONB,
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business Intelligence Reports
CREATE TABLE bi_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    data_sources TEXT[],
    parameters JSONB,
    generated_by UUID REFERENCES enterprise_users(id),
    file_path VARCHAR(500),
    status VARCHAR(50) DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- INTEGRATION AND API MANAGEMENT TABLES
-- ===================================================================

-- External Integrations
CREATE TABLE external_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    integration_name VARCHAR(255) NOT NULL,
    integration_type VARCHAR(100) NOT NULL, -- 'ERP', 'CRM', 'API', 'Webhook'
    endpoint_url VARCHAR(500),
    authentication_method VARCHAR(50),
    credentials JSONB, -- Encrypted
    configuration JSONB,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Usage Metrics
CREATE TABLE api_usage_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    requests_count INTEGER DEFAULT 0,
    avg_response_time INTEGER, -- in milliseconds
    error_count INTEGER DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- NOTIFICATION AND COMMUNICATION TABLES
-- ===================================================================

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES enterprise_users(id),
    notification_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    channels TEXT[], -- 'email', 'sms', 'push', 'in-app'
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication Templates
CREATE TABLE communication_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    template_name VARCHAR(255) NOT NULL,
    template_type VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    content TEXT,
    variables JSONB,
    created_by UUID REFERENCES enterprise_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- MONITORING AND HEALTH TABLES
-- ===================================================================

-- System Health Metrics
CREATE TABLE system_health_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2),
    unit VARCHAR(50),
    status VARCHAR(50) DEFAULT 'healthy' CHECK (status IN ('healthy', 'degraded', 'unhealthy')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Metrics
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES enterprise_organizations(id) ON DELETE CASCADE,
    metric_type VARCHAR(100) NOT NULL, -- 'response_time', 'throughput', 'error_rate'
    value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50),
    service VARCHAR(100),
    endpoint VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================================================
-- INDEXES FOR PERFORMANCE
-- ===================================================================

-- Core indexes
CREATE INDEX idx_enterprise_organizations_tier ON enterprise_organizations(tier);
CREATE INDEX idx_enterprise_users_org_id ON enterprise_users(organization_id);
CREATE INDEX idx_enterprise_users_email ON enterprise_users(email);

-- Revenue operations indexes
CREATE INDEX idx_revenue_metrics_org_period ON revenue_metrics(organization_id, period_start, period_end);
CREATE INDEX idx_revenue_opportunities_org_status ON revenue_opportunities(organization_id, stage);

-- Supply chain indexes
CREATE INDEX idx_suppliers_org_status ON suppliers(organization_id, status);
CREATE INDEX idx_shipments_org_status ON shipments(organization_id, status);
CREATE INDEX idx_inventory_items_org_status ON inventory_items(organization_id, status);

-- Financial indexes
CREATE INDEX idx_financial_metrics_org_date ON financial_metrics(organization_id, metric_date);
CREATE INDEX idx_budget_allocations_org_period ON budget_allocations(organization_id, period_start, period_end);

-- Security indexes
CREATE INDEX idx_security_incidents_org_status ON security_incidents(organization_id, status);
CREATE INDEX idx_security_alerts_org_severity ON security_alerts(organization_id, severity);

-- AI and analytics indexes
CREATE INDEX idx_ai_predictions_org_type ON ai_predictions(organization_id, prediction_type);
CREATE INDEX idx_bi_reports_org_type ON bi_reports(organization_id, report_type);

-- Monitoring indexes
CREATE INDEX idx_system_health_org_service ON system_health_metrics(organization_id, service_name);
CREATE INDEX idx_performance_metrics_org_type ON performance_metrics(organization_id, metric_type, timestamp);

-- API usage indexes
CREATE INDEX idx_api_usage_org_date ON api_usage_metrics(organization_id, date);

-- Notification indexes
CREATE INDEX idx_notifications_recipient_read ON notifications(recipient_id, read);

-- Audit trail indexes
CREATE INDEX idx_audit_trails_org_user ON audit_trails(organization_id, user_id, created_at);

-- ===================================================================
-- FUNCTIONS AND TRIGGERS
-- ===================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_enterprise_organizations_updated_at
    BEFORE UPDATE ON enterprise_organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enterprise_users_updated_at
    BEFORE UPDATE ON enterprise_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_segments_updated_at
    BEFORE UPDATE ON customer_segments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_revenue_opportunities_updated_at
    BEFORE UPDATE ON revenue_opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at
    BEFORE UPDATE ON shipments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at
    BEFORE UPDATE ON inventory_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- VIEWS FOR COMMON QUERIES
-- ===================================================================

-- Enterprise Overview View
CREATE VIEW enterprise_overview AS
SELECT 
    eo.id,
    eo.name,
    eo.tier,
    eo.industry,
    COUNT(DISTINCT eu.id) as user_count,
    COUNT(DISTINCT s.id) as supplier_count,
    COUNT(DISTINCT sh.id) as active_shipments,
    SUM(rm.total_revenue) as total_revenue
FROM enterprise_organizations eo
LEFT JOIN enterprise_users eu ON eo.id = eu.organization_id
LEFT JOIN suppliers s ON eo.id = s.organization_id AND s.status = 'active'
LEFT JOIN shipments sh ON eo.id = sh.organization_id AND sh.status IN ('pending', 'in-transit')
LEFT JOIN revenue_metrics rm ON eo.id = rm.organization_id 
    AND rm.period_start >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY eo.id, eo.name, eo.tier, eo.industry;

-- Supply Chain Health View
CREATE VIEW supply_chain_health AS
SELECT 
    s.organization_id,
    COUNT(*) as total_suppliers,
    AVG(s.performance_score) as avg_performance,
    AVG(s.on_time_delivery_rate) as avg_on_time_delivery,
    COUNT(*) FILTER (WHERE s.risk_level = 'high') as high_risk_suppliers
FROM suppliers s
WHERE s.status = 'active'
GROUP BY s.organization_id;

-- ===================================================================
-- SAMPLE DATA (Optional - for development/testing)
-- ===================================================================

-- Insert sample enterprise organization
INSERT INTO enterprise_organizations (name, domain, tier, industry, employee_count, annual_revenue)
VALUES 
    ('Global Fortune Corp', 'fortune-global.com', 'platinum', 'Manufacturing', 50000, 5000000000),
    ('TechCorp Industries', 'techcorp.com', 'gold', 'Technology', 5000, 500000000),
    ('Regional Retail Group', 'regional-retail.com', 'silver', 'Retail', 1000, 100000000);

COMMIT;
