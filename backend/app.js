const express=require('express');
const app= express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler=require('./helpers/error-handler');
require('dotenv/config');

app.use(cors());
app.options('*',cors())

//*Middleware
//app.use(bodyParser.json())
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname+'/public/uploads'));
app.use(errorHandler);

//*Routers
const categoryRouter=require('./routers/category');
const orderRouter=require('./routers/order');
const productRouter=require('./routers/product');
const userRouter=require('./routers/user');

const api= process.env.API_URL;

app.use(`${api}/category`,categoryRouter)
app.use(`${api}/order`,orderRouter)
app.use(`${api}/product`,productRouter)
app.use(`${api}/user`,userRouter)

//*Connection
// mongoose.connect('mongodb+srv://eshop:eshop@cluster0.tgelg.mongodb.net/eshop?retryWrites=true&w=majority');
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Base de datos exitosa');
})
.catch((err)=>{
    console.log(err);
})

//*Port
app.listen(3000,()=>{
    console.log('server is running http://localhost:3000');
})