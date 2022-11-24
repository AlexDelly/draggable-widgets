import { RefObject, useRef } from "react";
import {
  DropTargetMonitor,
  useDrag,
  useDrop,
  DragPreviewImage,
} from "react-dnd";
import { UseOutsideClick } from "../../utils";
import { Widget } from "./Widget";

const imgPreview = require("../../Icons/widget_preview.png");

interface DraggableWidgetProps {
  id: string;
  name: string;
  index: number;
  isActive: boolean;
  deleteWidget: (id: string) => void;
  getNewItemsList: (dragIndex: number, hoverIndex: number) => void;
  activateWidgets: () => void;
  deactivate: () => void;
}

export const DraggableWidget = ({
  id,
  name,
  index,
  isActive,
  deactivate,
  getNewItemsList,
  deleteWidget,
  activateWidgets,
}: DraggableWidgetProps) => {
  const ref = useRef(null) as RefObject<HTMLDivElement>;

  const [, drop] = useDrop({
    accept: "widget",
    hover(
      item: DraggableWidgetProps,
      monitor: DropTargetMonitor<any, unknown>
    ) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      let hoverClientY = 0;
      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      getNewItemsList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { index, name },
    type: "widget",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDeleteWidget = () => {
    deleteWidget(id);
  };

  return (
    <UseOutsideClick isActive={isActive} callback={deactivate}>
      <div className="widget" ref={ref} onDragOver={(e) => e.preventDefault()}>
        <DragPreviewImage connect={preview} src={imgPreview} />
        <Widget
          deleteWidget={handleDeleteWidget}
          isActive={isActive}
          activateWidgets={activateWidgets}
          isDragging={isDragging}
          title={name}
        />
      </div>
    </UseOutsideClick>
  );
};
