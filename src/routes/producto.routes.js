import { Router } from 'express';

import {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto
} from '../controllers/producto.controller.js';

import {
    createProductoValidator,
    updateProductoValidator,
    idValidator
} from '../validators/producto.validator.js';

import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/', getProductos);

router.post('/', createProductoValidator, createProducto);

router.get('/:id', idValidator, getProductoById);

router.put('/:id', idValidator, updateProductoValidator, updateProducto);

router.delete('/:id', idValidator, deleteProducto);

export default router;