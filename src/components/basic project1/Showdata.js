import React from 'react'
// import axios from 'axios';
import { useEffect, useState} from 'react';
import './style.css';

const Showdata = () => {

    function convertTime (time) {
        let dt = new Date(time*1000);
        let h = dt.getHours()
        let m = "0" + dt.getMinutes()
        let t = h + ":" + m.substr(-2)
        return t
    }

    function Tempcheck(temp) {
        if (temp >= 100) {
            return "Boiling";
        }
        else if (temp < 100 && temp >= 65) {
            return "Hot";
        }
        else if(temp < 65 && temp >= 40) {
            return "Warm";
        }
        else if(temp < 40 && temp >= 15){
            return "Normal";
        }
        else if(temp < 15 && temp >= 5){
            return "Cool";
        }
        else if(temp < 5){
            return "Freezing";
        }
        return "Normal"
    }

    const [system, setSystem] = useState(null);
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Delhi");
    const [state, setState] = useState();

    var today = new Date();
    var date = today.toDateString();
    var time = today.toLocaleTimeString(); 

    console.log(date);
    console.log(time);
    
    


    useEffect ( () => {

        const fetchApi = async () => { 

            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=998fe47862d7d3a23d74ba93cdbb0629`;
            const response = await fetch(url);
            const resjson = await response.json();
            // console.log(resjson);
            setCity(resjson.main);
            setSystem(resjson.sys);
     
        };
        fetchApi();
    }, [search])

    
    

    return (

        <>
            
            <div className="box">
                <div className="sunimage">
                    <img className ="image" src="https://mausam.imd.gov.in/img/NW4.png" alt="Sun Image" />
                    
                </div>
                <div className="datesearch">
                    <h2 className="datetime">{date} &nbsp;&nbsp; {time}</h2>
                    <input type="search" className="inputfield" placeholder="      Search Location"
                     onChange = { (event) => { setSearch(event.target.value)}} />
                 
                 </div>
            </div>



            { ( !city || !system ) ? (
                <p className="notfound">!! City Not Found !! </p>
                ) : (
                    <div className="main">
                    <div className="info">
                        <h1 className="location">{search} </h1>

                    </div>   

                   

                    <div className="citytemp">
                    <h1 className="citytemperature">Temp : {Math.round(city.temp)} °C</h1>
                    <h1 className="tempcheck"> {Tempcheck(city.temp)} </h1>
                    </div>
                    <div className="tempminmax">
                        <h2 className="minmax"> Min : {Math.round(city.temp_min)} °C &nbsp;|&nbsp; Max : {Math.round(city.temp_max)} °C </h2>
                    </div>
                  
                    <div className="riseset">
                        <h2 className="riseset"> Sunrise : {convertTime(system.sunrise)} &nbsp;|&nbsp;   Sunset : {convertTime(system.sunset)}</h2>
                    </div>
            
                    </div>
             
            ) }
        </>

    );

    
}
export default Showdata;

