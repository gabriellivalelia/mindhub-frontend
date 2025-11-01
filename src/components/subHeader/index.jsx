import { MainContainer, LeftContainer } from "./styles";

/**
 * Componente SubHeader - Cabeçalho secundário para páginas internas.
 *
 * Exibe um título ou texto descritivo no topo de páginas específicas,
 * abaixo do header principal.
 *
 * @component
 * @param {Object} props - Props do componente
 * @param {string} props.text - Texto a ser exibido no subheader
 * @returns {JSX.Element} Barra de subheader com texto
 *
 * @example
 * <SubHeader text="Minhas Consultas" />
 * <SubHeader text="Editar Perfil" />
 */
function SubHeader({ text }) {
  return (
    <MainContainer>
      <LeftContainer>{text}</LeftContainer>
    </MainContainer>
  );
}

export default SubHeader;
