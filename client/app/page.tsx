"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Cloud,
  Droplets,
  TrendingUp,
  MapPin,
  BarChart3,
  Bell,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Map,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF4Y2VyMjM0IiwiYSI6ImNtZ3RrdndtczAyeHkybHEyb2ZpNnkzdHIifQ.v9EIWXlmgPKKwYsQzqC5Sg";

export default function Page() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-60.6298, -31.4135], // Formosa, Argentina
      zoom: 12,
    });

    // Agregar controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Agregar algunos marcadores de ejemplo
    const markers = [
      {
        coords: [-60.63, -31.41],
        title: "Campo Norte - Soja",
        color: "#10b981",
      },
      {
        coords: [-60.62, -31.42],
        title: "Campo Sur - Ganado",
        color: "#f59e0b",
      },
      {
        coords: [-60.64, -31.415],
        title: "Sensor de Humedad",
        color: "#3b82f6",
      },
    ];

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.backgroundColor = marker.color;
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.border = "3px solid white";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

      new mapboxgl.Marker(el)
        .setLngLat(marker.coords as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px; font-weight: 600;">${marker.title}</div>`
          )
        )
        .addTo(map.current!);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Sprout className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-emerald-800">
              AgroSmart
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="outline">Iniciar Sesión</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Registrarse
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            <Leaf className="w-3 h-3 mr-1" />
            Gestión Agropecuaria Inteligente
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Optimiza tu campo con
            <span className="text-emerald-600"> tecnología</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Monitorea cultivos, ganado y clima en tiempo real. Visualiza tu
            establecimiento en un mapa interactivo y toma decisiones
            inteligentes.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Map className="w-3 h-3 mr-1" />
              Mapa Interactivo
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visualiza tu campo en tiempo real
            </h2>
            <p className="text-xl text-gray-600">
              Monitorea sensores, cultivos y ganado desde un solo lugar
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Card */}
            <Card className="lg:col-span-2 overflow-hidden shadow-2xl border-2 border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin size={20} />
                  Vista Satelital del Campo
                </h3>
                <p className="text-sm text-emerald-100 mt-1">
                  Sistema de geolocalización en tiempo real
                </p>
              </div>
              <div
                ref={mapContainer}
                className="w-full h-[400px] md:h-[500px]"
              />
              <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-600">Cultivos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Ganado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Sensores</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  Actualizado hace 2 min
                </span>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-emerald-100 hover:shadow-lg transition">
                <MapPin className="text-emerald-600 mb-3" size={28} />
                <h3 className="text-lg font-semibold mb-2">
                  Geolocalización GPS
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Rastrea la ubicación exacta de tu ganado y equipamiento
                </p>
                <div className="text-2xl font-bold text-emerald-600">
                  12 activos
                </div>
              </Card>

              <Card className="p-6 border-2 border-blue-100 hover:shadow-lg transition">
                <Droplets className="text-blue-600 mb-3" size={28} />
                <h3 className="text-lg font-semibold mb-2">Sensores IoT</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Visualiza datos de humedad, temperatura y más
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  8 sensores
                </div>
              </Card>

              <Card className="p-6 border-2 border-amber-100 hover:shadow-lg transition">
                <BarChart3 className="text-amber-600 mb-3" size={28} />
                <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Métricas y análisis en tiempo real
                </p>
                <div className="text-2xl font-bold text-amber-600">
                  24/7 live
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades principales
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para gestionar tu establecimiento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Droplets,
                title: "Monitoreo de Suelo",
                description: "Sensores de humedad y nutrientes en tiempo real",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Cloud,
                title: "Pronóstico Climático",
                description: "Predicciones precisas y alertas meteorológicas",
                color: "bg-sky-100 text-sky-600",
              },
              {
                icon: Sprout,
                title: "Gestión de Cultivos",
                description: "Seguimiento de siembra, crecimiento y cosecha",
                color: "bg-emerald-100 text-emerald-600",
              },
              {
                icon: BarChart3,
                title: "Analytics & Reportes",
                description: "Visualiza datos y tendencias en tiempo real",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: Bell,
                title: "Alertas Inteligentes",
                description:
                  "Notificaciones automáticas de condiciones críticas",
                color: "bg-red-100 text-red-600",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-600 text-white">
                Impacto Real
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Resultados que puedes medir
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce hasta 30% el uso de agua con riego inteligente",
                  "Aumenta la productividad con decisiones basadas en datos",
                  "Minimiza el impacto ambiental con gestión optimizada",
                  "Monitoreo 24/7 desde cualquier dispositivo",
                  "Alertas automáticas para actuar a tiempo",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
                <TrendingUp className="text-emerald-600 mb-4" size={32} />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  +25%
                </div>
                <div className="text-gray-600">Productividad</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                <Droplets className="text-blue-600 mb-4" size={32} />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  -30%
                </div>
                <div className="text-gray-600">Uso de agua</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Rastreo GPS</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                <BarChart3 className="text-purple-600 mb-4" size={32} />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Monitoreo</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Comienza a optimizar tu campo hoy
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Registrate gratis y descubre cómo la tecnología puede transformar
              tu producción
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-100"
              >
                Crear Cuenta Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-emerald-800"
              >
                Iniciar Sesión
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="text-white" size={20} />
              </div>
              <span className="text-white font-bold">AgroSmart</span>
            </div>
            <p className="text-sm text-center">
              © 2024 AgroSmart - Hackathon Ultra 24Hs
            </p>
            <div className="text-sm">Producción y Ambiente 🌱</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
