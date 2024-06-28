import axios from "axios";
import "dotenv/config";

export default axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    key: process.env.API_KEY,
  },
});
