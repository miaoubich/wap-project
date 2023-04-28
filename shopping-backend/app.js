const express = require("express");
const productRouter = require("./routes/productRouter");
const loginRouter = require("./routes/loginRouter");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/products", productRouter);

app.listen(3000, () => console.log("listen on 3000"));
