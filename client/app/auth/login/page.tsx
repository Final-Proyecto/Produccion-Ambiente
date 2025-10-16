"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MapPin,
  BarChart3,
  Cloud,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/app/api/login";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginUser(formData);

      toast.success("¡Bienvenido de vuelta!", {
        description: result.message,
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/auth/home");
      }, 1500);
    } catch (error: any) {
      toast.error("Error al iniciar sesión", {
        description: error.message || "Credenciales incorrectas.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: MapPin,
      title: "Geolocalización en Tiempo Real",
      description: "Monitorea tu campo las 24 horas",
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzados",
      description: "Métricas detalladas de producción",
    },
    {
      icon: Cloud,
      title: "Pronóstico Inteligente",
      description: "Alertas climáticas precisas",
    },
  ];

  const stats = [
    { value: "500+", label: "Productores" },
    { value: "15k+", label: "Hectáreas" },
    { value: "98%", label: "Satisfacción" },
    { value: "24/7", label: "Soporte" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-emerald-400 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-cyan-400 rounded-full opacity-30"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full opacity-25"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors"
            >
              <Sprout className="text-white" size={24} />
            </motion.div>
            <span className="text-xl font-bold text-emerald-800">
              AgroSmart
            </span>
          </Link>
          <Link href="/auth/registro">
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              Crear Cuenta
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200 text-sm">
                    Bienvenido de vuelta
                  </Badge>
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Accede a tu{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    dashboard
                  </span>{" "}
                  agropecuario
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Continúa gestionando tu campo con las herramientas más
                  avanzadas del mercado
                </motion.p>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-4 gap-3"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center p-3 bg-white rounded-lg shadow-sm border border-emerald-50"
                  >
                    <div className="text-lg font-bold text-emerald-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="italic mb-2">
                      &quot;AgroSmart transformó completamente la gestión de mi
                      campo. Increíble plataforma!&quot;
                    </p>
                    <div className="text-sm font-semibold">
                      Carlos Rodríguez
                    </div>
                    <div className="text-xs opacity-80">
                      Productor Agropecuario
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Login Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex justify-center"
          >
            <Card className="w-full max-w-md border-2 border-emerald-100 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-8">
                <motion.div variants={itemVariants}>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sprout className="text-white" size={32} />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    Iniciar Sesión
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-gray-600">
                    Ingresa a tu cuenta para continuar
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contraseña
                      </Label>
                      <Link
                        href="/auth/recuperar"
                        className="text-xs text-emerald-600 hover:underline font-medium"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Recordarme
                      </Label>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 py-6 text-base font-semibold shadow-lg relative overflow-hidden"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Ingresar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
                <motion.div
                  variants={itemVariants}
                  className="text-center pt-4"
                >
                  <p className="text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link
                      href="/auth/registro"
                      className="text-emerald-600 hover:underline font-semibold transition-colors"
                    >
                      Regístrate aquí
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
