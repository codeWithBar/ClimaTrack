import express from "express";
import apiClient from "../services/api-client";
import { Weather, validateWeather } from "../models/Weather";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  // Validate query parameters
  const { error, value } = validateWeather({ latitude: lat, longitude: lon });

  if (error) {
    console.log("Validation error:", error.details[0]);
    return res.status(400).send(error.details[0].message);
  }

  console.log("Received request with parameters:", { lat, lon });

  try {
    console.log("Making request to OpenWeatherMap API");
    const response = await apiClient.get("/weather", {
      params: {
        lat: value.latitude, // Use the validated value from Joi
        lon: value.longitude, // Use the validated value from Joi
        appid: process.env.API_KEY, // Use the API key directly from the environment variable
        units: "metric",
      },
    });
    console.log("Response from OpenWeatherMap API:", response.data);

    const weatherData = new Weather({
      latitude: value.latitude, // Use the validated value from Joi
      longitude: value.longitude, // Use the validated value from Joi
      data: response.data,
    });

    console.log("Saving weather data to MongoDB:", weatherData);
    await weatherData.save();
    console.log("Weather data saved successfully");

    res.json(weatherData);
  } catch (error) {
    console.error("Error retrieving weather data or saving to MongoDB:", error);
    res.status(500).send("Error retrieving weather data or saving to MongoDB");
  }
});

export default router;
