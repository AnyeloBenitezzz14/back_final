import { validationResult } from 'express-validator';
import Producto from '../models/Producto.js';

const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true;
    }
    return false;
};

export const createProducto = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const payload = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,

            // 🔥 AQUÍ ESTABA EL ERROR
            categoria: req.body.categoria
        };

        console.log("CREANDO PRODUCTO:", payload); // 🧪 debug

        const created = await Producto.create(payload);
        res.status(201).json(created);

    } catch (err) {
        next(err);
    }
};

export const getProductos = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        const filter = q
            ? {
                $or: [
                    { nombre: new RegExp(q, 'i') },
                    { descripcion: new RegExp(q, 'i') }
                ]
            }
            : {};

        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            Producto.find(filter)
                .skip(skip)
                .limit(Number(limit)),
            Producto.countDocuments(filter)
        ]);

        res.json({
            items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });

    } catch (err) {
        next(err);
    }
};

export const getProductoById = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const item = await Producto.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(item);

    } catch (err) {
        next(err);
    }
};

export const updateProducto = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const updated = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(updated);

    } catch (err) {
        next(err);
    }
};

export const deleteProducto = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const deleted = await Producto.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Eliminado correctamente' });

    } catch (err) {
        next(err);
    }
};