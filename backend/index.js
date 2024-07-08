const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mainRouter = express.Router();
const taskRoutes = require("./routes/task.route");
const userRoutes = require("./routes/user.route");

const app = express();
app.use(cors());
//mainRouter
app.use("/api/v1", mainRouter);

mainRouter.use(bodyParser.json());
mainRouter.use(bodyParser.urlencoded({ extended: true }));

mainRouter.use("/users", userRoutes);
mainRouter.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
