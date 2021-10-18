import { createContext, useEffect, useState } from "react";
export interface ChartParameters {
  chart: 'line' | 'area' | 'rangeBar' | 'pie' | 'donut' | 'bar' | 'boxPlot';
  fields: string[];
}

export const ChartDataContext = createContext({} as ContextValue)

export type Option = {
  value: string;
  label: string;
}

interface ChartDataContextProps {
  children: React.ReactNode;
}

interface ContextValue {
  isModalOpen: boolean;
  handleOnDrop: (data: FileData[]) => void;
  handleOnError: (err: any, file: any, inputElem: any, reason: any) => void;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onConfirm: (data: any) => void;
  onClear: () => void;
  options: Option[],
  charts: ChartParameters[],
  headers: string[],
  csvData: string[][],
}

type FileData = {
  data: string[];
}

export const ChartDataContextProvider = ({ children }: ChartDataContextProps) => {

  const [headers, setHeaders] = useState([] as string[]);
  const [options, setOptions] = useState([] as Option[]);
  const [csvData, setCsvData] = useState([] as string[][]);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [charts, setCharts] = useState([] as ChartParameters[])

  useEffect(() => {
    getOptions();
  }, [csvData])

  const onClear = () => {
    setHeaders([]);
    setCsvData([]);
    setCharts([]);
    setOptions([]);
  }

  const getOptions = () => {
    setOptions(headers.map(h => (
      {
        value: h,
        label: h,
      }
    )))
  }

  const onConfirm = (data: any) => {
    const { chart, fields } = data;

    setCharts([
      ...charts,
      {
        chart,
        fields: fields.map((f: Option) => f.value),
      }
    ]);

    onCloseModal();
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const onOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleOnDrop = (data: FileData[]) => {
    const csvData = data.map(({ data }) => data);
    const head = csvData[0];
    setHeaders(head);
    setCsvData(csvData.filter(arr => arr[0]).slice(1));
    onOpenModal();
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  return (<ChartDataContext.Provider value={
    {
      headers,
      csvData,
      handleOnDrop,
      handleOnError,
      onCloseModal,
      onOpenModal,
      onConfirm,
      isModalOpen,
      options,
      charts,
      onClear,
    }
  }>
    {children}
  </ChartDataContext.Provider>)
}
