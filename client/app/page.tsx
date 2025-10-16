"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sprout,
  Cloud,
  Droplets,
  MapPin,
  BarChart3,
  Bell,
  ArrowRight,
  Leaf,
  Map,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

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
      center: [-60.6298, -31.4135],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      role: "Productor Agropecuario",
      content:
        "Increíble plataforma. Reduje un 35% el consumo de agua en mis cultivos.",
    },
    {
      name: "María González",
      role: "Ingeniera Agrónoma",
      content:
        "La visualización en tiempo real me permite tomar mejores decisiones.",
    },
    {
      name: "Roberto Silva",
      role: "Ganadero",
      content:
        "El monitoreo GPS del ganado ha sido un cambio radical para mi negocio.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Navbar Mejorada */}
      <nav className="border-b bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Sprout className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
              AgroSmart
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/auth/registro">
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Mejorada */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/80 backdrop-blur-sm text-emerald-800 border-emerald-200 px-4 py-2 rounded-full shadow-lg">
            <Leaf className="w-4 h-4 mr-2" />
            Gestión Agropecuaria Inteligente
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Optimiza tu campo con
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              {" "}
              tecnología
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Monitorea cultivos, ganado y clima en tiempo real. Visualiza tu
            establecimiento en un mapa interactivo y toma decisiones
            inteligentes.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-lg px-8 py-6 rounded-xl shadow-xl"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 rounded-xl"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                500+
              </div>
              <div className="text-sm text-gray-600">Productores</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                15k+
              </div>
              <div className="text-sm text-gray-600">Hectáreas</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                98%
              </div>
              <div className="text-sm text-gray-600">Satisfacción</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                24/7
              </div>
              <div className="text-sm text-gray-600">Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section Mejorada */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Card Mejorada */}
            <Card className="lg:col-span-2 overflow-hidden shadow-2xl border-2 border-emerald-100 hover:shadow-3xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin size={20} />
                  Vista Satelital del Campo
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Sistema de geolocalización en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  ref={mapContainer}
                  className="w-full h-[400px] md:h-[500px]"
                />
                <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-4 flex-wrap">
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
              </CardContent>
            </Card>

            {/* Stats Cards Mejoradas */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-emerald-100 hover:shadow-lg transition-all duration-300 hover:border-emerald-200">
                <CardHeader className="p-0 mb-4">
                  <MapPin className="text-emerald-600 mb-2" size={28} />
                  <CardTitle className="text-lg">Geolocalización GPS</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 text-sm mb-4">
                    Rastrea la ubicación exacta de tu ganado y equipamiento
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-600">
                      12 activos
                    </div>
                    <Progress value={75} className="w-20 bg-emerald-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader className="p-0 mb-4">
                  <Droplets className="text-blue-600 mb-2" size={28} />
                  <CardTitle className="text-lg">Sensores IoT</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 text-sm mb-4">
                    Visualiza datos de humedad, temperatura y más
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      8 sensores
                    </div>
                    <Progress value={60} className="w-20 bg-blue-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 border-amber-100 hover:shadow-lg transition-all duration-300 hover:border-amber-200">
                <CardHeader className="p-0 mb-4">
                  <BarChart3 className="text-amber-600 mb-2" size={28} />
                  <CardTitle className="text-lg">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 text-sm mb-4">
                    Métricas y análisis en tiempo real
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-amber-600">
                      24/7 live
                    </div>
                    <Progress value={90} className="w-20 bg-amber-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Mejorada */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
              <Zap className="w-3 h-3 mr-1" />
              Funcionalidades
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en una plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas diseñadas específicamente para el sector agropecuario
              moderno
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Droplets,
                title: "Monitoreo de Suelo",
                description: "Sensores de humedad y nutrientes en tiempo real",
                color: "bg-blue-100 text-blue-600",
                progress: 85,
              },
              {
                icon: Cloud,
                title: "Pronóstico Climático",
                description: "Predicciones precisas y alertas meteorológicas",
                color: "bg-sky-100 text-sky-600",
                progress: 92,
              },
              {
                icon: Sprout,
                title: "Gestión de Cultivos",
                description: "Seguimiento de siembra, crecimiento y cosecha",
                color: "bg-emerald-100 text-emerald-600",
                progress: 78,
              },
              {
                icon: BarChart3,
                title: "Analytics & Reportes",
                description: "Visualiza datos y tendencias en tiempo real",
                color: "bg-purple-100 text-purple-600",
                progress: 88,
              },
              {
                icon: Bell,
                title: "Alertas Inteligentes",
                description:
                  "Notificaciones automáticas de condiciones críticas",
                color: "bg-red-100 text-red-600",
                progress: 95,
              },
              {
                icon: Shield,
                title: "Seguridad Integral",
                description: "Protección de datos y backup automático",
                color: "bg-green-100 text-green-600",
                progress: 99,
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200 hover:translate-y-[-4px] group"
              >
                <CardHeader className="p-0 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon size={24} />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={feature.progress}
                      className="flex-1 bg-gray-100"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {feature.progress}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
              <Users className="w-3 h-3 mr-1" />
              Testimonios
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros productores
            </h2>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <p className="text-gray-600 italic mb-4">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-emerald-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section Mejorada */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Comienza a optimizar tu campo hoy
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Únete a cientos de productores que ya están transformando su
                gestión agropecuaria
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold shadow-lg"
                >
                  Crear Cuenta Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-emerald-700 hover:bg-white/10 px-8 py-6 rounded-xl font-semibold"
                >
                  Solicitar Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer Mejorado */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                <Sprout className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-xl">AgroSmart</span>
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm mb-2">Producción y Ambiente 🌱</div>
              <div className="text-xs text-gray-500">
                © 2024 AgroSmart. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
