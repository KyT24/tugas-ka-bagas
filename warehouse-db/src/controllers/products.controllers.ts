/*
    LAYER CONTROLLER:
    1. Menghandle request dan response
    2. Melakukan validasi input dasar
    3. Memanggil service
    4. Tidak menulis query SQL
*/

import { Request, Response } from 'express';

import {
  createProductsService,
  getProductsService,
  getProductByIdService,
  updateProductsService,
  deleteProductsService,
} from '../services/products.services';


// CREATE
export const createProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
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
    } = req.body;

    // Basic validation
    if (
      !product_code ||
      !product_name ||
      !category ||
      !supplier_name ||
      unit_price === undefined ||
      stock_quantity === undefined ||
      minimum_stock === undefined ||
      !warehouse_zone
    ) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
        data: {},
      });
    }

    const product = await createProductsService({
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status: status || 'Available',
      last_restock_date: last_restock_date || null,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    console.log(error);

    // PostgreSQL duplicate key error
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Product code already exists',
        data: {},
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
  }
};


// GET ALL
export const getProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category as string | undefined;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be greater than 0',
        data: {},
      });
    }

    const products = await getProductsService({
      page,
      limit,
      category,
    });

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
  }
};


// GET BY ID
export const getProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product_id = Number(id);

    if (!Number.isInteger(product_id) || product_id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
        data: {},
      });
    }

    const product = await getProductByIdService({
      product_id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
  }
};


// UPDATE
export const updateProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date,
    } = req.body;

    const product_id = Number(id);

    if (!Number.isInteger(product_id) || product_id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
        data: {},
      });
    }

    if (
      !product_name ||
      !category ||
      !supplier_name ||
      unit_price === undefined ||
      stock_quantity === undefined ||
      minimum_stock === undefined ||
      !warehouse_zone
    ) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
        data: {},
      });
    }

    const product = await updateProductsService({
      product_id,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status: status || 'Available',
      last_restock_date: last_restock_date || null,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: `Product with id = ${id} updated successfully`,
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
  }
};


// DELETE / SOFT DELETE
export const deleteProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product_id = Number(id);

    if (!Number.isInteger(product_id) || product_id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
        data: {},
      });
    }

    const product = await deleteProductsService({
      product_id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: `Product with id = ${id} archived successfully`,
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
  }
};