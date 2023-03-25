import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li`
  padding: 10px;
  margin-bottom: 4px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
`;

interface IDraggableCardProps {
  toDo: string;
  i: number;
}
function DraggableCard({ toDo, i }: IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={i}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
//  react 에게 prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 마라
export default React.memo(DraggableCard);
