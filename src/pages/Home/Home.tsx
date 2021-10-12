import ChartGenerator from "../../components/ChartGenerator"
import { Header } from "../../components/Header"
import { UploadArea } from "../../components/UploadArea"

export const Home = () => {
  return (
    <div>
      <Header />
      <UploadArea />
      <ChartGenerator />
    </div>
  )
}