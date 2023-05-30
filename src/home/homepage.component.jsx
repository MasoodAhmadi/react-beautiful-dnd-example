import { Container } from 'react-bootstrap';
import NestedListComponent from '../component/NestedListComponent';
// import NestedListComponent from '../NestedListComponent';

function Home() {
  return (
    <Container className='pt-4'>
      {/* <ModalExample /> */}
      {/* <Chips />
        <Kanban /> */}
      {/* <DragNDrop /> */}

     <NestedListComponent />
    </Container>
  );
}

export default Home;
