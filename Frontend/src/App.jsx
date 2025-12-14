import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import EventForm from './Components/EventForm';
import EventCard from './Components/EventCard';
// import BookingConfirmation from './Components/BookingConfirmation';
import Home from './Pages/Home';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import EventDemo from './Pages/EventDemo';
import EventEdit from './Pages/EventEdit';
import EventBooking from './Components/EventBooking';
import PaymentPage from './Authentication/PaymentPage';
import MyBookings from './Pages/MyBookings';
import ProtectedRoute from './Components/ProtectedRoute';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  const [eventData, setEventData] = useState(null);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/eventDemo" element={<EventDemo eventData={eventData} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/eventForm" element={<EventForm onCreateEvent={setEventData} />} />
            <Route path="/eventCard" element={<EventCard />} />
            <Route path='/eventEdit/:eventName' element={<EventEdit />} />
            <Route path='/eventBooking' element={<EventBooking />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/myBookings' element={<MyBookings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
