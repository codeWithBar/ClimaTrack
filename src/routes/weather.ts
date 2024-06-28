import express from "express";
import apiClient from "../services/api-client";
import { Weather, validateWeather } from "../models/Weather";
import "dotenv/config";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).send("Latitude and Longitude are required");
  }

  console.log("Received request with parameters:", { lat, lon });

  try {
    const response = await apiClient.get("/weather", {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.API_KEY,
        units: "metric",
      },
    });
    console.log("Response from OpenWeatherMap API:", response.data);

    const weatherData = new Weather({
      latitude: Number(lat),
      longitude: Number(lon),
      data: response.data,
    });
    console.log("Saving weather data to MongoDB:", weatherData);
    await weatherData.save();
    console.log("Weather data saved successfully");

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving weather data");
  }
});

export default router;
