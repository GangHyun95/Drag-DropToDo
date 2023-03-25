import React, { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 360px;
  background-color: ${(props) =>
    props.isDragging ? props.theme.scroll : props.theme.boardColor};
  border-radius: 5px;
  min-height: 450px;
  max-height: 450px;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  padding: 20px 0px;
  font-size: 24px;
  background-color: ${(props) => props.theme.titleBgColor};
`;
interface IWrapperProps {
  isDragging: boolean;
}
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.titleBgColor
      : props.isDraggingFromThis
      ? props.theme.scroll
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
  index: number;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
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
      )}
    </Draggable>
  );
};

export default Board;
