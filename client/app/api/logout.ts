const API_BASE_URL = "http://localhost:4000";

export async function logoutUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al cerrar sesión");
    }

    return result;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
}
