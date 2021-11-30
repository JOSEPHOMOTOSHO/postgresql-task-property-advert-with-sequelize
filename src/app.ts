require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import indexRoutes from "./routes/index";
import logger from "morgan";
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(logger("dev"));
app.use(indexRoutes);



app.listen(4000, () => {
  console.log("i am curently listening to port 4000");
});

export default app;
