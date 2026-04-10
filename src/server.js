import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';


const { MONGODB_URI, PORT } = process.env;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error conectando a MongoDB:', err.message);
        process.exit(1);
    });