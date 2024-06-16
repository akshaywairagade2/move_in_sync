const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/User');
const floorRoutes =  require('./routes/floorplans')
const userRoutes =  require('./routes/user')
const Jwt = require('jsonwebtoken');
const jwtKey = 'floor';
const app = express();
const PORT  = 5000;

mongoose.connect(
  `mongodb+srv://akshaywairagade2:1xrbbjUUhTRi0WJz@cluster0.viw2wfj.mongodb.net/my_database?retryWrites=true&w=majority`,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
).then(() => {
  console.log(`Database Connected`);
});


app.use(express.json());
app.use(cors());

app.use('/api/floorplans',floorRoutes);
app.use('/api/users',userRoutes)

  

app.listen(PORT,()=>{
  console.log(`Backend running on port no. ${PORT}`)
});