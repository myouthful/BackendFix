const express= require('express');
const mongoose = require('mogoose');
const adminUerRoutes= require('./routes/user.route');
const authenticate= require('./middleware/autheticat');

const app = express();

app.use(express.json());


app.use(authenticate);

app.use('/admin',adminUerRoutes);

mongoose.connect('mongodb://localhost::27017/paas',{
    userNewUrlParser:true,
    useUnifiedTopology:true
})

app.listen(3000,()=>
console.log('Server running on port 3000');
)