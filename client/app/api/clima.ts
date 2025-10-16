export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export async function fetchWeather(city: string): Promise<WeatherData | null> {
  try {
    const apiKey = "68a8ea4f076d6e31230d8006baed42ee";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&appid=${apiKey}&units=metric&lang=es`
    );

    if (!res.ok) throw new Error("Error al obtener clima");

    const data = await res.json();

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      feelsLike: Math.round(data.main.feels_like),
    };
  } catch (error) {
    console.error("Error en fetchWeather:", error);
    return null;
  }
}
