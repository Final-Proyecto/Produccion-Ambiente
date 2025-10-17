// /components/charts/CostComparisonBarChart.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CultivoCosto {
  cultivo: string;
  totalCosto: number;
}

interface Props {
  data: CultivoCosto[];
}

// Colores distintos por cultivo (ajústalos según tus necesidades)
const COLORS = [
  '#4f46e5', // indigo-600
  '#60a5fa', // sky-500
  '#34d399', // emerald-500
  '#fbbf24', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
];

export default function CostComparisonBarChart({ data }: Props) {
  // Formatea el valor como moneda
  const formatCurrency = (value: number): string =>
    `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Ordena los datos por costo (descendente)
  const sortedData = [...data].sort((a, b) => b.totalCosto - a.totalCosto);

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
          layout="vertical"
        >
          {/* Cuadrícula */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* Eje X (valores) */}
          <XAxis
            type="number"
            domain={[0, 'dataMax + 10000']}
            tickFormatter={(value: number) => `$${value.toLocaleString()}`}
            label={{
              value: 'Costo Total',
              position: 'middle',
              offset: 0,
            }}
            tick={{ fontSize: 14 }}
          />

          {/* Eje Y (nombres de cultivos) */}
          <YAxis
            type="category"
            dataKey="cultivo"
            width={120}
            tick={{ fontSize: 12 }}
            label={{
              value: 'Cultivo',
              angle: -90,
              position: 'middle',
              offset: 0,
            }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Costo']}
            labelFormatter={(label: string) => `Cultivo: ${label}`}
            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
          />

          {/* Barras */}
          <Bar dataKey="totalCosto" name="Costo Total" animationDuration={800}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}