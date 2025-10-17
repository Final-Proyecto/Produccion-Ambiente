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
  Coins,
  Clock,
  Zap,
  Target,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="w-full border border-emerald-300/60 bg-white/40 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-emerald-200/30">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <Sprout className="h-8 w-8 text-emerald-700 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              AgroIntelli
            </span>
          </Link>

          {/* Navegación para Desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 transition-all duration-300 hover:text-emerald-600 hover:scale-105 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Botones de Autenticación para Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-300"
              asChild
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/auth/registro">Registrarse</Link>
            </Button>
          </div>

          {/* Menú para Móvil */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/60 border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white/90 backdrop-blur-2xl border-l border-emerald-200"
              >
                <div className="flex flex-col space-y-8 pt-12">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-slate-700 hover:text-emerald-600 transition-all duration-300 py-2 border-b border-emerald-100"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="border-t border-emerald-200 pt-6 space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-emerald-300 text-slate-700 hover:bg-emerald-50 transition-all duration-300"
                      asChild
                    >
                      <SheetClose asChild>
                        <Link href="/auth/login">Iniciar Sesión</Link>
                      </SheetClose>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg transition-all duration-300"
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
      "01d": <Sun className="h-16 w-16 text-amber-400" />,
      "01n": <Sun className="h-16 w-16 text-blue-300" />,
      "02d": <CloudSun className="h-16 w-16 text-amber-400" />,
      "02n": <CloudSun className="h-16 w-16 text-blue-300" />,
      "03d": <Cloud className="h-16 w-16 text-slate-400" />,
      "03n": <Cloud className="h-16 w-16 text-slate-400" />,
      "04d": <Cloud className="h-16 w-16 text-slate-500" />,
      "04n": <Cloud className="h-16 w-16 text-slate-500" />,
      "09d": <CloudDrizzle className="h-16 w-16 text-blue-400" />,
      "09n": <CloudDrizzle className="h-16 w-16 text-blue-400" />,
      "10d": <CloudRain className="h-16 w-16 text-blue-500" />,
      "10n": <CloudRain className="h-16 w-16 text-blue-500" />,
      "11d": <CloudRain className="h-16 w-16 text-purple-500" />,
      "11n": <CloudRain className="h-16 w-16 text-purple-500" />,
      "13d": <CloudSnow className="h-16 w-16 text-cyan-200" />,
      "13n": <CloudSnow className="h-16 w-16 text-cyan-200" />,
      "50d": <CloudFog className="h-16 w-16 text-slate-400" />,
      "50n": <CloudFog className="h-16 w-16 text-slate-400" />,
    };

    return iconMap[iconCode] || <Cloud className="h-16 w-16 text-slate-400" />;
  };

  // Función para obtener el color de fondo según el clima
  const getWeatherBackground = (iconCode: string) => {
    if (iconCode.startsWith("01")) return "from-amber-50 to-emerald-50";
    if (iconCode.startsWith("02")) return "from-sky-50 to-emerald-50";
    if (iconCode.startsWith("09") || iconCode.startsWith("10"))
      return "from-blue-50 to-emerald-50";
    if (iconCode.startsWith("11")) return "from-purple-50 to-emerald-50";
    if (iconCode.startsWith("13")) return "from-cyan-50 to-emerald-50";
    return "from-slate-50 to-emerald-50";
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
      title: "Riego Inteligente",
      description:
        "Optimiza el uso del agua con sensores que miden la humedad del suelo en tiempo real.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Rendimiento",
      description:
        "Visualiza datos clave de tu cosecha para tomar decisiones informadas y aumentar la productividad.",
      color: "from-emerald-400 to-green-400",
    },
    {
      icon: Shield,
      title: "Protección de Cultivos",
      description:
        "Recibe alertas tempranas sobre plagas y condiciones climáticas adversas para proteger tu inversión.",
      color: "from-amber-400 to-orange-400",
    },
    {
      icon: Target,
      title: "Precisión Agrícola",
      description:
        "Tecnología de punta para maximizar el rendimiento de cada hectárea de tu campo.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Coins,
      title: "Optimización de Costos",
      description:
        "Reduce gastos innecesarios y maximiza tu rentabilidad con análisis inteligente.",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Zap,
      title: "Alertas en Tiempo Real",
      description:
        "Notificaciones instantáneas sobre cambios climáticos y condiciones del suelo.",
      color: "from-orange-400 to-red-400",
    },
  ];

  const benefits = [
    { icon: Droplets, text: "Reduce hasta un 35% el consumo de agua." },
    { icon: TrendingUp, text: "Aumenta la productividad de tus cultivos." },
    { icon: Target, text: "Toma decisiones basadas en datos precisos." },
    { icon: Shield, text: "Recibe alertas para prevenir pérdidas." },
    { icon: Coins, text: "Optimiza costos y maximiza ganancias." },
    { icon: Clock, text: "Ahorra tiempo con automatización inteligente." },
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      farm: "Estancia La Primavera",
      testimonial:
        "Increíble cómo optimizamos el riego. Pasé de 12 horas diarias a 6, con mejores resultados.",
      stars: 5,
      avatar: "👨‍🌾",
    },
    {
      name: "María González",
      farm: "Campo Los Algarrobos",
      testimonial:
        "Las alertas climáticas me salvaron la cosecha. Pude proteger todo a tiempo antes de la tormenta.",
      stars: 5,
      avatar: "👩‍🌾",
    },
    {
      name: "José Martínez",
      farm: "Granja San José",
      testimonial:
        "La app es muy fácil de usar. A mis 65 años, hasta yo puedo manejar la tecnología sin problemas.",
      stars: 4,
      avatar: "🧑‍🌾",
    },
  ];

  const stats = [
    { number: "35%", label: "Ahorro de Agua", icon: Droplets },
    { number: "50%", label: "Más Eficiencia", icon: TrendingUp },
    { number: "24/7", label: "Monitoreo", icon: Clock },
    { number: "99%", label: "Satisfacción", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-cyan-50 text-slate-800 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-15"></div>

      <Header />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-[80vh] pb-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <Card className="border-0 bg-white/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl relative">
                {/* Efecto de gradiente en el borde */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-amber-400/20 rounded-3xl blur-xl opacity-50"></div>

                <CardContent className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 relative z-10">
                  {/* Texto */}
                  <div className="text-center lg:text-left flex-1">
                    <Badge className="mb-6 border-emerald-300/60 bg-gradient-to-r from-emerald-400/20 to-green-400/20 text-emerald-800 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                      🌟 Tecnología para el Campo Argentino
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                      Agricultura{" "}
                      <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                        Inteligente
                      </span>{" "}
                      para{" "}
                      <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                        Formosa
                      </span>
                    </h1>
                    <p className="mt-6 text-xl leading-9 text-slate-700 max-w-2xl">
                      Monitorea tu campo en tiempo real, optimiza recursos y
                      aumenta tu productividad con nuestra plataforma diseñada
                      para el agricultor moderno.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-2xl shadow-emerald-200 hover:shadow-3xl hover:shadow-emerald-300 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-2xl"
                        asChild
                      >
                        <Link href="/auth/registro">
                          Comenzar Ahora <ArrowRight className="ml-3 h-6 w-6" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-emerald-300 bg-white/60 backdrop-blur-sm text-slate-800 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-2xl"
                        asChild
                      >
                        <Link href="#features">Ver Características</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Imagen */}
                  <div className="flex-shrink-0 relative">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-white to-emerald-50/80 rounded-2xl p-8 shadow-2xl border border-emerald-200/50">
                        <Image
                          src="/agricultor2.png"
                          alt="Agricultor moderno con tecnología"
                          width={400}
                          height={400}
                          className="h-auto w-full max-w-[280px] lg:max-w-[320px] animate-float"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center border-0 bg-white/40 backdrop-blur-xl shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Section */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <Card
              className={`mx-auto max-w-4xl border-2 overflow-hidden shadow-2xl backdrop-blur-xl rounded-3xl ${
                weather
                  ? "border-emerald-300/60 bg-white/40"
                  : "border-slate-200 bg-white/40"
              } transition-all duration-500 hover:shadow-3xl`}
            >
              <div
                className={`bg-gradient-to-br ${
                  weather
                    ? getWeatherBackground(weather.icon)
                    : "from-emerald-50 to-amber-50"
                } p-1`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl text-slate-800">
                    <div className="p-2 bg-white/60 rounded-2xl backdrop-blur-sm">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Clima Actual en Formosa Capital
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  {isLoadingWeather ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                      <p className="mt-4 text-lg text-slate-600 font-medium">
                        Cargando información del clima...
                      </p>
                    </div>
                  ) : weather ? (
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Temperatura Principal */}
                      <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="flex items-center justify-center">
                          {getWeatherIcon(weather.icon)}
                        </div>
                        <div className="text-center">
                          <div className="text-7xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            {weather.temp}°C
                          </div>
                          <p className="text-2xl text-slate-700 capitalize mt-3 font-semibold">
                            {weather.description}
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-3 text-slate-600">
                            <Thermometer className="h-5 w-5" />
                            <span className="text-base font-medium">
                              Sensación térmica: {weather.feels_like}°C
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detalles del Clima */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50 rounded-2xl">
                          <CardContent className="pt-6 text-center">
                            <Droplets className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                            <p className="text-3xl font-bold text-slate-900">
                              {weather.humidity}%
                            </p>
                            <p className="text-sm text-slate-600 mt-1 font-medium">
                              Humedad
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50 rounded-2xl">
                          <CardContent className="pt-6 text-center">
                            <Wind className="h-10 w-10 text-sky-500 mx-auto mb-3" />
                            <p className="text-3xl font-bold text-slate-900">
                              {weather.wind_speed}
                            </p>
                            <p className="text-sm text-slate-600 mt-1 font-medium">
                              km/h Viento
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50 rounded-2xl col-span-2">
                          <CardContent className="pt-6 text-center">
                            <Badge
                              className={`text-base px-6 py-3 rounded-xl border-2 ${
                                weather.temp >= 15 && weather.temp <= 30
                                  ? "bg-emerald-100/80 text-emerald-800 border-emerald-300/60"
                                  : "bg-amber-100/80 text-amber-800 border-amber-300/60"
                              } backdrop-blur-sm font-semibold`}
                            >
                              {weather.temp >= 15 && weather.temp <= 30 ? (
                                <>
                                  <Check className="w-5 h-5 mr-2 inline" />✅
                                  Condiciones óptimas para cultivo
                                </>
                              ) : (
                                <>
                                  <Thermometer className="w-5 h-5 mr-2 inline" />
                                  ⚠️ Monitorear condiciones de temperatura
                                </>
                              )}
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Cloud className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 text-lg font-medium">
                        No se pudo cargar el clima
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-emerald-300 bg-white/60 backdrop-blur-sm hover:scale-105 transition-all duration-300"
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

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-gradient-to-b from-white/50 to-transparent"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 border-emerald-300/60 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 text-emerald-800 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                🚀 Características Principales
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Todo lo que{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  necesitás
                </span>
              </h2>
              <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                Herramientas innovadoras diseñadas específicamente para
                potenciar tu campo y maximizar tu producción.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="border-2 border-emerald-200/50 bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 group"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${feature.color}`}
                  ></div>
                  <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-slate-600 leading-7">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-emerald-50/50 to-cyan-50/50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-8 border-2 border-emerald-200/50 shadow-2xl">
                    <Image
                      src="/agricultor2.png"
                      alt="Agricultor feliz"
                      width={600}
                      height={600}
                      className="h-auto w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Badge className="mb-4 border-amber-300/60 bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-800 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                  💫 Beneficios Comprobados
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Transformá tu campo con{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    resultados reales
                  </span>
                </h2>
                <p className="mt-4 text-xl text-slate-600 leading-9">
                  Nuestros clientes ya están viendo cambios significativos en su
                  productividad, eficiencia y rentabilidad. Unite a la
                  revolución agrícola inteligente.
                </p>
                <ul className="mt-10 space-y-6">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-lg text-slate-700 font-medium pt-2 group-hover:text-slate-900 transition-colors duration-300">
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-gradient-to-b from-white/50 to-emerald-50/30"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 border-purple-300/60 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-800 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                🌟 Testimonios Reales
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Lo que dicen{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  nuestros agricultores
                </span>
              </h2>
              <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                Historias reales de éxito y transformación en campos de Formosa
                y toda la región.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <Card
                  key={i}
                  className="flex flex-col justify-between border-2 border-emerald-200/50 bg-white/40 backdrop-blur-xl rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-500 group"
                >
                  <CardContent className="pt-8">
                    <div className="flex justify-center mb-4">
                      <div className="text-4xl">{testimonial.avatar}</div>
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-6 w-6 ${
                            j < testimonial.stars
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-slate-700 text-lg leading-8 text-center italic group-hover:text-slate-800 transition-colors duration-300">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </blockquote>
                  </CardContent>
                  <CardHeader className="text-center border-t border-emerald-100/50 pt-6">
                    <div className="font-bold text-slate-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {testimonial.farm}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-cyan-500 px-8 py-20 text-center shadow-2xl sm:px-16 backdrop-blur-2xl border-2 border-emerald-300/50">
              {/* Elementos decorativos */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
              </div>

              <div className="relative">
                <Badge className="mb-6 border-white/30 bg-white/20 text-white backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                  🚀 Comienza Hoy
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  ¿Listo para transformar tu campo?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-emerald-100 leading-9">
                  Unite a cientos de agricultores que ya optimizan su producción
                  con tecnología inteligente y están viendo resultados
                  extraordinarios.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg px-10 py-6 rounded-2xl font-semibold"
                    asChild
                  >
                    <Link href="/auth/registro">Comenzar Gratis</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg px-10 py-6 rounded-2xl font-semibold backdrop-blur-sm"
                    asChild
                  >
                    <Link href="/auth/login">Iniciar Sesión</Link>
                  </Button>
                </div>
                <p className="mt-8 text-sm text-emerald-200">
                  ✅ Sin compromisos • Prueba gratuita • Soporte 24/7
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-200/50 bg-white/40 backdrop-blur-2xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl shadow-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                AgroIntelli
              </span>
            </div>
            <p className="text-sm text-slate-600 text-center md:text-left">
              &copy; {new Date().getFullYear()} AgroIntelli. Todos los derechos
              reservados.
              <span className="block mt-1 text-emerald-600 font-medium">
                Cultivando el futuro de la agricultura.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
