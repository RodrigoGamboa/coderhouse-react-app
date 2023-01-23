import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';

const App = () => {
  return (
	  <>
	  	<NavBar />
	  	<ItemListContainer greeting="Hi! This will display all the products!" />
	  </>
  );
}

export default App;
