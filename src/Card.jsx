import loupe from "./assets/loupe-arrondie.png";
import clear from "./assets/clear.png";
import wind from "./assets/wind.png";
import humidity from "./assets/humidity.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
const Card = () => {
  const [apiCalls, setApiCalls] = useState([]);
  const inputRef = useRef();
  const city = ""
  const allIcons = {
      "01d": clear,
      "01n": clear,
      "02d": cloud,
      "02n": cloud,
      "03d": cloud,
      "03n": cloud,
      "04d": drizzle,
      "04n": drizzle,
      "09d": rain,
      "09n": rain,
      "010d": rain,
      "010n": rain,
      "013d": snow,
      "013n": snow,
  }

  const fetchData = async (city) => {
    try {
      const apis = "ea660b1f3f52a41ba4bd25c7b78a9971";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apis}`
      );
      const apiCall = await response.json();
      const icon = allIcons[apiCall.weather[0].icon] || clear;
      setApiCalls({
        humidity: apiCall.main.humidity,
        windSpeed: apiCall.wind.speed,
        temperature: Math.floor(apiCall.main.temp),
        location: apiCall.name,
        icon:icon
      });

      if (!apiCall.weather || !apiCall.weather.length) {
        throw new Error("Weather data is not available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      console.log("sucess");
      // Always set loading to false after fetching (success or error)
    }
  };

  const handleClick = () => {
    const cityName = inputRef.current.value.trim();
    if (cityName) {
      fetchData(cityName);
    }
  };

  useEffect(() => {
    

    fetchData(city); // Appeler fetchData lorsque la ville change
  }, []);

  return (
                //  {/* Conteneur de l'app */}
    <div className="bg-indigo-600 place-self-center w-11/12 max-w-md flex flex-col px-7 min-h-[100px] rounded-3xl">
      <h1 className="text-4xl font-bold text-white flex items-center justify-center">
        Weather
      </h1>

      <div className="flex items-center bg-gray-200 gap-4 mt-7 ml-20 rounded-full h-10 w-52 animate-fade-in">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-0 outline-none pl-4 pr-2  placeholder:text-slate-600"
          placeholder="entrez quelque chose"
        />

        <img
          onClick={handleClick}
          src={loupe}
          alt=""
          className="w-12 px-3 py-2 cursor-pointer bg-white rounded-full"
        />
      </div>

      {/* Après la barre de recherche */}

          {/* {apiCalls.humidity == undefined} ? (<p>AUCUNE DONNEE</p>) : (<div className="flex flex-col  items-center justify-center">
        <img src={apiCalls.icon} alt="" className=" w-52" />
        <p className="text-7xl text-white font-semi-bold bg-blue-800 px-1">
          {apiCalls.temperature}°C
        </p>
        <p className="text-white text-3xl font-semibold pt-2">
          {apiCalls.location}
        </p>
      </div>
      <div className="relative flex justify-evenly mt-2 pl-16">
        <div>
          <img src={humidity} alt="" className="w-7 h-7 mt-1" />
          <span className="mt-1 pl-7 text-white">Humidity</span>
        </div>
        <span className="absolute left-36 top-1 text-white">
          {apiCalls.humidity}%
        </span>

        <div>
          <img src={wind} alt="" className="w-9 h-9" />
          <span className=" pl-7 text-white">Wind Speed</span>
        </div>
        <span className="absolute right-11 top-1 text-white">
          {apiCalls.windSpeed}km/h
        </span>
      </div>) */}

<div>
{apiCalls.humidity === undefined ? (
    <p className="text-white text-2xl font-semibold flex justify-center py-8 items-center">AUCUNE DONNEE</p>
  ) : (
    <>
<div className="flex flex-col items-center justify-center">
  
      <img src={apiCalls.icon} alt="" className="w-52" />
      <p className="text-7xl text-white font-semi-bold bg-blue-800 px-1">
        {apiCalls.temperature}°C
      </p>
      <p className="text-white text-3xl font-semibold pt-2">
        {apiCalls.location}
      </p>
   
  
</div>
<div className="relative flex justify-evenly mt-2 pl-16">
  <div>
    <img src={humidity} alt="" className="w-7 h-7 mt-1" />
    <span className="mt-1 pl-7 text-white">Humidity</span>
  </div>
  <span className="absolute left-36 top-1 text-white">
    {apiCalls.humidity}%
  </span>

  <div>
    <img src={wind} alt="" className="w-9 h-9" />
    <span className="pl-7 text-white">Wind Speed</span>
  </div>
  <span className="absolute right-11 top-1 text-white">
    {apiCalls.windSpeed}km/h
  </span>
</div>
</>
  )}
</div>




      {/* Liste déroulante pour changer de langue */}
      <div className="flex justify-start mt-4">
        <select
          // value={language}
          // onChange={changeLanguage}
          className="bg-white text-black rounded px-2 w-28 h-6"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>
      </div>
    </div>
  );
};

export default Card;
