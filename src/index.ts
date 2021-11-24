require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieparser from "cookie-parser"
import client from './connection'
import indexRoutes from "./routes/index"
import { CreateUsersTable,CreatePropertiesTable } from "./sqlQueries";


const app = express()


app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieparser())
app.use(indexRoutes)




client.connect()
    .then(async()=> {
        await client.query(CreateUsersTable); 
        await client.query(CreatePropertiesTable) 
    })
    .catch((err)=>console.log(err))


app.listen(4000,()=>{
    console.log('i am curently listening to port 4000')
})

