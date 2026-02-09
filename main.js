import dotenv from "dotenv";
import connectDB from "./config/db.js";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Edetails } from "./models/Edetails.js";

dotenv.config();

// Connect Database (SIRF YAHAN)
connectDB();

// ES Module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Add Employee
app.post("/add", async (req, res) => {
  try {
    const newEmployee = new Edetails({
      Emp_id: req.body.Emp_id,
      Employee_name: req.body.Employee_name,
      Join_Date: req.body.Join_Date,
      Salary: req.body.Salary,
      language: req.body.language,
      city: req.body.city,
      isManger: req.body.isManger === "on",
    });

    await newEmployee.save();
    res.redirect("/employees");
  } catch (err) {
    res.status(500).send("Error saving employee: " + err.message);
  }
});

// Show all employees
app.get("/employees", async (req, res) => {
  const employees = await Edetails.find();
  res.render("employees", { employees });
});

// Update
app.post("/update/:id", async (req, res) => {
  await Edetails.findByIdAndUpdate(req.params.id, {
    Emp_id: req.body.Emp_id,
    Employee_name: req.body.Employee_name,
    Salary: req.body.Salary,
    language: req.body.language,
    city: req.body.city,
    isManger: req.body.isManger,
  });

  res.redirect("/employees");
});

// Delete
app.get("/delete/:id", async (req, res) => {
  await Edetails.findByIdAndDelete(req.params.id);
  res.redirect("/employees");
});

// Server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});