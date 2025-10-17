export enum CategoriaInventario {
  INSUMOS = "insumos",
  MAQUINAS = "maquinas",
  HERRAMIENTAS = "herramientas",
}

export interface CreateInventoryData {
  nombre: string;
  categoria: CategoriaInventario;
  cantidad: number;
  unidad: string;
  almacen: string;
}

export interface UpdateInventoryData {
  nombre?: string;
  cantidad?: number;
  unidad_medida?: string;
  almacen?: string;
}

export interface InventoryItem {
  id: number;
  nombre: string;
  categoria: CategoriaInventario;
  cantidad: number;
  unidad: string | null;
  almacen: string;
  updatedAt: string;
}

const API_BASE_URL = "http://localhost:4000";

export async function createInventory(data: CreateInventoryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al crear el ítem.");
    }

    return result;
  } catch (error) {
    console.error("Error en createInventory:", error);
    throw error;
  }
}

export async function getInventory(): Promise<InventoryItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      method: "GET",
      // Esencial para que la petición vaya autenticada con la cookie
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al obtener el inventario.");
    }

    return data;
  } catch (error) {
    console.error("Error en getInventory:", error);
    throw error;
  }
}

export async function updateInventory(id: number, data: UpdateInventoryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/update/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al actualizar el ítem.");
    }

    return result;
  } catch (error) {
    console.error("Error en updateInventory:", error);
    throw error;
  }
}

export async function getInventoryByCategory(
  categoria: CategoriaInventario
): Promise<InventoryItem[]> {
  try {
    // Usamos query params para enviar la categoría en una petición GET
    const res = await fetch(`${API_BASE_URL}/inventory/category`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Error al obtener el inventario por categoría."
      );
    }

    return data;
  } catch (error) {
    console.error("Error en getInventoryByCategory:", error);
    throw error;
  }
}

export async function deleteInventory(id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al eliminar el ítem.");
    }

    return result;
  } catch (error) {
    console.error("Error en deleteInventory:", error);
    throw error;
  }
}
