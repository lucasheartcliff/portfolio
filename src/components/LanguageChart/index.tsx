import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import type { Props as ApexProps } from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

import { secondToHours } from '@/utils';

interface Props {
  data: any;
}

const normalizeData = (value: number) => Math.log(value);
const displayNormalizedData = (value: number) => Math.exp(value);

const buildState = (
  data: any[] = [],
  colors: any[] = [],
  labels: any[] = [],
  messages: { [k: string]: string } = {}
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
      height: 600,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: '90%',
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    legend: {
      show: false,
    },
    colors,
    dataLabels: {
      enabled: false,

      style: {
        fontSize: '16px',
      },
      formatter(value, { seriesIndex, dataPointIndex, w }) {
        const barValue = w.globals.series[seriesIndex][dataPointIndex];
        return `${displayNormalizedData(barValue)?.toFixed(0)} h`;
      },
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      style: {
        fontSize: '16px',
      },
      y: {
        formatter(val) {
          return `${displayNormalizedData(val).toFixed(0)} ${messages.hoursWorked
            }`;
        },
        title: {
          formatter() {
            return '';
          },
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        minWidth: 75,
        offsetX: 7,
        style: {
          cssClass: 'text-base md:text-xl mr-5',
        },
      },
    },

    xaxis: {
      categories: labels,
      offsetX: 10,
      title: {
        offsetY: 10,
        text: `${messages.timeWorked} (h)`,
        style: { cssClass: 'text-base md:text-xl' },
      },

      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        style: {
          cssClass: 'text-base md:text-xl',
        },
        formatter(value: any) {
          return `${displayNormalizedData(value).toFixed(0)} h`;
        },
      },
    },
  },
});

export default function LanguageChart(props: Props) {
  const [state, setState] = useState<ApexProps>(buildState());
  const router = useRouter();
  const { locale } = router.query;
  const { t } = useTranslation('common');

  const Apex: any = ReactApexChart as any;

  useEffect(() => {
    const data = [];
    const labels = [];
    const colors = [];
    const messages = {
      timeWorked: t('Time worked'),
      hoursWorked: t('hours worked'),
    };

    for (const v of props.data) {
      const d = secondToHours(v.value);
      data.push(normalizeData(d));
      labels.push(v.name);
      colors.push(v.color);
    }
    console.log(data, labels);
    const newState = buildState(data, colors, labels, messages);
    setState(newState);
  }, [props.data, locale]);

  return (
    <div id="chart">
      <Apex
        options={state.options}
        series={state.series}
        type="bar"
        height={600}
      />
    </div>
  );
}
