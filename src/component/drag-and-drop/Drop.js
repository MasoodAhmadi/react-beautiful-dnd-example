import { Droppable } from 'react-beautiful-dnd';

const Drop = ({ id, type, ...props }) => {
  return (
    <Droppable droppableId={id} type={type}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...props}
            style={{ background: '#fff', height: '100vh' }}
          >
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
export default Drop;
