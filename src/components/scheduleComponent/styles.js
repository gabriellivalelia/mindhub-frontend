import styled, { css } from "styled-components";
import Colors from "../../globalConfigs/globalStyles/colors";
import BreakPoints from "../../globalConfigs/globalStyles/breakPoints";
import FontSizes from "../../globalConfigs/globalStyles/fontSizes";

export const ScheduleWrapper = styled.div`
  background-color: ${Colors.WHITE};
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 520px;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${BreakPoints.MOBILE}) {
    padding: 10px;
  }
`;

export const ScheduleGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${FontSizes.LARGER};
  color: ${Colors.ORANGE};
  padding: 0 15px;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    padding: 0 5px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  text-align: center;
`;

export const DayHeader = styled.div`
  flex: 1;
  padding: 5px;
  border-radius: 8px;
  background-color: ${Colors.WHITE};
  margin: 0 4px;
  min-width: 0;

  @media (max-width: 500px) {
    margin: 0 2px;
  }
`;

export const DayName = styled.div`
  font-size: 14px;
  color: ${Colors.GREY};
  text-transform: capitalize;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.SMALLEST};
  }
`;

export const DayNumber = styled.div`
  font-size: 14px;
  color: ${Colors.DARK_GREY};
  font-weight: bold;
  white-space: nowrap;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.SMALLEST};
  }
`;

export const SlotsRowContainer = styled.div`
  position: relative;
`;

export const SlotsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 10px;
  min-height: 200px;
  margin: 0 4px;
  min-width: 0;

  @media (max-width: ${BreakPoints.MOBILE}) {
    margin: 0 2px;
  }
`;

export const TimeSlot = styled.div`
  border-radius: 6px;
  font-size: ${FontSizes.SMALL};
  font-weight: 500;
  text-align: center;
  width: 100%;
  padding: 10px 5px;
  white-space: nowrap;

  color: ${Colors.GREY};
  cursor: default;

  ${(props) =>
    props.available &&
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
    props.selected &&
    props.available &&
    css`
      background-color: ${Colors.GREEN};
      color: ${Colors.WHITE};
      border-color: ${Colors.GREEN};
    `}
  
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
