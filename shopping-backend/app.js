const express = require('express');
const productRouter = require('./routes/productRouter');
// const loginRouter = require('./routes/loginRouter')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/products', productRouter);
// app.use('/login', loginRouter);

app.listen(3000, ()=>console.log('listen on 3000'));