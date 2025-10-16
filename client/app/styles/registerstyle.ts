export const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f4ea",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center" as const,
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#166534",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "0.75rem",
  },
  button: {
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center" as const,
    marginTop: "1rem",
    color: "#333",
  },
  link: {
    color: "#16a34a",
    textDecoration: "underline",
  },
};
