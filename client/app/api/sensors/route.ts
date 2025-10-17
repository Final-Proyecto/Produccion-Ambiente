import { NextResponse } from "next/server";

interface SensorData {
  id: number;
  lat: number;
  lng: number;
  humedad: number;
  temperatura: number;
}

const baseSensors = [
  { id: 1, lat: -26.291, lng: -58.234, baseHumedad: 65, baseTemp: 24 },
  { id: 2, lat: -26.299, lng: -58.237, baseHumedad: 72, baseTemp: 26 },
  { id: 3, lat: -26.295, lng: -58.24, baseHumedad: 63, baseTemp: 23 },
];

export async function GET() {
  try {
    const simulatedData: SensorData[] = baseSensors.map((sensor) => {
      const humedad = sensor.baseHumedad + (Math.random() * 6 - 3);
      const temperatura = sensor.baseTemp + (Math.random() * 4 - 2);

      return {
        id: sensor.id,
        lat: sensor.lat,
        lng: sensor.lng,
        humedad: parseFloat(humedad.toFixed(1)),
        temperatura: parseFloat(temperatura.toFixed(1)),
      };
    });

    return NextResponse.json(simulatedData);
  } catch (error) {
    console.error("Error en el simulador de /api/sensors:", error);
    return NextResponse.json([], { status: 500 });
  }
}
