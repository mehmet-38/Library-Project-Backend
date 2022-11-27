const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("DB connect success");
  })
  .catch((error) => console.log("DB connection error" + error));
