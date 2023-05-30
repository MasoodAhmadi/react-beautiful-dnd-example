import React, { useState } from 'react';
import { reorder } from './helper';
import { DragDropContext as DragAndDrop } from 'react-beautiful-dnd';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Drop from './drag-and-drop/Drop';
import Drag from './drag-and-drop/Drag';

const NestedListComponent = () => {
  const [categories, setCategories] = useState([
    {
      id: 'q101',
      name: 'Category 1',
      items: [
        { id: '1', name: 'First' },
        { id: '2', name: 'Second' },
      ],
    },
    {
      id: 'wkqx',
      name: 'Category 2',
      items: [
        { id: '3', name: 'Third' },
        { id: '4', name: 'Fourth' },
      ],
    },
  ]);

  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return;

    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;

    // Reordering items
    if (type === 'droppable-item') {
      // If drag and dropping within the same category
      if (sourceCategoryId === destinationCategoryId) {
        const updatedOrder = reorder(
          categories.find((category) => category.id === sourceCategoryId).items,
          source.index,
          destination.index
        );
        const updatedCategories = categories.map((category) =>
          category.id !== sourceCategoryId
            ? category
            : { ...category, items: updatedOrder }
        );

        setCategories(updatedCategories);
      } else {
        const sourceOrder = categories.find(
          (category) => category.id === sourceCategoryId
        ).items;
        const destinationOrder = categories.find(
          (category) => category.id === destinationCategoryId
        ).items;

        const [removed] = sourceOrder.splice(source.index, 1);
        destinationOrder.splice(destination.index, 0, removed);

        destinationOrder[removed] = sourceOrder[removed];
        delete sourceOrder[removed];

        const updatedCategories = categories.map((category) =>
          category.id === sourceCategoryId
            ? { ...category, items: sourceOrder }
            : category.id === destinationCategoryId
            ? { ...category, items: destinationOrder }
            : category
        );

        setCategories(updatedCategories);
      }
    }

    // Reordering categories
    if (type === 'droppable-category') {
      const updatedCategories = reorder(
        categories,
        source.index,
        destination.index
      );

      setCategories(updatedCategories);
    }
  };

  return (
    <Container>
      <DragAndDrop onDragEnd={handleDragEnd}>
        <Drop id="droppable" type="droppable-category" className="">
          {categories.map((category, categoryIndex) => {
            return (
              <>
                <Row>
                  <Col>
                    <div className="category-container">
                      <h2 className="item">this is {category.name}</h2>

                      <Drop
                        key={category.id}
                        id={category.id}
                        type="droppable-item"
                      >
                        {category.items.map((item, index) => {
                          return (
                            <Drag
                              className="draggable"
                              key={item.id}
                              id={item.id}
                              index={index}
                            >
                              <div className="item">
                                <Card style={{ color: 'black' }}>
                                  <Card.Title>{item.name}</Card.Title>
                                </Card>
                              </div>
                            </Drag>
                          );
                        })}
                      </Drop>
                    </div>
                  </Col>
                </Row>
              </>
            );
          })}
        </Drop>
      </DragAndDrop>
    </Container>
  );
};

export default NestedListComponent;
