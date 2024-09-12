"use client";
import React, { useState, useEffect } from "react";
import { FaCloud, FaCloudRain, FaCloudSun } from "react-icons/fa"

function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date;
}

const Home = () => {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("lahore");
  const [error, setError] = useState(null);

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f2ba159db873d928cf7fa2d358c710f9`
      );
      const jsonData = await response.json();
      setWeatherData(jsonData);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Invalid city name. Please try again.");
    }
  }

  useEffect(() => {
    fetchData(city);
  }, []);

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <article className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form
          className="flex flex-wrap -mx-3 mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
        >
          <input
            className="w-full md:w-1/2 px-3 py-2 bg-slate-200 text-black leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter city name"
            type="text"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </form>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className="flex items-center mb-4">
              <div className="mr-4">
              {weatherData?.weather[0]?.description.includes("rain") ? (
              <FaCloudRain className={`wi wi-day-${weatherData?.weather[0]?.description}`} />
              ) : weatherData?.weather[0]?.description.includes("sun") ? (
              <FaCloudSun className={`wi wi-day-${weatherData?.weather[0]?.description}`} />
              ) : (
              <FaCloud className={`wi wi-day-${weatherData?.weather[0]?.description}`} />
              )}
              </div>
              <div>
                <div className="text-3xl">
                  <span>
                    {(weatherData?.main?.temp - 273.5).toFixed(2) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                <div className="text-gray-600">
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="text-lg">{weatherData?.name}</div>
            <div className="text-gray-600">{date}</div>
          </>
        ) : (
          <div className="text-gray-600">city name notfound enter another city</div>
        )}
      </article>
    </main>
  );
};

export default Home;