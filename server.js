/////////////////////////////////////////////
// Setting Up Our server.js
//// Import Our Dependencies
/////////////////////////////////////////////
//require("dotenv").config(); // Load ENV Variables
//after refactoring, all of our connection information is in models/connection.js
// and that is the information that is in .env
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
//const mongoose = require("mongoose");
const Movie = require("./models/movie");
const path = require("path"); // built in node module we use to resolve paths more on this when we use it
const moviesController = require("./controllers/movie");
const userRouter = require("./controllers/user");

/////////////////////////////////////////////
//Routes (this is what replaces the commented
//out routes)
/////////////////////////////////////////////
//app.use("/movies", moviesController)
//moved this down below middleware (needs to be after const app = express() because express has to be defined before the initialization)

/////////////////////////////////////////////
//Establish Database Connection
//// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
// const DATABASE_URL = process.env.DATABASE_URL;
// const CONFIG = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// Establish Connection
//mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
//mongoose.connection
// .on("open", () => console.log("Connected to Mongoose"))
// .on("close", () => console.log("Disconnected from Mongoose"))
// .on("error", (error) => console.log(error));


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose using object destructuring
// const { Schema, model } = mongoose;

// // make movie schema
// const movieSchema = new Schema({
//     title: { type: String, required: true },
//     releaseDate: String,
//     length: Number,
//     genre: String,
//     poster: { type: String, required: true },
//     director: { type: String, required: true },
//     rating: String,
//     watchAgain: Boolean,
//     cast: [{ type: String }]
// });

// // make movie model
// const Movie = model("Movie", movieSchema);

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx')

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies ie: req.body
app.use(express.static("public")); // serve files from public statically like CSS and HTML

/////////////////////////////////////////////
//Routes (this is what replaces the commented
//out routes)
/////////////////////////////////////////////
app.use("/movies", moviesController) //send all "/movies" routes to 
//later on when working on controllers user.js file we added the following route:
app.use("/user", userRouter); //send all "/user" routes to user router

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

//HOME
// app.get("/", (req, res) => {
//     res.send("your server is running... better catch it.");
// });

// app.get("/movies/seed", (req, res) => {
//     const startMovies = [
//         {
//             title: "Matrix",
//             releaseDate: "1999",
//             length: 136,
//             genre: "Sci-fi",
//             poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//             director: "Lana, Lily Wasoki",
//             rating: "R",
//             watchAgain: true,
//             cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
//         },
//         {
//             title: "50 First Dates",
//             releaseDate: "2004",
//             length: 99,
//             genre: "Comedy",
//             poster: "https://m.media-amazon.com/images/M/MV5BMjAwMzc4MDgxNF5BMl5BanBnXkFtZTYwNjUwMzE3._V1_FMjpg_UX1000_.jpg",
//             director: "Peter Segal",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Adam Sandler", "Drew Barrymore", "Rob Schneider"]
//         },
//         {
//             title: "The Dark Knight",
//             releaseDate: "2008",
//             length: 152,
//             genre: "Action/Superhero",
//             poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
//             director: "Christopher Nolan",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
//         }
//     ]
//     //the SEED
//     Movie.deleteMany({}).then((data) => {
//         // Seed Starter Movies
//         Movie.create(startMovies).then((data) => {
//             // send created movies as response to confirm creation
//             res.json(data);
//         });
//     });
// })

// //====Index route====

// //The .then Method
// // app.get("/movies", (req, res) => {
// //     // find all the movie
// //     Fruit.find({})
// //         // render a template after they are found
// //         .then((movie) => {
// //             res.render("movies/Index", { movies });
// //         })
// //         // send error as json if they aren't
// //         .catch((error) => {
// //             res.json({ error });
// //         });
// // });

// //The Async / Await Method
// // Index route
// app.get("/movies", async (req, res) => {
//     try {
//         const movies = await Movie.find({});
//         res.render("movies/Index", { movies });
//     } catch (err) {
//         res.json({ err });
//     }
// });


// //New route
// app.get("/movies/New", (req, res) => {
//     res.render("movies/New");
// });

// //DELETE / DESTROY route
// app.delete("/movies/:id", (req, res) => {
//     // get the id from params
//     const id = req.params.id;
//     // delete the fruit
//     Movie.findByIdAndRemove(id)
//         .then((movie) => {
//             // redirect to main page after deleting
//             res.redirect("/movies");
//         })
//         // send error as json
//         .catch((error) => {
//             console.log(error);
//             res.json({ error });
//         });
// });

// // Create route (POST)
// app.post("/movies", async (req, res) => {
//     try {
//         req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//         req.body.cast = req.body.cast.split(",")
//         console.log(req.body)
//         const createdMovie = await Movie.create(req.body)
//         res.redirect("/movies")
//     } catch (error) {
//         console.log(error);
//         res.json({ error });
//     }
// })

// //UPDATE
// app.put("/movies/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//         req.body.cast = req.body.cast.split(",")
//         await Movie.findByIdAndUpdate(id, req.body)
//         res.redirect(`/movies/${id}`)
//     } catch (error) {
//         console.log(error);
//         res.json({ error });
//     }
// })

// //Edit
// app.get("/movies/:id/edit", (req, res) => {
//     // get the id from params
//     const id = req.params.id;
//     // get the movie from the database
//     Movie.findById(id)
//         .then((movie) => {
//             // render Edit page and send movie data
//             res.render("movies/Edit.jsx", { movie });
//         })
//         // send error as json
//         .catch((error) => {
//             console.log(error);
//             res.json({ error });
//         });
// });



// //Show route
// app.get("/movies/:id", async (req, res) => {
//     const id = req.params.id

//     try {
//         const movie = await Movie.findById(id)
//         res.render("movies/Show", { movie })
//     } catch (error) {
//         console.log(error);
//         res.json({ error });
//     }
// })


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));




