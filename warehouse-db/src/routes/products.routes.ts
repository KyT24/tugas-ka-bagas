import { Router } from 'express';

import {
  createProductsController,
  getProductsController,
  getProductByIdController,
  updateProductsController,
  deleteProductsController,
} from '../controllers/products.controllers';

const router = Router();

router.post('/products', createProductsController);

router.get('/products', getProductsController);

router.get('/products/:id', getProductByIdController);

router.put('/products/:id', updateProductsController);

router.delete('/products/:id', deleteProductsController);

export default router;