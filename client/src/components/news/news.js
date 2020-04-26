import React from "react";
import './news.css';
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";

const parseDayMonth = (value) => {
    if (String(value).length === 1) {
        return `0${value + 1}`
    } else {
        return value + 1;
    }
};

const createDateString = () => {
    const currentDate = new Date((new Date()).getTime() - 1000*60*60*24);
    const month = parseDayMonth(currentDate.getUTCMonth());
    const day = parseDayMonth(currentDate.getUTCDate());
    const date = `${currentDate.getFullYear()}-${month}-${day}`;
    return date;
};

const News = () => {
    const date = createDateString();
    const API_BASE = `http://newsapi.org/v2/everything?q=apple&from=${date}&to=${date}&sortBy=popularity&apiKey=c15d1eb0520f4a2bb586a6d79f10fe5d`;
    const randomNum = Math.floor(Math.random()*20);
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent ] = useState(<Spinner/>);



    useEffect(() => {
        fetch(API_BASE)
            .then((resp) => resp.json())
            .then((body) => {
                setNews(body['articles'][randomNum]);
                setLoading(false);
            });

    },[]);

    useEffect(()=> {
        if (!loading && news)  {
            setContent (
                <div className="news">
                    <h2><a href={news.url} target="_blank">{news.title}</a></h2>
                    <h4>{news.description}</h4>
                    <img src={news.urlToImage} alt="nice"/>
                    <br/>
                    <p className="small">by {news.author}</p>
                </div>
            )
        }
    }, [loading, news]);


    return content;
};



export default News;
