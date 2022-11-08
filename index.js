const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;




// midelware.config
app.use(cors());




 
 
app.get('/', (req, res) => {
 
    res.send('hello from mongo crud server');
})
 
app.listen(port,()=>{
 
    console.log(`Listening on port ${port}`);
})
