import styled from "styled-components";
import { colors, Unselectable } from "../../utils";

const transition = "0.2s ease-in-out";
const mainColor = "#edf6ff";
const darkColor = "#334752";

export const Widget = styled.div<{ isDragging: boolean; isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21vw;
  max-width: 300px;
  height: 21vw;
  max-height: 300px;
  border: 1px solid;
  box-shadow: 8px 8px 8px 4px #99adbb, -6px -6px 6px 3px ${colors.white};
  border-color: ${({ isActive }) => (isActive ? "#99adbb" : mainColor)};
  border-radius: 24px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.white : mainColor};

  cursor: pointer;

  :hover {
    border-color: #99adbb;
    & span {
      color: ${darkColor};
    }
  }

  :active {
    background-color: ${colors.white};
    cursor: grab;
    & span {
      color: ${darkColor};
    }
  }
  transform: translate(0, 0);
  transition: border ${transition}, background ${transition},
    box-shadow ${transition};
`;

export const Title = styled.span<{ isDragging: boolean }>`
  position: absolute;
  ${Unselectable}
  font-size: calc(20px + 2vmin);
  font-weight: 300;
  color: ${({ isDragging }) => (isDragging ? darkColor : "#99adbb")};
  transition: color ${transition};
`;
