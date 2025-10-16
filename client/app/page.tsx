"use client";
import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Cloud,
  Droplets,
  TrendingUp,
  Shield,
  ArrowRight,
  Check,
  Star,
  Menu,
  Sun,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudFog,
  Wind,
  MapPin,
  Thermometer,
  Loader2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface WeatherData {
  temp: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  feels_like: number;
}

// --- Componente del Header ---
const Header = () => {
  const navLinks = [
    { href: "#features", label: "Características" },
    { href: "#benefits", label: "Beneficios" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "#gallery", label: "Galería" }, // Añadido link a galería
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-green-700" />
          <span className="text-xl font-bold text-slate-800">AgroIntelli</span>
        </Link>

        {/* Navegación para Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botones de Autenticación para Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
          <Button
            className="bg-green-700 text-white hover:bg-green-800"
            asChild
          >
            <Link href="/auth/registro">Registrarse</Link>
          </Button>
        </div>

        {/* Menú para Móvil */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 pt-10">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-slate-700"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="border-t pt-6 space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <SheetClose asChild>
                      <Link href="/auth/login">Iniciar Sesión</Link>
                    </SheetClose>
                  </Button>
                  <Button
                    className="w-full bg-green-700 text-white hover:bg-green-800"
                    asChild
                  >
                    <SheetClose asChild>
                      <Link href="/auth/registro">Registrarse</Link>
                    </SheetClose>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  // Función para obtener el icono del clima
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: Record<string, ReactElement> = {
      "01d": <Sun className="h-16 w-16 text-yellow-400" />,
      "01n": <Sun className="h-16 w-16 text-blue-300" />,
      "02d": <CloudSun className="h-16 w-16 text-yellow-400" />,
      "02n": <CloudSun className="h-16 w-16 text-blue-300" />,
      "03d": <Cloud className="h-16 w-16 text-gray-400" />,
      "03n": <Cloud className="h-16 w-16 text-gray-400" />,
      "04d": <Cloud className="h-16 w-16 text-gray-500" />,
      "04n": <Cloud className="h-16 w-16 text-gray-500" />,
      "09d": <CloudDrizzle className="h-16 w-16 text-blue-400" />,
      "09n": <CloudDrizzle className="h-16 w-16 text-blue-400" />,
      "10d": <CloudRain className="h-16 w-16 text-blue-500" />,
      "10n": <CloudRain className="h-16 w-16 text-blue-500" />,
      "11d": <CloudRain className="h-16 w-16 text-purple-500" />,
      "11n": <CloudRain className="h-16 w-16 text-purple-500" />,
      "13d": <CloudSnow className="h-16 w-16 text-blue-200" />,
      "13n": <CloudSnow className="h-16 w-16 text-blue-200" />,
      "50d": <CloudFog className="h-16 w-16 text-gray-400" />,
      "50n": <CloudFog className="h-16 w-16 text-gray-400" />,
    };

    return iconMap[iconCode] || <Cloud className="h-16 w-16 text-gray-400" />;
  };

  // Función para obtener el color de fondo según el clima
  const getWeatherBackground = (iconCode: string) => {
    if (iconCode.startsWith("01")) return "from-green-50 to-amber-50";
    if (iconCode.startsWith("02")) return "from-green-50 to-sky-50";
    if (iconCode.startsWith("09") || iconCode.startsWith("10"))
      return "from-green-50 to-blue-50";
    if (iconCode.startsWith("11")) return "from-green-50 to-purple-50";
    if (iconCode.startsWith("13")) return "from-green-50 to-cyan-50";
    return "from-green-50 to-slate-50";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoadingWeather(true);
        const apiKey = "68a8ea4f076d6e31230d8006baed42ee";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Formosa,AR&units=metric&lang=es&appid=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          setWeather({
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            feels_like: Math.round(data.main.feels_like),
          });
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      } finally {
        setIsLoadingWeather(false);
      }
    };
    fetchWeather();

    // Actualizar cada 10 minutos
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // --- Arrays de contenido ---
  const features = [
    {
      icon: Droplets,
      title: "Monitoreo de Riego Inteligente",
      description:
        "Optimiza el uso del agua con sensores que miden la humedad del suelo en tiempo real.",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Rendimiento",
      description:
        "Visualiza datos clave de tu cosecha para tomar decisiones informadas y aumentar la productividad.",
    },
    {
      icon: Shield,
      title: "Protección de Cultivos",
      description:
        "Recibe alertas tempranas sobre plagas y condiciones climáticas adversas para proteger tu inversión.",
    },
  ];

  const benefits = [
    "Reduce hasta un 35% el consumo de agua.",
    "Aumenta la productividad de tus cultivos.",
    "Toma decisiones basadas en datos precisos.",
    "Recibe alertas para prevenir pérdidas.",
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      farm: "Estancia La Primavera",
      testimonial:
        "Increíble cómo optimizamos el riego. Pasé de 12 horas diarias a 6, con mejores resultados.",
      stars: 5,
    },
    {
      name: "María González",
      farm: "Campo Los Algarrobos",
      testimonial:
        "Las alertas climáticas me salvaron la cosecha. Pude proteger todo a tiempo antes de la tormenta.",
      stars: 5,
    },
    {
      name: "José Martínez",
      farm: "Granja San José",
      testimonial:
        "La app es muy fácil de usar. A mis 65 años, hasta yo puedo manejar la tecnología sin problemas.",
      stars: 4,
    },
  ];

  // --- Datos para el carrusel ---
  const carouselImages = [
    { id: 1, src: "/campo1.jpg", alt: "Campo de soja en Formosa" },
    { id: 2, src: "/campo2.jpg", alt: "Tractor trabajando en campo" },
    { id: 3, src: "/campo3.jpg", alt: "Vista aérea de cultivos" },
    { id: 4, src: "/campo4.jpg", alt: "Maíz en crecimiento" },
    { id: 5, src: "/campo5.jpg", alt: "Camioneta en medio de un campo" },
  ];

  // --- Configuración del carrusel ---
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  return (
    <div className="min-h-screen bg-[#F9F5F0] text-slate-800">
      <Header />

      <main>
        {/* --- Sección Hero --- */}
        <section className="relative overflow-hidden pt-16 pb-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <Badge className="mb-4 border-green-200 bg-green-100 text-green-800">
                  Tecnología para el Campo Argentino
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                  Agricultura Inteligente para{" "}
                  <span className="text-green-700">Formosa</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Monitorea tu campo en tiempo real, optimiza recursos y aumenta
                  tu productividad con nuestra plataforma diseñada para el
                  agricultor moderno.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-green-700 text-white shadow-lg hover:bg-green-800"
                    asChild
                  >
                    <Link href="/auth/registro">
                      Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300"
                    asChild
                  >
                    <Link href="#features">Ver Características</Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex h-80 items-center justify-center lg:h-full">
                <Image
                  src="/agricultor2.png"
                  alt="Árbol 3D representando la naturaleza y tecnología"
                  width={500}
                  height={500}
                  className="h-auto w-full max-w-md animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- Sección de Clima MEJORADA --- */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <Card
              className={`mx-auto max-w-5xl border-2 overflow-hidden shadow-xl ${
                weather ? "border-green-200" : "border-gray-200"
              }`}
            >
              <div
                className={`bg-gradient-to-br ${
                  weather
                    ? getWeatherBackground(weather.icon)
                    : "from-green-50 to-amber-50" // Fondo por defecto
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl text-slate-800">
                    <MapPin className="h-6 w-6 text-green-700" />
                    <span>Clima Actual en Formosa Capital</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingWeather ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="h-12 w-12 animate-spin text-green-700" />
                      <p className="mt-4 text-lg text-slate-600">
                        Cargando información del clima...
                      </p>
                    </div>
                  ) : weather ? (
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Temperatura Principal */}
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex items-center justify-center">
                          {getWeatherIcon(weather.icon)}
                        </div>
                        <div className="text-center">
                          <div className="text-6xl font-bold text-slate-900">
                            {weather.temp}°C
                          </div>
                          <p className="text-xl text-slate-700 capitalize mt-2 font-medium">
                            {weather.description}
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-2 text-slate-600">
                            <Thermometer className="h-4 w-4" />
                            <span className="text-sm">
                              Sensación térmica: {weather.feels_like}°C
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detalles del Clima */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-white/70 border-gray-200">
                          <CardContent className="pt-6 text-center">
                            <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-3xl font-bold text-slate-900">
                              {weather.humidity}%
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              Humedad
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/70 border-gray-200">
                          <CardContent className="pt-6 text-center">
                            <Wind className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                            <p className="text-3xl font-bold text-slate-900">
                              {weather.wind_speed}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              km/h Viento
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/70 border-gray-200 col-span-2">
                          <CardContent className="pt-6 text-center">
                            <Badge
                              className={`${
                                weather.temp >= 15 && weather.temp <= 30
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              } text-base px-4 py-2`}
                            >
                              {weather.temp >= 15 && weather.temp <= 30 ? (
                                <>
                                  <Check className="w-4 h-4 mr-2 inline" />
                                  Condiciones óptimas para cultivo
                                </>
                              ) : (
                                <>
                                  <Thermometer className="w-4 h-4 mr-2 inline" />
                                  Monitorear condiciones de temperatura
                                </>
                              )}
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-slate-600 text-lg">
                        No se pudo cargar el clima
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                      >
                        Reintentar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* --- Sección Carrusel de Imágenes --- */}
        <section
          id="gallery"
          className="py-16 bg-gradient-to-b from-green-50 to-amber-50"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">
              Galería de Campos
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {carouselImages.map((image) => (
                    <div
                      className="relative flex-[0_0_100%] min-w-0"
                      key={image.id}
                    >
                      <div className="relative h-96">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-6">
                          <p className="text-white text-lg">{image.alt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Sección de Características --- */}
        <section id="features" className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Todo lo que necesitás
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Herramientas diseñadas para potenciar tu campo.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="border-gray-200 bg-gray-50/80 transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <feature.icon className="h-6 w-6 text-green-700" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- Sección de Beneficios --- */}
        <section id="benefits" className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex justify-center"></div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Transformá tu campo con resultados reales
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Nuestros clientes ya están viendo cambios significativos en su
                  productividad y eficiencia.
                </p>
                <ul className="mt-8 space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Sección de Testimonios --- */}
        <section id="testimonials" className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Lo que dicen nuestros agricultores
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Historias reales de éxito en campos de Formosa.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <Card
                  key={i}
                  className="flex flex-col justify-between border-gray-200"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-5 w-5 ${
                            j < testimonial.stars
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-slate-600 italic">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </blockquote>
                  </CardContent>
                  <CardHeader>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">
                      {testimonial.farm}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- Sección CTA --- */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl bg-green-700 px-6 py-20 text-center shadow-2xl sm:px-16">
              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-0 max-w-full">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="h-full w-full text-green-600"
                    fill="currentColor"
                  >
                    <circle cx="0" cy="100" r="100" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿Listo para transformar tu campo?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-green-100">
                  Únete a cientos de agricultores que ya optimizan su producción
                  con tecnología inteligente.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-green-700 shadow-lg hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/auth/registro">Empezar Gratis</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/auth/login">Iniciar Sesión</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-green-700" />
              <span className="font-bold text-slate-800">AgroIntelli</span>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AgroIntelli. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
