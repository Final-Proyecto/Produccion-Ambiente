"use client";

import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
// ARREGLO 1: Importar el CSS de Mapbox es crucial para que el mapa se vea.
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Thermometer, MapPin } from "lucide-react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF4Y2VyMjM0IiwiYSI6ImNtZ3RrdndtczAyeHkybHEyb2ZpNnkzdHIifQ.v9EIWXlmgPKKwYsQzqC5Sg";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}
interface SensorData {
  id: number;
  lat: number;
  lng: number;
  humedad: number;
  temperatura: number;
}
interface Field {
  id: number;
  nombre: string;
  cultivo: string;
  lat: number;
  lng: number;
}

export default function RealTimeMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (map || !mapContainer.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-58.235, -26.295],
      zoom: 14,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetch("/api/clima");
        if (!res.ok) {
          console.error("Fallo al obtener el clima desde el endpoint");
          return;
        }
        const data: WeatherData = await res.json();
        if (data) setWeather(data);
      } catch (error) {
        console.error("Error en fetch de clima:", error);
      }
    };
    getWeather();
    const interval = setInterval(getWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const sensorsRes = await fetch("/api/sensors");
        if (sensorsRes.ok) {
          const sensorsData = await sensorsRes.json();
          setSensors(sensorsData);
        } else {
          console.error("Fallo al obtener datos de los sensores");
        }
        const fakeFields: Field[] = [
          {
            id: 1,
            nombre: "Lote Soja Norte",
            cultivo: "Soja",
            lat: -26.292,
            lng: -58.235,
          },
          {
            id: 2,
            nombre: "Lote Maíz Sur",
            cultivo: "Maíz",
            lat: -26.298,
            lng: -58.238,
          },
        ];
        setFields(fakeFields);
      } catch (error) {
        console.error("Error al obtener datos de sensores/lotes:", error);
      }
    };

    getData();
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    fields.forEach((field) => {
      const el = document.createElement("div");
      el.className =
        "w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer";

      // ARREGLO 2: Rellenar el contenido del popup
      const popupHTML = `<div class="text-sm"><strong>${field.nombre}</strong><br/>Cultivo: ${field.cultivo}</div>`;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([field.lng, field.lat])
        .setPopup(new mapboxgl.Popup().setHTML(popupHTML))
        .addTo(map);
      markersRef.current.push(marker);
    });

    sensors.forEach((sensor) => {
      const el = document.createElement("div");
      el.className =
        "w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer";

      // ARREGLO 2: Rellenar el contenido del popup
      const popupHTML = `<div class="text-sm"><strong>Sensor #${sensor.id}</strong><br/>🌡️ Temp: ${sensor.temperatura}°C<br/>💧 Humedad: ${sensor.humedad}%</div>`;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([sensor.lng, sensor.lat])
        .setPopup(new mapboxgl.Popup().setHTML(popupHTML))
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, sensors, fields]);

  return (
    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        ref={mapContainer}
        className="lg:col-span-2 h-[500px] rounded-2xl border-2 border-emerald-100 shadow-md"
      />
      <div className="space-y-4">
        {/* Clima Card */}
        <Card className="border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-900">
              <Cloud size={20} /> Clima en Formosa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weather ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {/* Faltaba el ícono del clima, lo agregué de nuevo */}
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.condition}
                    className="w-12 h-12"
                  />
                  <p className="text-3xl font-bold text-sky-700">
                    {weather.temperature}°C
                  </p>
                </div>
                <p className="capitalize text-sky-800">{weather.condition}</p>
                <p className="text-sm text-sky-700 mt-1">
                  Humedad: {weather.humidity}% • Viento: {weather.windSpeed}{" "}
                  km/h
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-500">Cargando clima...</p>
            )}
          </CardContent>
        </Card>

        {/* Sensores */}
        <Card className="border-2 border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Droplets size={20} />
              Sensores Activos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sensors.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Sensor #{s.id}
                  </span>
                  <MapPin size={14} className="text-emerald-500" />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  🌡️ Temp: {s.temperatura}°C | 💧 Humedad: {s.humedad}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lotes */}
        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Thermometer size={20} />
              Lotes Productivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields.map((f) => (
              <div
                key={f.id}
                className="p-3 bg-green-50 border border-green-100 rounded-lg shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {f.nombre}
                </p>
                <p className="text-xs text-gray-600">
                  Cultivo: <span className="font-medium">{f.cultivo}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
