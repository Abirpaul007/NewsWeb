require("dotenv").config();
const express = require("express");
const axios=require("axios");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));

const API_KEY=process.env.API_KEY;

function fetchNews(url, res) {
    axios.get(url)
        .then(response => {
            console.log("API Response:", response.data); // Debugging log

            if (response.data.articles && response.data.articles.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Successfully fetched the data",
                    data: response.data.articles // Send only articles
                });
            } else {
                console.error("No articles found:", response.data);
                res.json({
                    status: 404,
                    success: false, // Should be false, not true
                    message: "No articles found"
                });
            }
        })
        .catch(error => {
            console.error("API Error:", error.response?.data || error.message);
            res.json({
                status: 500,
                success: false,
                message: "Failed to fetch the data",
                error: error.response?.data || error.message
            });
        });
}

//all news

app.get("/all-news", (req, res) => {
    
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    
    fetchNews(url, res);
});


//top-headlines
app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1; // Fixed this line
    let category = req.query.category || "general";
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//country
app.get("/country/:iso", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1; // Fixed this line
    const country = req.params.iso;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});


//port
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});