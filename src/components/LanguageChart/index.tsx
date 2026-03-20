import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useState } from 'react';
import type { Props as ApexProps } from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

import { DarkModeContext } from '@/pages/_app';
import { secondToHours } from '@/utils';

interface Props {
  data: any;
}

const normalizeData = (value: number) => Math.log(value);
const displayNormalizedData = (value: number) => Math.exp(value);

const getContrastColor = (hex: string): string => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

const buildState = (
  data: any[] = [],
  colors: any[] = [],
  labels: any[] = [],
  messages: { [k: string]: string } = {},
  isDark: boolean = false
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
    theme: {
      mode: isDark ? 'dark' : 'light',
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
          return `${displayNormalizedData(val).toFixed(0)} ${
            messages.hoursWorked
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
          colors: isDark ? '#e5e7eb' : '#374151',
        },
      },
    },

    xaxis: {
      categories: labels,
      offsetX: 10,
      title: {
        text: `${messages.timeWorked} (h)`,
        offsetY: 15,
        style: {
          cssClass: 'text-sm md:text-base',
          color: isDark ? '#f3f4f6' : '#111827',
        },
      },
      labels: {
        show: true,
        hideOverlappingLabels: true,
        trim: true,
        maxHeight: 60,
        style: {
          cssClass: 'text-[9px] md:text-[10px]',
          colors: isDark ? '#e5e7eb' : '#374151',
          fontSize: '9px',
        },
        formatter(value: any) {
          return `${displayNormalizedData(value).toFixed(0)} h`;
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      tickAmount: 5,
    },
  },
});

export default function LanguageChart(props: Props) {
  const { isDark } = useContext(DarkModeContext);
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
      timeWorked: t('Experience time'),
      hoursWorked: 'h',
    };

    for (const v of props.data) {
      const d = secondToHours(v.value);
      data.push(normalizeData(d));
      labels.push(v.name);
      colors.push(v.color);
    }
    const newState = buildState(data, colors, labels, messages, isDark);
    setState(newState);
  }, [props.data, locale, isDark]);

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
