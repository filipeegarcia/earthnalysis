import { Container, Content } from "./styles"
import logoImg from '../../assets/images/dummy-logo.jpg'

export const Header = () => {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />
        <p>Earthanalysis</p>
      </Content>
    </Container>
  )
}