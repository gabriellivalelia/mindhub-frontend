import { MainContainer, LeftContainer } from "./styles";

/**
 * Componente Footer - Rodapé da aplicação.
 *
 * Exibe informações de copyright no rodapé de todas as páginas.
 *
 * @component
 * @returns {JSX.Element} Rodapé com copyright
 */
function Footer() {
  return (
    <MainContainer>
      <LeftContainer>Copyright &copy; 2025MindHub</LeftContainer>
    </MainContainer>
  );
}

export default Footer;
