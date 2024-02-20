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
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
      formatter(v: number) {
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
          formatter() {
            return '';
          },
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: 5,
        style: {
          cssClass: 'text-sm',
        },
      },
    },

    xaxis: {
      categories: labels,
      title: {
        text: 'Time worked (h)',
        style: { cssClass: 'text-base' },
      },

      labels: {
        show: true,
        style: {
          cssClass: 'text-sm',
        },
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
