import { Schema, model, Document } from "mongoose";
import Joi from "joi";

interface IWeather extends Document {
  latitude: number;
  longitude: number;
  data: any;
  timestamp: Date;
}

const weatherSchema = new Schema<IWeather>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

export function validateWeather(weather: any) {
  const schema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required,
    longitude: Joi.number().min(-90).max(90).required,
  });

  return schema.validate(weather);
}

export const Weather = model<IWeather>("Weather", weatherSchema);
