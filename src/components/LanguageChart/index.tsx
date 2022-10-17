import React, { useEffect, useState } from "react";
import ReactApexChart, { Props as ApexProps } from "react-apexcharts";

interface Props {
  data: number[];
  labels: string[];
}

export default function LanguageChart(props: Props) {
    const [state, setState] = useState<ApexProps>({});
    
    const Apex:any = ReactApexChart as any

  useEffect(() => {
    const newState: ApexProps = {
      series: [
        {
          data: props.data,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: props.labels,
        },
      },
    };
    setState(newState);
  }, [props.data, props.labels]);
    
    
  return (
    <div id="chart">
      <Apex
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
