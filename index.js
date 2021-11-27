const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let Tournament = [{
    id: 0,
    fullName: "Ivanyuk Andrii Grugoriyovich",
    age: 18,
    sex: "man",
    country: "Ukraine",
    markOne: 3,
    markTwo: 5,
    markThree: 4
},
{
    id: 1,
    fullName: "Vitto Scaleto Bargo",
    age: 25,
    sex: "man",
    country: "Italy",
    markOne: 5,
    markTwo: 5,
    markThree: 5
},
{
    id: 2,
    fullName: "Ya na Fabruzi",
    age: 18,
    sex: "woman",
    country: "Ukraine",
    markOne: 4,
    markTwo: 5,
    markThree: 4
},
];

app.get("/tournament", (req, res) => {
    res.send(Tournament);
});

app.get("/tournament/query", (req, res) => {
    let queryTournament = Tournament;
    if (req.query.country)
        queriedTournament = queriedTournament.filter((tournament) => 
            tournament.country.includes(req.query.country)
        );
    if (req.query.age)
        queriedTournament = queriedTournament.filter((tournament) => 
            tournament.age.includes(req.query.age)
        );
    res.send(queriedTournament);
});

app.get("/tournament/:id", (req, res) => {
    let tournament = Tournament.find((tournament) => tournament.id === parseInt(req.params.id));
    if (tournament !== null) res.status(200).send(book);
    else res.status(404).send("Not Found");
});

app.delete("/tournament/:id", (req, res) => {
    let index = Tournament.findIndex((tournament) => tournament.id === parseInt(req.params.id));
    if (index >= 0) {
        let deletedTournament = Tournament[index];
        Tournament.splice(index, 1);
        res.send(deletedTournament);
    } else res.status(404).send("Not Found");
});

app.post("/tournament", (req, res) => {
    let newTournament = {
        id: Number(Date.now()),
        ...req.body,
    };
    Tournament.push(newTournament);
    res.send(newTournament);
});

app.all("/", (req, res) => {
    res.send("Test");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
