"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  createInventory,
  CategoriaInventario,
  CreateInventoryData,
} from "@/app/api/inventory";

interface InventoryFormProps {
  onSuccess?: () => void;
}

export function InventoryForm({ onSuccess }: InventoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateInventoryData>({
    nombre: "",
    categoria: CategoriaInventario.INSUMOS,
    cantidad: 0,
    unidad_medida: "",
    almacen: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: CategoriaInventario) => {
    setFormData((prev) => ({ ...prev, categoria: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createInventory(formData);
      toast.success("¡Ítem Creado!", { description: result.message });

      // Limpiamos el formulario
      setFormData({
        nombre: "",
        categoria: CategoriaInventario.INSUMOS,
        cantidad: 0,
        unidad_medida: "",
        almacen: "",
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error("Error al crear", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <PlusCircle className="text-emerald-600" />
          Añadir Nuevo Ítem al Inventario
        </DialogTitle>
        <DialogDescription>
          Completa los detalles del nuevo producto, herramienta o insumo.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría</Label>
          <Select onValueChange={handleSelectChange} value={formData.categoria}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CategoriaInventario.INSUMOS}>
                Insumos
              </SelectItem>
              <SelectItem value={CategoriaInventario.MAQUINAS}>
                Máquinas
              </SelectItem>
              <SelectItem value={CategoriaInventario.HERRAMIENTAS}>
                Herramientas
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input
            id="cantidad"
            type="number"
            value={formData.cantidad}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unidad_medida">Unidad</Label>
          <Input
            id="unidad_medida"
            value={formData.unidad_medida}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="almacen">Almacén</Label>
          <Input
            id="almacen"
            value={formData.almacen}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="md:col-span-2 text-right mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Guardando..." : "Añadir al Inventario"}
          </Button>
        </div>
      </form>
    </>
  );
}
