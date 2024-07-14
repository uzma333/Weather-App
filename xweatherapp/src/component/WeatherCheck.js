import React, { useState } from 'react'
import axios from 'axios';
import "./weatherCheck.css"

function WeatherCheck() {
    const[city,setCity]=useState('');
    const[weather,setWeather]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");

    const API_KEY=`0888b4afccbe49baa2e121529241007`;

    const fetchWeather=async()=>{
        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const response=await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
            setWeather(response.data);
            
        } catch (error) {
            alert('Failed to fetch wheather data')
            
        }
        setLoading(false);
        

    }

    const handleInputChange=(e)=>{
        setCity(e.target.value)
    }

    const handleSearch=()=>{
        if(city.trim()){
        fetchWeather()
        }else{
            setError("Enter city name")
        }
    }
    

  return (
    <div>
        <div>
            <input type='text' value={city} onChange={handleInputChange} placeholder='Enter city name'/>
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {weather &&(
                <div className='weather-cards'>
                    <div className='weather-card'>
                    <h2>Temperature</h2>
                   <p>{weather.current.temp_c} °C</p>
             </div>
             <div className='weather-card'>
            <h2>Humidity</h2>
            <p>{weather.current.humidity} %</p>
          </div>
          <div className='weather-card'>
            <h2>Condition</h2>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <h2>Wind Speed</h2>
            <p>{weather.current.wind_kph} kph</p>
            </div>
            
        </div>
            )}
    </div>
    
    </div>
  
)}

export default WeatherCheck