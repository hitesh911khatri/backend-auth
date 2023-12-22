const express = require("express");
const connectDb = require("./db");
const signinRouter = require("./routes/singin");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors({ orign: "*" }));
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/signin", signinRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
