import { ChartDataContext, ChartParameters } from '../../contexts/ChartDataContext';
import React, { useContext } from 'react';

import { ChartCreatorModal } from '../Modals/ChartCreatorModal';
import { Container } from './styles';
import { ExportablePDFComponent } from '../ExportablePDFComponent';
import { FiPlus } from 'react-icons/fi'
import MultiSeriesChart from '../Charts/MultiSeriesChart';
import { SingleSeriesChart } from '../Charts/SingleSeriesChart';
import BoxPlotChart from '../Charts/BoxPlotChart';

const ChartGenerator: React.FC = () => {

  const {
    onConfirm,
    onCloseModal,
    isModalOpen,
    options,
    charts,
    onOpenModal
  } = useContext(ChartDataContext);

  return <>
    <ChartCreatorModal
      options={options}
      contentLabel="Home"
      modalIsOpen={isModalOpen}
      onCancel={onCloseModal}
      onRequestClose={onCloseModal}
      onConfirm={onConfirm}
    />
    {
      charts?.length > 0 &&
      <ExportablePDFComponent elementToPrintId="container" />
    }
    <Container id="container">
      {
        charts?.length > 0 &&
        <>
          {
            charts.map(chart => {
              return (
                <div className="label-container">
                  <p contentEditable="true">Add Label</p>
                  {getComponent(chart)}
                </div>
              );
            })
          }
          <button className="add-button" type="button" onClick={onOpenModal} > <FiPlus size={24} /></button>
        </>
      }
    </Container>
  </>;
}

export default ChartGenerator;

function getComponent({ chart, fields }: ChartParameters) {
  let key = `${chart}-${fields.join('-')}`;

  switch (chart) {
    case 'line':
    case 'area':
    case 'rangeBar':
    case 'bar':
      return (
        <MultiSeriesChart labelsToGetData={fields} type={chart} key={key} />
      );

    case 'pie':
    case 'donut':
      return (
        <SingleSeriesChart labelToGetData={fields[0]} key={key} type={chart} />
      );

    case 'boxPlot':
      return (
        <BoxPlotChart labelToGetData={fields[0]} key={key} />
      )
  }
}
