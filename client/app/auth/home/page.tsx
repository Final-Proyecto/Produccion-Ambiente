"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut, Sprout } from "lucide-react";
import { logoutUser } from "@/app/api/logout";
import { getProfile, UserProfile } from "@/app/api/users";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg">Verificando sesión...</span>
        </div>
      </div>
    );
  }
  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="border-b border-gray-700">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sprout className="text-emerald-400" size={24} />
              <span className="text-xl font-bold">AgroSmart</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hola, {user.nombre}</span>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in-down">
            ¡Bienvenido, {user.nombre}!
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Estás en el panel principal de AgroSmart.
          </p>
          <div className="mt-12 p-8 border-2 border-dashed border-gray-700 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-200">
              Tu Dashboard
            </h2>
            <p className="mt-2 text-gray-500">
              Aquí irá el contenido principal de tu aplicación.
            </p>
          </div>
        </main>
      </div>
    );
  }
  return null;
}
