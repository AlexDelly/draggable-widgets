import { useEffect, useState } from "react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import * as S from "./Widget.styles";

interface WidgetProps {
  isActive: boolean;
  title: string;
  isDragging: boolean;
  activateWidgets: () => void;
  deleteWidget?: () => void;
}

export const Widget = ({
  title,
  isDragging,
  activateWidgets,
  deleteWidget,
  isActive,
}: WidgetProps) => {
  const [inArea, setInArea] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [isMouseUp, setIsMouseUp] = useState(true);

  let id: any;

  const handleMouseDown = () => {
    setInArea(true);
    setIsPassed(false);
    setIsMouseUp(false);
    id = timeOut();
  };

  useEffect(() => {
    if (inArea && isPassed && !isMouseUp && !isActive) {
      activateWidgets();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inArea, isPassed, isMouseUp]);

  const timeOut = async () => {
    setTimeout(() => {
      setIsPassed(true);
    }, 800);
  };

  const handleMouseUp = () => {
    setInArea(false);
    setIsPassed(false);
    setIsMouseUp(true);
    return clearTimeout(id);
  };

  const handleMouseLeave = () => {
    setInArea(false);
  };

  return (
    <S.Widget
      isActive={isActive}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="widget"
    >
      {isActive && <DeleteButton deleteWidget={deleteWidget} />}
      <S.Title isDragging={isDragging}>{title}</S.Title>
    </S.Widget>
  );
};
