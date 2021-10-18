import { ExportButton } from "./styles";
import { FaFileExport } from 'react-icons/fa'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
type ExportablePDFComponentProps = {
  elementToPrintId: string,
}

const ExportablePDFComponent = ({ elementToPrintId }: ExportablePDFComponentProps) => {

  const printDocument = () => {
    const input = document.getElementById(elementToPrintId) as HTMLElement
    html2canvas(input)
      .then((canvas) => {
        const imageData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      })
      ;
  }

  return (
    <ExportButton onClick={printDocument}>Export <FaFileExport /></ExportButton>
  );
}

export { ExportablePDFComponent };