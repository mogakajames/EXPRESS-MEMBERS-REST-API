const express = require("express");
const path = require("path");
const logger = require("./middlewares/logger");
const app = express();

//Initialize middleware

//app.use(logger);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set public as our static page
app.use(express.static(path.join(__dirname, "public")));

//members data API routes
app.use("/api/data", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
