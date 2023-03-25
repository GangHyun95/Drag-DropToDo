import { FaTrash } from "react-icons/fa";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { TrashCanState } from "../atoms";

const TrashCanWrapper = styled.div<ITrashProps>`
  position: absolute;
  bottom: 25px;
  right: 0px;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: end;
  align-items: center;
  svg {
    margin-right: 50px;
    width: 50px;
    height: 50px;
    transition: all 300ms ease-in-out;
  }
  &:hover svg {
    transform: ${(props) => props.isDraggingOver && "scale(1.5)"};
    color: ${(props) => props.isDraggingOver && "red"};
  }
`;

interface ITrashProps {
  isDraggingOver: boolean;
}

const TrashCan = () => {
  const trashCan = useRecoilValue(TrashCanState);
  return (
    <Droppable droppableId="trashcan">
      {(magic, snapshot) => (
        <TrashCanWrapper
          ref={magic.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...magic.droppableProps}
        >
          {trashCan && <FaTrash />}
        </TrashCanWrapper>
      )}
    </Droppable>
  );
};

export default TrashCan;
