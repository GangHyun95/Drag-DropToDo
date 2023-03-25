import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// DragDopContext로 사용할 컴포넌트 감싸줌
// onDragEnd 함수는 유저가 드래그를 끝낸 시점ㅈ에 불려지는 함수
function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>💥</span>
                    One
                  </li>
                )}
              </Draggable>{" "}
              <Draggable draggableId="seoncd" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    {" "}
                    <span {...magic.dragHandleProps}>💥</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
