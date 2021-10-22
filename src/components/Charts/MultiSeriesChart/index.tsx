import { useContext, useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { ChartDataContext } from '../../../contexts/ChartDataContext';
import { formatTimeStamp, groupBy } from '../../../utils';

import { Container } from './styles';

interface Props {
  type?: 'line' | 'area' | 'pie' | 'rangeBar' | 'bar',
  labelsToGetData: string[],
}

interface Series {
  name: string;
  data: string[];
}

const MultiSeriesChart = ({
  type,
  labelsToGetData,
}: Props) => {
  const { headers, csvData } = useContext(ChartDataContext);

  const [categories, setCategories] = useState([] as string[]);
  const [series, setSeries] = useState([] as Series[]);

  useEffect(() => {
    getCategories();
    getSeries();
  }, []);

  const getCategories = () => {

    if (labelsToGetData.length == 1) {

      let currentLabel = labelsToGetData[0];

      let formattedLabels = formatLabels(currentLabel, csvData);

      let groupedById = groupBy(formattedLabels);

      let labels = Array.from(groupedById.keys()).filter(value => value);

      setCategories(labels as string[]);
      return;
    }

    let currentLabel = labelsToGetData[0];

    let categories = formatLabels(currentLabel, csvData);

    setCategories(categories as string[]);
  }

  const getSeries = () => {

    let newSeries = [];

    if (labelsToGetData.length > 1) {

      for (let i = 1; i < labelsToGetData.length; i++) {

        let currentLabel = labelsToGetData[i];

        let currentSeries = formatLabels(currentLabel, csvData)

        newSeries.push({
          name: currentLabel,
          data: currentSeries,
        });
      }
      setSeries(newSeries);
      return;
    }

    let currentLabel = labelsToGetData[0];

    let dataFromLabel = formatLabels(currentLabel, csvData);

    let groupedById = groupBy(dataFromLabel);

    let series = Array.from<any>(groupedById.values())
      .filter(value =>
        value.every((x: any) => x))
      .map(x => x.length);

    setSeries([{
      name: currentLabel,
      data: series,
    }]);
  }

  const formatLabels = (currentLabel: string, csvData: string[][]) => {
    let isTimestamp = currentLabel === 'timeStamp';

    let indexOfLabel = headers.indexOf(currentLabel);

    return isTimestamp ?
      csvData.map(x => formatTimeStamp(x[indexOfLabel])).filter(value => value) :
      csvData.map(x => x[indexOfLabel]).filter(value => value);
  }

  let options = type === 'line' ?  {
    xaxis: {
      categories: categories,
    },
  } :  {
    xaxis: {
      categories: categories,
    },
    fill: {
      type: 'pattern',
      pattern: {
        style: [
          'verticalLines',
          'horizontalLines',
          'squares',
          'circles',
          'slantedLines',
        ],
        width: 6,
        height: 6,
        strokeWidth: 2
      }
    },
  };

  return (
    <Container>
      <Chart
        options={options}
        series={series}
        type={type}
        width="500"
      />
    </Container>
  )
}

export default MultiSeriesChart;