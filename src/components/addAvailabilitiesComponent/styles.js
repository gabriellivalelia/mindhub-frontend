import styled, { css } from "styled-components";
import Colors from "../../globalConfigs/globalStyles/colors";
import BreakPoints from "../../globalConfigs/globalStyles/breakPoints";
import FontSizes from "../../globalConfigs/globalStyles/fontSizes";

export const ScheduleWrapper = styled.div`
  background-color: ${Colors.WHITE};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

export const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
  gap: 4px;

  @media (max-width: ${BreakPoints.TABLET}) {
    justify-content: center;
    gap: 2px;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    justify-content: center;
    gap: 0px;
  }
`;

export const ScheduleGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${FontSizes.LARGER};
  color: ${Colors.ORANGE};
  padding: 0 4px;

  &:hover {
    opacity: 0.85;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: ${BreakPoints.TABLET}) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    overflow-x: auto;
  }
`;

export const DayHeader = styled.div`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  background-color: ${Colors.WHITE};
  margin: 0 6px;
  min-width: 0;
`;

export const DayName = styled.div`
  font-size: 13px;
  color: ${Colors.GREY};
  text-transform: capitalize;
`;

export const DayNumber = styled.div`
  font-size: 13px;
  color: ${Colors.DARK_GREY};
  font-weight: 700;
`;

export const SlotsRowContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
`;

export const SlotsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  max-height: 60vh; /* local control — won't affect shared schedule */
  min-height: 160px;
  flex: 1 1 auto;

  @media (max-width: ${BreakPoints.TABLET}) {
    overflow-x: auto;
    flex-wrap: nowrap;
    gap: 6px;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    overflow-x: auto;
    gap: 4px;
    max-height: 50vh;
  }
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
  min-height: 0;
  margin: 0 6px;
  min-width: 0;

  @media (max-width: ${BreakPoints.TABLET}) {
    min-width: 84px;
    margin: 0 4px;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    min-width: 72px;
    margin: 0 3px;
  }
`;

export const TimeSlot = styled.div`
  border-radius: 6px;
  font-size: ${FontSizes.SMALL};
  font-weight: 500;
  text-align: center;
  width: 100%;
  padding: 8px 6px;
  white-space: nowrap;
  color: ${Colors.GREY};
  cursor: default;

  ${(props) =>
    props.$available &&
    css`
      background-color: ${Colors.LIGHT_GREEN};
      color: ${Colors.GREEN};
      cursor: pointer;
      border: 1px solid ${Colors.LIGHT_BORDER_GREEN};

      &:hover {
        background-color: ${Colors.LIGHT_GREEN_HOVER};
      }
    `}

  ${(props) =>
    props.$selected &&
    props.$available &&
    css`
      background-color: ${Colors.GREEN};
      color: ${Colors.WHITE};
      border-color: ${Colors.GREEN};
      cursor: pointer;
    `}

  ${(props) =>
    props.$markedForRemoval &&
    css`
      background-color: #ffcccc;
      color: #cc0000;
      border: 1px solid #cc0000;
      cursor: pointer;

      &:hover {
        background-color: #ff9999;
      }
    `}

  ${(props) =>
    props.$readonly &&
    css`
      background-color: ${Colors.LIGHT_GREY};
      color: ${Colors.GREY};
      opacity: 0.6;
      cursor: default;
      pointer-events: none;
      border: 1px solid ${Colors.GREY};
    `}

  @media (max-width: ${BreakPoints.TABLET}) {
    padding: 6px 4px;
    font-size: ${FontSizes.SMALL};
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.SMALLEST};
  }
`;

export const ScrollBar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 8px;
  height: 50%;
  background-color: transparent;
  border-radius: 4px;
`;

export default {};
