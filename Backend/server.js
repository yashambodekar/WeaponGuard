const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    console.log('server is running made ~by harshu');
    res.json("server is running fine");
});

 
app.get("/alert", async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body);

        // forward the request body to your tunnel API
        const response = await axios.post(
            "https://9xm99s2l-8000.inc1.devtunnels.ms/get-detection",
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response from detect API:", response.data);

        res.json({ message: "received", detectResponse: response.data });
    } catch (error) {
        console.error("Error calling detect API:", error.message);
        res.status(500).json({ error: "Failed to call detect API" });
    }
});

app.post("/getdetected", async (req, res)=>{
    console.log("request from cctv camera");
    console.log(req.body);
    res.status(200).json("responsed");
})

const port = 3000 ;
app.listen(port, () => {
    console.log("server is running  on port 3000 made ~by harshu.........");
});
