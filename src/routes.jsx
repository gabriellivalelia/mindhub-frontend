import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  Consultations,
  Contents,
  EditProfile,
  Home,
  Login,
  NotFound,
  Profile,
  PreLogin,
  Register,
  ScheduleNewAppointment,
  Payment,
} from './pages';
import { 
  Footer, 
  Header 
} from './components';

import App from './App';
import { getToken } from './utils/auth';

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
        <Route path="consultations" element={<Consultations />} />
        <Route path="contents" element={<Contents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
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