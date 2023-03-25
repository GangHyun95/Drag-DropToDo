import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, TrashCanState } from "./atoms";
import Board from "./components/Board";
import TrashCan from "./components/TrashCan";
// DragDopContext로 사용할 컴포넌트 감싸줌
// onDragEnd 함수는 유저가 드래그를 끝낸 시점ㅈ에 불려지는 함수

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setTrashCan = useSetRecoilState(TrashCanState);
  // 드래그 시작 시 실행되는 함수
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === "DEFAULT") setTrashCan(true);
  };
  // 드래그 끝날 시 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    setTrashCan(false);
    console.log(info);
    // 카드 삭제 기능
    if (destination.droppableId === "trashcan") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 보드 이동하기
    else if (info.type === "board") {
      setToDos((allBoards) => {
        const entries = Object.entries(allBoards);
        console.log(entries);

        const [deletedItem] = entries.splice(source.index, 1);
        entries.splice(destination.index, 0, deletedItem);
        return Object.fromEntries(entries);
      });
    } else if (destination?.droppableId === source.droppableId) {
      // 같은 보드안에서 카드 이동
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1)Delete item on soruce.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //  다른 보드로 카드 이동
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Wrapper>
        <Droppable direction="horizontal" type="board" droppableId="board">
          {(magic, snapshot) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, i) => (
                <Board
                  key={boardId}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  index={i}
                />
              ))}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
