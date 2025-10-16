"use client";
import { styles } from "../../styles/registerstyle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Crear Cuenta</h1>

        <form onSubmit={handleRegister} style={styles.form}>
          <input type="text" placeholder="Nombre completo" style={styles.input} required />
          <input type="email" placeholder="Correo electrónico" style={styles.input} required />
          <input type="password" placeholder="Contraseña" style={styles.input} required />
          <button type="submit" style={styles.button}>
            Registrarse
          </button>
        </form>

        <p style={styles.text}>
          ¿Ya tenés cuenta?{" "}
          <Link href="/auth/login" style={styles.link}>
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
