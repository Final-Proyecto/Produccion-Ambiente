"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { registerUser } from "../../api/register";
import Link from "next/link";

interface RegisterFormData {
  nombre: string;
  email: string;
  password: string;
  nombreEmpresa: string;
  superficie: string;
  ubicacion: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: "",
    email: "",
    password: "",
    nombreEmpresa: "",
    superficie: "",
    ubicacion: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación: todos los campos obligatorios
    const hasEmptyField = Object.values(formData).some((val) => !val.trim());
    if (hasEmptyField) {
      toast.error("Completa todos los campos", {
        description: "Por favor, ingresa todos los datos solicitados.",
      });
      setIsLoading(false);
      return;
    }

    // Validar que superficie sea un número válido
    const superficieNum = parseFloat(formData.superficie);
    if (isNaN(superficieNum) || superficieNum <= 0) {
      toast.error("Superficie inválida", {
        description: "Ingresa un número válido mayor a 0 para la superficie.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await registerUser(formData);

      // ✅ Guardamos el nombre del establecimiento en localStorage
      localStorage.setItem("nombre_empresa", formData.nombreEmpresa);

      toast.success("¡Cuenta Creada!", {
        description: result?.message || "Tu registro fue exitoso.",
        duration: 3000,
      });
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error) {
      let errorMessage = "No se pudo completar el registro.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error("Error en el Registro", {
        description: errorMessage,
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

  const benefits = [
    "Gestión inteligente de cultivos",
    "Monitoreo en tiempo real",
    "Alertas meteorológicas",
    "Soporte 24/7",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-[5%] w-3 h-3 bg-emerald-400 rounded-full opacity-20 md:opacity-30"
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
        className="absolute top-1/3 right-[10%] w-4 h-4 bg-green-400 rounded-full opacity-25 md:opacity-35"
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
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-sm"
            >
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {" "}
          {/* Alineado al centro */}
          {/* Columna Izquierda - Bienvenida + Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="relative w-80 h-80">
              <Image
                src="/arbol.png"
                alt="Árbol 3D AgroSmart"
                width={320}
                height={320}
                className="w-full h-full object-contain rounded-3xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-3xl"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
                Bienvenido al Futuro de la Agricultura
              </h1>
              <p className="text-gray-600 text-lg">
                Regístrate ahora y empieza a gestionar tu campo con tecnología
                inteligente.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {benefits.slice(0, 2).map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700"
                  >
                    <CheckCircle2 size={14} />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Columna Derecha - Formulario Compacto */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full"
          >
            <Card className="w-full max-w-lg border-2 border-emerald-100 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2 pb-4">
                <motion.div variants={itemVariants}>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Sprout className="text-white" size={24} />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-1">
                    <Leaf className="w-3 h-3 mr-1" />
                    Comienza Ahora
                  </Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    Regístrate como Productor
                  </CardTitle>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <motion.div variants={itemVariants} className="space-y-1">
                      <Label
                        htmlFor="nombre"
                        className="text-xs font-medium text-gray-700"
                      >
                        Nombre Completo
                      </Label>
                      <Input
                        id="nombre"
                        placeholder="Juan Pérez"
                        className="border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                        value={formData.nombre}
                        onChange={(e) =>
                          handleInputChange("nombre", e.target.value)
                        }
                        required
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="space-y-1">
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium text-gray-700"
                      >
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </motion.div>

                    {/* Contraseña */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-1 md:col-span-2"
                    >
                      <Label
                        htmlFor="password"
                        className="text-xs font-medium text-gray-700"
                      >
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10 border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </motion.div>

                    {/* Nombre de la Empresa */}
                    <motion.div variants={itemVariants} className="space-y-1">
                      <Label
                        htmlFor="nombreEmpresa"
                        className="text-xs font-medium text-gray-700"
                      >
                        Nombre del Establecimiento
                      </Label>
                      <Input
                        id="nombreEmpresa"
                        placeholder="Estancia Los Pinares"
                        className="border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                        value={formData.nombreEmpresa}
                        onChange={(e) =>
                          handleInputChange("nombreEmpresa", e.target.value)
                        }
                        required
                      />
                    </motion.div>

                    {/* Superficie */}
                    <motion.div variants={itemVariants} className="space-y-1">
                      <Label
                        htmlFor="superficie"
                        className="text-xs font-medium text-gray-700"
                      >
                        Superficie (Hectáreas)
                      </Label>
                      <Input
                        id="superficie"
                        type="text"
                        placeholder="150.5"
                        className="border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                        value={formData.superficie}
                        onChange={(e) =>
                          handleInputChange("superficie", e.target.value)
                        }
                        required
                      />
                    </motion.div>

                    {/* Ubicación */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-1 md:col-span-2"
                    >
                      <Label
                        htmlFor="ubicacion"
                        className="text-xs font-medium text-gray-700"
                      >
                        Ubicación
                      </Label>
                      <Input
                        id="ubicacion"
                        placeholder="Córdoba, Argentina"
                        className="border-emerald-200 focus:border-emerald-500 h-9 text-sm"
                        value={formData.ubicacion}
                        onChange={(e) =>
                          handleInputChange("ubicacion", e.target.value)
                        }
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Botón de Registro */}
                  <motion.div variants={itemVariants} className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 py-2 text-sm font-semibold shadow-lg"
                      size="default"
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
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Crear Cuenta
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
