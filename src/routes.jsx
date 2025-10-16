import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  AppointmentsPatient,
  Contents,
  EditProfile,
  Home,
  Login,
  NotFound,
  Profile,
  PreLogin,
  Register,
  WriteContent,
  ScheduleNewAppointment,
  Payment,
} from './pages';
import { 
  Footer, 
  Header 
} from './components';

import App from './App';
import { getToken } from './utils/auth';
import { AppointmentItem } from './pages/home/styles';

//Para as rotas que precisam de Footer e Header
function HasFooterAndHeaderRoutes() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const auth = getToken();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<HasFooterAndHeaderRoutes />}>
        <Route index element={auth ? <Home /> : <PreLogin />} />
        <Route path="appointmentsPatient" element={<AppointmentsPatient />} />
        <Route path="contents" element={<Contents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
  <Route path="write-content" element={<WriteContent />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="schedule-new-appointment" element={<ScheduleNewAppointment />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}