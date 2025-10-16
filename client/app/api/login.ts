export interface LoginData {
  email: string;
  password: string;
}

const API_BASE_URL = "http://localhost:4000";
export async function loginUser(data: LoginData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage = result.message || "Error al iniciar sesión";
      throw new Error(errorMessage);
    }
    return result;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
