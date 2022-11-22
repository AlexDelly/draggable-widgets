import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import uuid from "react-uuid";
import * as S from "./DraggableUnits.styles";
import { Container } from "./WidgetComponents/Container";
import { DraggableWidget } from "./WidgetComponents/DraggableWidget";
import { Widget } from "./WidgetComponents/Widget";

export const DraggableUits = () => {
  const [isActive, setIsActive] = useState(false);
  const isMobileLayout = window.innerWidth < 800;

  const [items, setItems] = useState([
    { id: "1", name: "1", container: "wdc" },
    { id: "2", name: "2", container: "wdc" },
    { id: "3", name: "3", container: "wdc" },
    { id: "4", name: "4", container: "wdc" },
    { id: "5", name: "5", container: "wdc" },
  ]);

  const getNewItemsList = (dragIndex: number, hoverIndex: number) => {
    const currentItem = items[dragIndex];

    if (currentItem) {
      setItems((prev) => {
        const prevList = [...prev];
        const prevItem = prevList.splice(hoverIndex, 1, currentItem);
        prevList.splice(dragIndex, 1, prevItem[0]);
        return prevList;
      });
    }
  };

  const activateWidgets = () => {
    setIsActive(true);
  };

  const deactivateWidgets = () => {
    setIsActive(false);
  };

  const getItemsList = () => {
    return items.map((item, index) => (
      <DraggableWidget
        deleteWidget={deleteWidget}
        deactivate={deactivateWidgets}
        isActive={isActive}
        key={item.id}
        name={item.name}
        index={index}
        id={item.id}
        getNewItemsList={getNewItemsList}
        activateWidgets={activateWidgets}
      />
    ));
  };

  const addWidget = () => {
    const current = [...items];
    current.push({
      id: uuid(),
      name: (current.length + 1).toString(),
      container: "wdc",
    });
    setItems(current);
  };

  const deleteWidget = (index: string) => {
    const newState = items.filter((item) => item.id !== index);

    setItems(newState);
  };

  const widgets = isActive ? (
    <DndProvider backend={isMobileLayout ? TouchBackend : HTML5Backend}>
      <Container addWidget={addWidget} title="wdc">
        {getItemsList()}
      </Container>
    </DndProvider>
  ) : (
    <S.WidgetsContainer isMobileLayout={isMobileLayout}>
      {items.map((item, index) => (
        <Widget
          isActive={isActive}
          title={item.name}
          key={`widget_${index}`}
          isDragging={false}
          activateWidgets={activateWidgets}
        />
      ))}
    </S.WidgetsContainer>
  );

  return (
    <S.Container>
      <S.Wrapper>{widgets}</S.Wrapper>
    </S.Container>
  );
};
