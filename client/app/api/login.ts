// app/api/login.ts
export interface LoginData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginData) {
  try {
    const res = await fetch("la url de anto ,no te olvides jaja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
