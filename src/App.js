import './App.css';
import Register from './component/home/Register';
import Login from './component/home/Login';
import About from './component/about/About';
import Header from './component/Header';
import Contact from './component/contact/Contact';
import Index from './component/home/Index';
import ListProperty from './component/property/AllProperty';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Footer from './component/Footer';
import Property from './component/property/DetailProperty';
import User from './component/user/User';
import Vendor from './component/vendor/Vendor';
import Role from './component/admin/Role';


function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path='/' exact element={<Index />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/allproperty' element={<ListProperty />} />
          <Route path='/detailproperty/:id' element={<Property />} />
          <Route path='/user' element={<User />} />
          <Route path='/vendor' element={<Vendor />} />
          <Route path='/role' element={<Role />} />
        </Routes>
      <Footer/>
      </Router>
    </>
  );
}

export default App;
