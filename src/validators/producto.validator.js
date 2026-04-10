import { body, param } from 'express-validator';

/** Validar ID */
export const idValidator = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),
];

/** Crear producto */
export const createProductoValidator = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ max: 150 })
        .withMessage('Nombre demasiado largo'),

    body('descripcion')
        .trim()
        .notEmpty()
        .withMessage('La descripción es obligatoria'),

    body('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número positivo'),

    body('stock')
        .notEmpty()
        .withMessage('El stock es obligatorio')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número positivo'),

    // 🔥 AQUÍ EL CAMBIO CLAVE
    body('categoria')
        .notEmpty()
        .withMessage('La categoría es obligatoria')
        .isIn(['tecnologia', 'hogar', 'ropa', 'otros'])
        .withMessage('Categoría no válida'),
];

/** Actualizar producto */
export const updateProductoValidator = [
    ...idValidator,

    body('nombre')
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage('Nombre demasiado largo'),

    body('descripcion')
        .optional()
        .trim(),

    body('precio')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número positivo'),

    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número positivo'),

    body('categoria')
        .optional()
        .isIn(['tecnologia', 'hogar', 'ropa', 'otros'])
        .withMessage('Categoría no válida'),
];