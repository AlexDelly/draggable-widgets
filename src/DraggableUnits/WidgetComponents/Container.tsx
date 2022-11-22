import { useDrop } from "react-dnd";
import { AddButton } from "../AddButton/AddButton";
import { WidgetsContainer } from "../DraggableUnits.styles";

export const Container = ({
  children,
  title,
  addWidget,
}: {
  children: JSX.Element[];
  title: string;
  addWidget: () => void;
}) => {
  const [, drop] = useDrop({
    accept: "widget",
    drop: () => ({ name: title }),
  });

  return (
    <WidgetsContainer ref={drop}>
      <>{children}</>
      <AddButton addWidget={addWidget} />
    </WidgetsContainer>
  );
};
