import { useContext } from 'react';
import { CSVReader } from 'react-papaparse';
import { ChartDataContext } from '../../contexts/ChartDataContext';

export const UploadArea = () => {
  const {
    handleOnDrop,
    handleOnError,
  } = useContext(ChartDataContext);

  const { onClear } = useContext(ChartDataContext);

  return (
    <>
      <h5>Click and Drag Upload</h5>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={onClear}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    </>
  );
}