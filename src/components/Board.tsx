import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 450px;
  max-height: 450px;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  padding: 20px 0px;
  font-size: 24px;
  background-color: ${(props) => props.theme.titleBgColor};
`;
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex: 1 1 auto;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  overflow-y: auto;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    padding: 18px 10px;
    border-radius: 3px;
    outline: none;
    border: none;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setValue("toDo", "");
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, i) => (
              <DraggableCard
                key={toDo.id}
                i={i}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
