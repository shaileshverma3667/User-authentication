const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const  cors = require('cors');
const connectDB = require('./database/db');
app.use(cors())
app.use(express.json())
app.use(cookieParser())

connectDB()//DB

//Router
const authRouter=require('./routes/authRouter')

app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRouter)

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});