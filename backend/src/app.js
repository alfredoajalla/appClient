import '@babel/polyfill';
import express from 'express'; 
import clientRoutes from './routes/client'; 
import providerRoutes from './routes/provider'; 
import morgan from 'morgan';
import cors from 'cors';
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use ('/api/clients', clientRoutes);
app.use('/api/providers', providerRoutes);

export default app; 