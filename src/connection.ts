import {Client} from 'pg';


const client = new Client({
    host:"localhost",
    user:'postgres',
    port:5432,
    password:'rootuser',
    database:'Property-Pro-Lite'

})



export default client