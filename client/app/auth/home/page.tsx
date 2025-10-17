"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Sprout,
  PlusCircle,
  User,
  MapPin,
  Droplets,
  Cloud,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  Leaf,
  Trees,
  Package,
  Warehouse,
  Scale,
  Hash,
} from "lucide-react";
import { logoutUser } from "@/app/api/logout";
import { getProfile, UserProfile } from "@/app/api/users";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InventoryForm } from "@/components/forms/InventoryForm";
import { getInventory, InventoryItem } from "@/app/api/inventory";
import RealTimeMap from "@/components/mapa/RealTimeMap";
import ChatPage from "@/components/chat/chat";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryLoading, setIsInventoryLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch {
        toast.error("Acceso denegado", {
          description: "Por favor, inicia sesión para continuar.",
        });
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const fetchInventory = async () => {
    try {
      setIsInventoryLoading(true);
      const inventoryData = await getInventory();
      setInventory(inventoryData);
    } catch (error) {
      toast.error("Error al cargar el inventario");
      console.error("Error fetching inventory:", error);
    } finally {
      setIsInventoryLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInventory();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("¡Sesión cerrada!", {
        description: "Has cerrado sesión exitosamente. ¡Vuelve pronto!",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error: unknown) {
      let message = "No se pudo cerrar la sesión.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      toast.error("Error", {
        description: message,
      });
    }
  };

  const handleInventorySuccess = () => {
    setIsDialogOpen(false);
    fetchInventory();
  };

  const getCategoryIcon = (categoria: string) => {
    type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
    const categoryIcons: Record<string, IconType> = {
      semillas: Sprout,
      fertilizantes: Leaf,
      herramientas: Package,
      maquinaria: Settings,
      default: Package,
    };

    const IconComponent: IconType =
      categoryIcons[categoria.toLowerCase()] || categoryIcons.default;
    return <IconComponent className="h-5 w-5" />;
  };

  const getCategoryColor = (categoria: string) => {
    const colorMap: { [key: string]: string } = {
      semillas: "bg-green-100 text-green-800 border-green-200",
      fertilizantes: "bg-blue-100 text-blue-800 border-blue-200",
      herramientas: "bg-orange-100 text-orange-800 border-orange-200",
      maquinaria: "bg-purple-100 text-purple-800 border-purple-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return colorMap[categoria.toLowerCase()] || colorMap.default;
  };

  // Datos de ejemplo para las tarjetas
  const statsCards = [
    {
      title: "Hectáreas Activas",
      value: "125",
      change: "+12%",
      trend: "up",
      icon: MapPin,
      color: "bg-blue-500",
      description: "Superficie total",
    },
    {
      title: "Humedad Promedio",
      value: "68%",
      change: "+5%",
      trend: "up",
      icon: Droplets,
      color: "bg-cyan-500",
      description: "Estado óptimo",
    },
    {
      title: "Temperatura",
      value: "24°C",
      change: "-2°C",
      trend: "down",
      icon: Cloud,
      color: "bg-sky-500",
      description: "Condición ideal",
    },
    {
      title: "Rendimiento",
      value: "92%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-emerald-500",
      description: "Eficiencia total",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center"
          >
            <Sprout className="text-white" size={32} />
          </motion.div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Cargando tu dashboard
            </h3>
            <p className="text-gray-600">Preparando todo para ti...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Sprout className="text-white" size={24} />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    AgroSmart
                  </h1>
                  <p className="text-sm text-gray-600">Panel de Control</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-emerald-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.nombre}
                    </p>
                    <p className="text-xs text-gray-500">Bienvenido</p>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-200">
                  <Leaf className="w-3 h-3 mr-1" />
                  Dashboard Principal
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900">
                  ¡Bienvenido de vuelta,{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    {user.nombre}
                  </span>
                  !
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  Aquí tienes un resumen de tu operación agropecuaria
                </p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Inventario
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] bg-white">
                  <InventoryForm onSuccess={handleInventorySuccess} />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            stat.trend === "up"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          <TrendingUp
                            className={`h-4 w-4 ${
                              stat.trend === "down" ? "rotate-180" : ""
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                      >
                        <stat.icon className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Inventory Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                📦 Inventario
              </h2>
              <p className="text-gray-600">
                Gestiona los productos y recursos de tu campo
              </p>
            </div>
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-emerald-600" size={20} />
                  Inventario Actual
                </CardTitle>
                <CardDescription>
                  Lista completa de productos almacenados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isInventoryLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : inventory.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No hay inventario
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Comienza agregando tu primer item al inventario.
                    </p>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Agregar Inventario
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px] bg-white">
                        <InventoryForm onSuccess={handleInventorySuccess} />
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -2, scale: 1.02 }}
                      >
                        <Card className="border border-gray-200 hover:border-emerald-200 transition-all duration-300 group cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                  {getCategoryIcon(item.categoria)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                    {item.nombre}
                                  </h3>
                                  <Badge
                                    variant="secondary"
                                    className={`mt-1 ${getCategoryColor(
                                      item.categoria
                                    )}`}
                                  >
                                    {item.categoria}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Hash className="h-4 w-4" />
                                  <span>Cantidad:</span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                  {item.cantidad}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Scale className="h-4 w-4" />
                                  <span>Unidad:</span>
                                </div>
                                <span className="font-medium text-gray-700 capitalize">
                                  {item.unidad}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Warehouse className="h-4 w-4" />
                                  <span>Almacén:</span>
                                </div>
                                <span className="font-medium text-gray-700">
                                  {item.almacen}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Map and Weather Section */}
          <div className="mb-12">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">🗺️ Monitoreo</h2>
              <p className="text-gray-600">
                Visualización en tiempo real y condiciones ambientales
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <RealTimeMap />

              {/* Recent Activity & Weather */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                {/* Weather Card */}
                <Card className="border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-lg">
                  <CardHeader className="pb-3 bg-sky-100/50">
                    <CardTitle className="flex items-center gap-2 text-sky-900">
                      <Cloud size={20} />
                      Clima Actual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-sky-600 mb-2">
                        24°C
                      </div>
                      <div className="text-sm text-sky-700 mb-1">
                        Parcialmente nublado
                      </div>
                      <div className="text-xs text-sky-600">
                        Humedad: 65% • Viento: 15 km/h
                      </div>
                      <Badge className="mt-3 bg-sky-100 text-sky-700 border-sky-200">
                        Condiciones óptimas
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications Card */}
                <Card className="border-2 border-amber-100 shadow-lg">
                  <CardHeader className="pb-3 bg-amber-50">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="text-amber-600" size={20} />
                      Alertas Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        type: "info",
                        message: "Riego programado para mañana",
                        time: "Hace 2h",
                      },
                      {
                        type: "warning",
                        message: "Revisar niveles de pH en sector B",
                        time: "Hace 5h",
                      },
                      {
                        type: "success",
                        message: "Cosecha completada exitosamente",
                        time: "Ayer",
                      },
                    ].map((alert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          alert.type === "warning"
                            ? "bg-amber-50 border-amber-200"
                            : alert.type === "success"
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            alert.type === "warning"
                              ? "bg-amber-500"
                              : alert.type === "success"
                              ? "bg-emerald-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <Trees className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">
                  ¿Listo para optimizar tu producción?
                </h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Descubre todas las herramientas avanzadas que AgroSmart tiene
                  para ofrecerte. Monitorea, analiza y mejora tu rendimiento
                  como nunca antes.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button variant="secondary" size="lg">
                    Explorar Características
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white hover:bg-white/20 border-white"
                    size="lg"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configurar Campo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <ChatPage />
      </div>
    );
  }
  return null;
}
