import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generateColorsForCountries } from '@src/utils/countries.utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticPieChartProps {
  data: [string[], number[]];
}

export const StatisticPieChart: React.FC<StatisticPieChartProps> = ({ data }) => {
  const [countries, usersInCountries] = data;
  const [colorsWithOpacity, colorsWithoutOpacity] = useMemo(
    () => generateColorsForCountries(countries),
    [countries]
  );
  return (
    <Pie
      data={{
        labels: countries,
        datasets: [
          {
            label: '# of Users',
            data: usersInCountries,
            backgroundColor: colorsWithOpacity,
            borderColor: colorsWithoutOpacity,
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
