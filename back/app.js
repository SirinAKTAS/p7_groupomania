const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const { checkUser, requireAuth } = require("./middleware/auth.middleware");

// Fonction .connect pour lier notre BDD à notre serveur
mongoose
  .connect(process.env.MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
