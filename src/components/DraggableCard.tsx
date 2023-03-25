import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li<{ isDragging: boolean }>`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  i: number;
}
function DraggableCard({ toDoId, toDoText, i }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={i}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
//  react 에게 prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 마라
export default React.memo(DraggableCard);
