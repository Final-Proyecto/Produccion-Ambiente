"use client";
import { styles } from "../../styles/loginstyle";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/home"); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Iniciar Sesión</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input type="email" placeholder="Correo" style={styles.input} required />
          <input type="password" placeholder="Contraseña" style={styles.input} required />
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>

        <p style={styles.text}>
          ¿No tenés cuenta?{" "}
          <Link href="/auth/registro" style={styles.link}>
            Registrate acá
          </Link>
        </p>
      </div>
    </div>
  );
}
