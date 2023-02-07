import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import About from './Pages/About';
import ItemDetailContainer from './Pages/ItemDetailContainer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
	  <BrowserRouter>
	  	<NavBar />
		<Routes>
			<Route path="/" element={<ItemListContainer />} />
			<Route path='/category/:id' element={<ItemListContainer />} />
			<Route path='/item/:id' element={<ItemDetailContainer />} />
			<Route path="/about" element={<About />} />
		</Routes>
	  </BrowserRouter>
  );
}

export default App;
