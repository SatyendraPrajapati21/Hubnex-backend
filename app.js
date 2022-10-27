require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');




const app = express();



app.use(express.urlencoded({extended:false}));
app.use(express.json());


const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT,POST,DELETE "
}

app.use(cors(corsOptions));




//app.use('/admin',adminRoutes);
app.use('/auth',authRoutes);
app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode ||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message,data:data});
});


dburl = process.env.MONGODB_URL;
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongodb connection error found: "));
db.once("open", () => {
  console.log(`mongoose is running on the port `);
  app.listen(5000,()=>{
    console.log(`server is running on the port 5000`);
})
});











