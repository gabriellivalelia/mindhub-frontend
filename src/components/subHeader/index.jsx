import { MainContainer, LeftContainer } from "./styles";

function SubHeader({ text }) {
  return (
    <MainContainer>
      <LeftContainer>{text}</LeftContainer>
    </MainContainer>
  );
}

export default SubHeader;
