import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
const apiKey = "LHfg34zjuYdLNNX2bSFxh3K96vPeDLWy"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) =>{

    try {
        const response = await axios.get(
            `https://api.thecatapi.com/v1/images/search`
        );
        const result = response.data



        // console.log(result)
        res.render("index.ejs", {dataR:result})
        
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: "Failed to make request"});
        
    }
    //https://tradestie.com/api/v1/apps/reddit
})

app.post("/submit", async (req, res) =>{
    let ticker = req.body.ticker.toUpperCase()
    let date = req.body.date
    let parts = date.split('-');
    let formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    try {
        const response = await axios.get(
            `https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=${apiKey}`
        );
        const result = response.data
        const response2 = await axios.get(
            `https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=3&apiKey=${apiKey}`
        );
        const result2 = response2.data


        // console.log(result)
        // console.log(result2)
        res.render("index.ejs", {data:result, date:formattedDate , data2:result2})
        
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: "Failed to make request"});
        
    }
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})





app.listen(port, () => {
    console.log(`server running port ${port}`)
})

        // const length = result.length
        // const random = Math.floor(Math.random()*length)
        // const job = result[random]