export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

const API_BASE_URL = "http://localhost:4000";

export async function registerUser(data: RegisterData) {
  try {
    //
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage = result.message || "Error al registrar el usuario";

      const finalMessage = Array.isArray(errorMessage)
        ? errorMessage.join(", ")
        : errorMessage;

      throw new Error(finalMessage);
    }
    return result;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}
