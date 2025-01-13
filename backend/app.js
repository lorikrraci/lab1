const app = express();


// Route Handling
app.use('/api/v1/products', products);

 
module.exports = app;