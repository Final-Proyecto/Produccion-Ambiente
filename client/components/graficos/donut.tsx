// /components/charts/ExpenseDonutChart.tsx
'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

interface TipoGasto {
  tipoCosto: string;
  totalGasto: number;
}

interface Props {
  data: TipoGasto[];
}

// Colores consistentes con el gráfico de barras
const COLORS = ['#4f46e5', '#60a5fa', '#34d399', '#fbbf24', '#ef4444', '#8b5cf6'];

export default function ExpenseDonutChart({ data }: Props) {
  // Formatea el valor como moneda
  const formatCurrency = (value: number): string =>
    `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Formatea la etiqueta permanente
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    value,
  }: PieLabelRenderProps) => {
    if (
      typeof cx !== 'number' ||
      typeof cy !== 'number' ||
      typeof midAngle !== 'number' ||
      typeof innerRadius !== 'number' ||
      typeof outerRadius !== 'number' ||
      typeof percent !== 'number' ||
      typeof name !== 'string' ||
      typeof value !== 'number'
    ) {
      return null;
    }

    // Coordenadas para la etiqueta (más lejos del centro)
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Alineación dinámica
    const textAnchor = x > cx ? 'start' : 'end';

    return (
      <g>
        {/* Línea guía */}
        <line
          x1={cx + outerRadius * Math.cos(-midAngle * (Math.PI / 180))}
          y1={cy + outerRadius * Math.sin(-midAngle * (Math.PI / 180))}
          x2={x}
          y2={y}
          stroke="#ccc"
          strokeWidth={1}
        />
        {/* Etiqueta con nombre, valor y porcentaje */}
        <text
          x={x}
          y={y}
          fill="#333"
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize="12px"
          fontWeight="500"
        >
          <tspan x={x} dy="-0.6em">{name}</tspan>
          <tspan x={x} dy="1.4em" fontWeight="400">
            {formatCurrency(value)} ({(percent * 100).toFixed(1)}%)
          </tspan>
        </text>
      </g>
    );
  };

  // Datos formateados para Recharts
  const formattedData = data.map(item => ({
    name: item.tipoCosto,
    value: item.totalGasto,
  }));

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false} // Usamos líneas personalizadas
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            animationBegin={200}
            animationDuration={800}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Monto']}
            labelFormatter={(label: string) => `Tipo: ${label}`}
          />
          {/* Leyenda debajo del gráfico */}
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}