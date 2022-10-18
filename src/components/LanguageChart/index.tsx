import React, { useEffect, useState } from "react";
import ReactApexChart, { Props as ApexProps } from "react-apexcharts";

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
      type: "bar",
      height: 550,
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        dataLabels: {
          maxItems: -1,
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
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        show: false,
        formatter: function (value: string) {
          return `${value}%`;
        },
      },
    },
  },
});

export default function LanguageChart(props: Props) {
  const [state, setState] = useState<ApexProps>(buildState());

  const Apex: any = ReactApexChart as any;

  console.log(props);
  useEffect(() => {
    const data = [];
    const labels = [];
    const colors = [];
    for (const v of props.data.data) {
      if (!v.percent) continue;
      data.push(v.percent);
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
