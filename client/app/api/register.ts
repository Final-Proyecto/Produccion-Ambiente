// app/api/register.ts
export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await fetch("la url de anto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al registrar usuario");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}

