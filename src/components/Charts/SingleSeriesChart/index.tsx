import { useContext, useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { ChartDataContext } from "../../../contexts/ChartDataContext";
import { formatTimeStamp, groupBy } from '../../../utils';
import { Container } from "./styles";

interface Props {
  type?: "pie" | "donut",
  labelToGetData: string,
}

export const SingleSeriesChart = ({
  type = "pie",
  labelToGetData,
}: Props) => {
  const { headers, csvData } = useContext(ChartDataContext);

  const [labels, setLabels] = useState([] as string[]);
  const [series, setsSeries] = useState([] as string[]);

  useEffect(() => {
    getSeriesAndLabels();
  }, []);

  const getSeriesAndLabels = () => {
    let isTimestamp = labelToGetData === 'timeStamp';

    let indexOfLabel = headers.indexOf(labelToGetData);

    let dataFromLabel = isTimestamp ?
      csvData.map(x => formatTimeStamp(x[indexOfLabel])) :
      csvData.map(x => x[indexOfLabel]);

    let groupedById = groupBy(dataFromLabel);

    let labels = Array.from(groupedById.keys()).filter(value => value);

    let series = Array.from<any>(groupedById.values())
      .filter(value =>
        value.every((x: any) => x))
      .map(x => x.length);

    setLabels(labels as string[]);
    setsSeries(series as string[]);
  }

  let options = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          pan: true,
          customIcons: []
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp: number) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          }
        },
      },
    },
    labels,
  }

  return (
    <Container>
      <Chart options={options} series={series} type={type} width={380} />
    </Container>
  )
}