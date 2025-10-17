// /components/charts/CostComparisonBarChart.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Tipo definido localmente
interface CultivoCosto {
  cultivo: string;
  totalCosto: number;
}

interface Props {
  data: CultivoCosto[];
}

const COLORS = ['#4f46e5', '#60a5fa', '#34d399', '#fbbf24', '#ef4444', '#8b5cf6'];

export default function CostComparisonBarChart({ data }: Props) {
  const formatCurrency = (value: number): string =>
    `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          layout="vertical"
        >
          <XAxis
            type="number"
            domain={[0, 'dataMax + 10000']}
            tickFormatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <YAxis
            type="category"
            dataKey="cultivo"
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Costo']}
            labelFormatter={(label: string) => `Cultivo: ${label}`}
          />
          <Bar dataKey="totalCosto" name="Costo Total" animationDuration={800}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}