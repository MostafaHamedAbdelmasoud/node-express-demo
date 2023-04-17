const config = require("config");
const Joi = require("joi");
const startupDebugger = require("debug")("app:startup");
const logger = require("../middleware/middleware");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("../routes/courses");
const home = require("../routes/home");
const mongoose = require("mongoose");
// const { Client } = require('pg')
 
const {createClient} = require("redis");
const redisPort =6379;
const redisHost = "redis";


const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () =>
  console.log("Redis Client connected successfuly")
);



const testRedis = async () => {
  await redisClient.connect();
};

testRedis();

const app = express();

// require('../startup/db.js')()
const userName = "root";
const password = "example";
const databasePort = "27017";
const host = "mongo";

const db = `mongodb://${userName}:${password}@${host}:${databasePort}`;
mongoose
  .connect(db)
  .then(() => console.log("mongo is connected sucessfully..."))
  .catch((err) => console.log("error in connecting to mongo", err));


startupDebugger("hello");
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
// app.use("/", home);
console.log(`app name `);
app.set("view engine", "pug");
app.set("views", "./views");

console.log(`app name this one` + config.get("name"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log(`app ${app.get("env")}`);
  // console.log(`app password ` +config.get('password'))
}

app.get("/",async (req, res) => {
  await redisClient.set("key", "hello it is from node using docker hub!");
  // const value = await redisClient.get("key");
  // await redisClient.disconnect();
  res.send("mostafa1");
});

app.get("/data",async (req, res) => {
  
  const value = await redisClient.get("key");
  // await redisClient.disconnect();
  res.send(value);
});

app.use(logger);
app.use((req, res, next) => {
  console.log("authentication...");
  next();
});

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`connection starts on 0.0.0.0:${port}...`);
});
