import './App.css';
import Register from './component/home/Register';
import Login from './component/home/Login';
import About from './component/about/About';
import Header from './component/Header';
import Contact from './component/contact/Contact';
import Index from './component/home/Index';
import Property from './component/property/AllProperty';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Footer from './component/Footer';
import ListProperty from './component/property/DetailProperty';
import User from './component/user/User';
import Vendor from './component/vendor/Vendor';
import Role from './component/admin/Role';
import VendroListProperty from './component/vendor/Listing';
import VendorBooking from './component/vendor/Booking';
import UpdateProfile from './component/vendor/UpdateProfile';

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
          <Route path='/allproperty' element={<Property />} />
          <Route path='/detailproperty/:id' element={<ListProperty />} />
          <Route path='/user' element={<User />} />
          <Route path='/vendor' element={<Vendor />} />
          <Route path='/role' element={<Role />} />
          <Route path='/vendor/listproperty' element={<VendroListProperty/>} />
          <Route path='/vendor/booking' element={<VendorBooking/>} />
          <Route path='/vendor/updateprofile' element={<UpdateProfile/>} />
        </Routes>
      <Footer/>
      </Router>
    </>
  );
}

export default App;
