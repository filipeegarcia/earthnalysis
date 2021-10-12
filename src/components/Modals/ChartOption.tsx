import { FieldValues, UseFormRegister } from "react-hook-form";

interface ChartOptionProps {
  chartType: string,
  chartImgPath: string,
  register: UseFormRegister<FieldValues>;
}

const ChartOption = ({
  chartType,
  chartImgPath,
  register,
}: ChartOptionProps) => {
  return (
    <>
      <input type="radio" id={chartType} value={chartType} {...register("chart", {
        required: true
      })}
      />

      <label htmlFor={chartType}>
        {chartType}
        <img src={chartImgPath} alt={chartType} />
      </label>
    </>
  );
}

export { ChartOption };


