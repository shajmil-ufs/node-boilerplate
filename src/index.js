require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { expressjwt: jwt } = require('express-jwt');  // Updated import

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'; 

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 

// Trust proxy headers
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/auth', require('./routes/public/authRoutes'));

app.use(jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
}).unless({ 
  path: [
    '/health',
    '/api/auth/login',
    '/api/auth/test',
    '/api/public/*'
  ] 
}));

app.use('/api/users', require('./routes/private/userRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found' 
  });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
}); 
