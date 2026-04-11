import { USER_TABLE_NAME } from './user.model.js';

export const SUBSCRIPTION_TABLE_NAME = 'subscriptions';

export const SUBSCRIPTION_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ${SUBSCRIPTION_TABLE_NAME} (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES ${USER_TABLE_NAME}(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    currency CHAR(3) NOT NULL DEFAULT 'IDR',
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    renewal_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

export function mapSubscriptionRow(row) {
  if (!row) {
    return null;
  }
  
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    price: Number(row.price),
    currency: row.currency,
    status: row.status,
    startDate: row.start_date,
    renewalDate: row.renewal_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
