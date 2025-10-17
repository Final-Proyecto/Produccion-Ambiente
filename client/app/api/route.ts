// Tipos definidos localmente
interface CultivoCosto {
  cultivo: string;
  totalCosto: number;
}

interface TipoGasto {
  tipoCosto: string;
  totalGasto: number;
}

const API_PREFIX = 'http://localhost:4000/cultivos';

export async function fetchCostosPorCultivo(): Promise<CultivoCosto[]> {
  const res = await fetch(`${API_PREFIX}/costo-cultivos`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function fetchGastosPorTipo(): Promise<TipoGasto[]> {
  const res = await fetch(`${API_PREFIX}/gastos-por-tipo`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}