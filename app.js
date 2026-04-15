const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// handlebars
app.engine("handlebars", engine({
    defaultLayout: "main",
    extname: ".handlebars"
}));
app.set("view engine", "handlebars");

// car dataset
let cars = [
    {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        electric: false,
        features: ["AC", "Bluetooth"]
    },
    {
        id: 2,
        brand: "Tesla",
        model: "Model 3",
        year: 2022,
        electric: true,
        features: ["Autopilot", "Navigation"]
    }
];

// GET all cars
app.get("/api/cars", (req, res) => {
    res.json(cars);
});

// GET one car
app.get("/api/cars/:id", (req, res) => {
    const car = cars.find(c => c.id == req.params.id);
    if (!car) return res.status(404).send("Car not found");
    res.json(car);
});

// CREATE car
app.post("/api/cars", (req, res) => {
    const newCar = { id: cars.length + 1, ...req.body };
    cars.push(newCar);
    res.json(newCar);
});

// UPDATE car
app.put("/api/cars/:id", (req, res) => {
    const car = cars.find(c => c.id == req.params.id);
    if (!car) return res.status(404).send("Car not found");
    Object.assign(car, req.body);
    res.json(car);
});

// DELETE car
app.delete("/api/cars/:id", (req, res) => {
    cars = cars.filter(c => c.id != req.params.id);
    res.send("Car deleted");
});

// webpage
app.get("/", (req, res) => {
    res.render("home", { cars });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});