import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.ul`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((todo, i) => (
            <DraggableCard key={todo} i={i} todo={todo} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;
