import React, { useEffect, useState } from 'react';
import type { Props as ApexProps } from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

import { secondToHours } from '@/utils';

interface Props {
  data: any;
}

const buildState = (
  data: any[] = [],
  colors: any[] = [],
  labels: any[] = []
): ApexProps => ({
  series: [
    {
      data,
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 550,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
      },
    },
    legend: {
      show: false,
    },
    colors,
    dataLabels: {
      enabled: false,
      textAnchor: 'end',
      offsetX: 0,
      offsetY: 0,
      formatter(v) {
        return `${v.toFixed(0)} h`;
      },
      dropShadow: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      y: {
        formatter(val) {
          return `${val.toFixed(0)} hours worked`;
        },
        title: {
          formatter(s) {
            return '';
          },
        },
      },
    },

    xaxis: {
      categories: labels,
      title: { text: 'Time worked (h)' },

      labels: {
        show: true,
        formatter(value: any) {
          return `${value} h`;
        },
      },
    },
  },
});

export default function LanguageChart(props: Props) {
  const [state, setState] = useState<ApexProps>(buildState());

  const Apex: any = ReactApexChart as any;

  useEffect(() => {
    const data = [];
    const labels = [];
    const colors = [];
    for (const v of props.data) {
      data.push(secondToHours(v.value));
      labels.push(v.name);
      colors.push(v.color);
    }
    const newState = buildState(data, colors, labels);
    setState(newState);
  }, [props.data]);

  return (
    <div id="chart">
      <Apex
        options={state.options}
        series={state.series}
        type="bar"
        height={550}
      />
    </div>
  );
}
