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
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Building,
  MapPin,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { registerUser } from "../../api/register";

// ✅ Tipos
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex justify-center w-full"
          >
            <Card className="w-full max-w-md border-2 border-emerald-100 shadow-2xl bg-white/80 backdrop-blur-sm flex flex-col">
              <CardHeader className="text-center space-y-4 pb-6">
                <motion.div variants={itemVariants}>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sprout className="text-white" size={32} />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-2">
                    <Leaf className="w-3 h-3 mr-1" />
                    Comienza Ahora
                  </Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    Crear Cuenta
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-gray-600 text-base">
                    Únete a la revolución agropecuaria
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-5 flex-grow">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Nombre */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="nombre"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="nombre"
                        placeholder="Juan Pérez"
                        className="pl-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.nombre}
                        onChange={(e) =>
                          handleInputChange("nombre", e.target.value)
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
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

                  {/* Contraseña */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </Label>
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

                  {/* Nombre de la Empresa */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="nombreEmpresa"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nombre de tu Establecimiento
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="nombreEmpresa"
                        placeholder="Estancia Los Pinares"
                        className="pl-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.nombreEmpresa}
                        onChange={(e) =>
                          handleInputChange("nombreEmpresa", e.target.value)
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Superficie */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="superficie"
                      className="text-sm font-medium text-gray-700"
                    >
                      Superficie (Hectáreas)
                    </Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="superficie"
                        type="text"
                        placeholder="150.5"
                        className="pl-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.superficie}
                        onChange={(e) =>
                          handleInputChange("superficie", e.target.value)
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Ubicación */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="ubicacion"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ubicación
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="ubicacion"
                        placeholder="Córdoba, Argentina"
                        className="pl-10 border-emerald-200 focus:border-emerald-500 h-11"
                        value={formData.ubicacion}
                        onChange={(e) =>
                          handleInputChange("ubicacion", e.target.value)
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Botón de Registro */}
                  <motion.div variants={itemVariants} className="pt-2">
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
                          Crear Cuenta
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
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      href="/auth/login"
                      className="text-emerald-600 hover:underline font-semibold transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Image and Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col justify-between space-y-8 flex-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
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

              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full opacity-50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg w-full max-w-md flex-grow flex flex-col"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">
                Beneficios de unirte
              </h3>
              <div className="space-y-3 flex-grow">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-600 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 w-full max-w-md"
            >
              <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-emerald-50">
                <div className="text-lg font-bold text-emerald-600">500+</div>
                <div className="text-xs text-gray-600">Productores</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-emerald-50">
                <div className="text-lg font-bold text-emerald-600">15k+</div>
                <div className="text-xs text-gray-600">Hectáreas</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-emerald-50">
                <div className="text-lg font-bold text-emerald-600">98%</div>
                <div className="text-xs text-gray-600">Satisfacción</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden space-y-6 mt-8"
          >
            <Card className="bg-white/70 backdrop-blur-sm border-emerald-100">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">
                  Beneficios de unirte
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-emerald-600 flex-shrink-0"
                      />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}