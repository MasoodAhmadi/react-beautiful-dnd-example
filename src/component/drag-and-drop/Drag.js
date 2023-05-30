import { Draggable } from 'react-beautiful-dnd';

const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...props}>
            <div className='drag-handle' {...provided.dragHandleProps}>
              {/* {children} */}
              {props.children}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
export default Drag;
