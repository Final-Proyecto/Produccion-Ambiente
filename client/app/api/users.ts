export interface UserProfile {
  nombre: string;
  email: string;
  rol: string;
}

const API_BASE_URL = "http://localhost:4000";

export async function getProfile(): Promise<UserProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "No estás autorizado.");
    }

    return data as UserProfile;
  } catch (error) {
    console.error("Error en getProfile:", error);
    throw error;
  }
}
