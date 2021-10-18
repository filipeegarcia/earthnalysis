import { Container, ChartSelector } from "./styles";
import Modal from 'react-modal';
import Select from 'react-select'

import pieChartImg from '../../assets/images/charts/pie.svg'
import donutChartImg from '../../assets/images/charts/donut.png'
import areaChartImg from '../../assets/images/charts/area.svg'
import barChartImg from '../../assets/images/charts/bar.png'
import lineChartImg from '../../assets/images/charts/line.svg'
import boxPlotChartImg from '../../assets/images/charts/boxplot.png'

import { ChangeEvent } from "react";
import { Option } from '../../contexts/ChartDataContext'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm, } from "react-hook-form";
import { ChartOption } from "./ChartOption";

const schema = yup.object().shape({
  fields: yup.array().min(1, 'Chart field is required').required().when("chart", {
    is: 'pie',
    then: yup.array().test({
      message: 'Pie Chart only accepts 1 field',
      test: arr => arr?.length === 1
    })
  }),
  chart: yup.string().required(),
});


interface ModalProps {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  onConfirm: (event: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  options: Option[];
}

export const ChartCreatorModal = ({
  modalIsOpen,
  onRequestClose,
  contentLabel,
  onCancel,
  onConfirm,
  options,
}: ModalProps) => {

  const { register, control, handleSubmit, formState: { errors, isValid, }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const handleConfirm = (event: any) => {
    onConfirm(event)
    reset();
  }

  const handleClose = () => {
    onRequestClose();
    reset();
  }

  return <Modal
    isOpen={modalIsOpen}
    onRequestClose={handleClose}
    contentLabel={contentLabel}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >
    <Container onSubmit={handleSubmit((event: any) => handleConfirm(event))} >
      <button className="react-modal-close" onClick={handleClose}></button>
      <h2>Generate a new chart</h2>

      <Controller
        name="fields"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Select
          {...field}
          isMulti
          options={options}
          className="multi-select"
          classNamePrefix="select"
        />}
      />
      {
        !isValid && errors['fields']?.message
        && <p className="error-label">{errors['fields']?.message}</p>
      }

      <ChartSelector  >

        <ChartOption
          chartType="line"
          register={register}
          chartImgPath={lineChartImg}
        />

        <ChartOption
          chartType="area"
          register={register}
          chartImgPath={areaChartImg}
        />

        <ChartOption
          chartType="bar"
          register={register}
          chartImgPath={barChartImg}
        />

        <ChartOption
          chartType="pie"
          register={register}
          chartImgPath={pieChartImg}
        />

        <ChartOption
          chartType="donut"
          register={register}
          chartImgPath={donutChartImg}
        />

        <ChartOption
          chartType="boxPlot"
          register={register}
          chartImgPath={boxPlotChartImg}
        />

      </ChartSelector>

      <footer>
        <button type="submit">Confirm</button>
        <button onClick={handleClose}>Cancel</button>
      </footer>
    </Container>
  </Modal>
}

