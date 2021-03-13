const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true, useFindAndModify: true,useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (!err) console.log("Database connection successful");
  else
    console.log(
      `Error connecting to database : ${JSON.stringify(err, undefined, 2)}`
    );
});

module.exports = mongoose;