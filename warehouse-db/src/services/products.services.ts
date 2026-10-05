/*
    LAYER SERVICE:
    1. Berisi business logic
    2. Berisi seluruh query SQL
    3. Tidak mengakses req maupun res
*/

import pool from '../database/db';


// CREATE PRODUCT
export const createProductsService = async ({
  product_code,
  product_name,
  category,
  supplier_name,
  unit_price,
  stock_quantity,
  minimum_stock,
  warehouse_zone,
  status,
  last_restock_date,
}: {
  product_code: string;
  product_name: string;
  category: string;
  supplier_name: string;
  unit_price: number;
  stock_quantity: number;
  minimum_stock: number;
  warehouse_zone: string;
  status: string;
  last_restock_date: string | null;
}) => {
  const query = `
    INSERT INTO products (
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    product_code,
    product_name,
    category,
    supplier_name,
    unit_price,
    stock_quantity,
    minimum_stock,
    warehouse_zone,
    status,
    last_restock_date,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


// GET ALL PRODUCTS
export const getProductsService = async ({
  page,
  limit,
  category,
}: {
  page: number;
  limit: number;
  category?: string;
}) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM products
    WHERE status != 'Archived'
  `;

  const values: (string | number)[] = [];

  if (category) {
    values.push(category);

    query += ` AND category = $${values.length}`;
  }

  values.push(limit);
  query += ` LIMIT $${values.length}`;

  values.push(offset);
  query += ` OFFSET $${values.length}`;

  const result = await pool.query(query, values);

  return result.rows;
};


// GET PRODUCT BY ID
export const getProductByIdService = async ({
  product_id,
}: {
  product_id: number;
}) => {
  const query = `
    SELECT *
    FROM products
    WHERE product_id = $1
      AND status != 'Archived';
  `;

  const result = await pool.query(query, [product_id]);

  return result.rows[0];
};


// UPDATE PRODUCT
export const updateProductsService = async ({
  product_id,
  product_name,
  category,
  supplier_name,
  unit_price,
  stock_quantity,
  minimum_stock,
  warehouse_zone,
  status,
  last_restock_date,
}: {
  product_id: number;
  product_name: string;
  category: string;
  supplier_name: string;
  unit_price: number;
  stock_quantity: number;
  minimum_stock: number;
  warehouse_zone: string;
  status: string;
  last_restock_date: string | null;
}) => {
  const query = `
    UPDATE products
    SET
      product_name = $1,
      category = $2,
      supplier_name = $3,
      unit_price = $4,
      stock_quantity = $5,
      minimum_stock = $6,
      warehouse_zone = $7,
      status = $8,
      last_restock_date = $9
    WHERE product_id = $10
      AND status != 'Archived'
    RETURNING *;
  `;

  const values = [
    product_name,
    category,
    supplier_name,
    unit_price,
    stock_quantity,
    minimum_stock,
    warehouse_zone,
    status,
    last_restock_date,
    product_id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


// SOFT DELETE PRODUCT
export const deleteProductsService = async ({
  product_id,
}: {
  product_id: number;
}) => {
  const query = `
    UPDATE products
    SET status = 'Archived'
    WHERE product_id = $1
      AND status != 'Archived'
    RETURNING *;
  `;

  const result = await pool.query(query, [product_id]);

  return result.rows[0];
};