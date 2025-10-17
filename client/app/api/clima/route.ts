import { NextResponse } from "next/server";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export async function GET() {
  try {
    const apiKey = "68a8ea4f076d6e31230d8006baed42ee";

    if (!apiKey) {
      throw new Error("API Key no encontrada");
    }

    const city = "Formosa";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&appid=${apiKey}&units=metric&lang=es`
    );

    if (!res.ok) {
      throw new Error(`Error desde OpenWeatherMap: ${res.statusText}`);
    }

    const data = await res.json();

    const responseData: WeatherData = {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      feelsLike: Math.round(data.main.feels_like),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error en /api/clima:", error);
    return NextResponse.json(
      { message: "Error interno al obtener los datos del clima" },
      { status: 500 }
    );
  }
}
