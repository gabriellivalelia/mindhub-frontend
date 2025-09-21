import styled from "styled-components";
import { Colors, FontSizes } from "../../globalConfigs";

export const MainContainer = styled.div`
  align-items: center;
  background: ${Colors.LIGHT_ORANGE};
  display: flex;
  flex-direction: row;
  height: 80px;
  justify-content: space-between;
  padding: 2%;
  width: 100%;
`;

export const LeftContainer = styled.div`
  align-items: start;
  color: ${Colors.WHITE};
  display: flex;
  flex-direction: row;
  font-size: ${FontSizes.XLARGE};
  justify-content: center;
`;
