import { useContext } from "react";
import Chart from "react-apexcharts";
import { ChartDataContext } from "../../../contexts/ChartDataContext";
import { Container } from './styles';

interface Props {
  labelToGetData: string,
}

type SeriesData = [
  {
    x: string,
    y: number[]
  }
]

const BoxPlotChart = ({ labelToGetData }: Props) => {
  const { headers, csvData } = useContext(ChartDataContext);

  const getSeries = (): SeriesData => {
    const groups = getGroups();

    return buildSeriesData(groups);
  }

  const buildSeriesData = (groups: { [k: string]: number[]; }): SeriesData => {
    let seriesData = [{}] as SeriesData;

    let keys = Object.keys(groups);
    let values = Object.values(groups);

    for (let i = 0; i < keys.length; i++) {
      seriesData[i] = {
        x: keys[i],
        y: calculate(values[i]),
      }
    }

    return seriesData;
  };

  const calculate = (values: number[]) => {
    const sorted = values.sort((a, b) => a - b);
    const valuesLength = values.length;

    let median = 0;

    if (valuesLength % 2 === 0) {
      const halfIndex = valuesLength / 2 - 1;

      const firstHalfNumber = sorted[halfIndex];
      const secondHalfNumber = sorted[halfIndex + 1];

      median = (firstHalfNumber + secondHalfNumber) / 2;

    } else {
      median = sorted[Math.floor(valuesLength / 2)]
    }

    //https://www.wallstreetmojo.com/quartile-formula/

    const q1StartIndex = Math.floor((valuesLength + 1) * (1 / 4));
    const q3StartIndex = Math.ceil((valuesLength + 1) * (3 / 4));

    const q1 = (sorted[q1StartIndex] + sorted[q1StartIndex + 1]) / 2;
    const q3 = (sorted[q3StartIndex] + sorted[q3StartIndex + 1]) / 2;

    let iqr = q3 - q1;

    let borderLimit1 = q1 - 1.5 * iqr;
    let borderLimit2 = q3 + 1.5 * iqr;

    let outliers = sorted.filter(x => x < borderLimit1 || x > borderLimit2);

    const min = sorted.find(x => x > borderLimit1) ?? 0;
    const max = sorted.reverse().find(x => x < borderLimit2) ?? 0;

    return [min, q1, median, q3, max];
  };

  const getGroups = (): { [k: string]: number[] } => {
    const indexOfData = headers.indexOf(labelToGetData);
    const indexOfLabel = headers.indexOf('label');

    let groups: { [k: string]: number[] } = {};

    for (var i = 0; i < csvData.length; i++) {
      const line = csvData[i];
      const label = line[indexOfLabel] ?? 'group';

      if (!groups.hasOwnProperty(label)) {
        groups[label] = []
      }

      groups[label].push(Number(line[indexOfData]))
    }

    return groups;
  }

  var series = [
    {
      name: 'box',
      type: 'boxPlot',
      data: getSeries(),
    },
  ];

  var options = {
    colors: ['#008FFB', '#FEB019'],
  };

  return (
    <Container>
      <Chart
        options={options}
        series={series}
        type='boxPlot'
        width="500"
      />
    </Container>
  )
}

export default BoxPlotChart;



