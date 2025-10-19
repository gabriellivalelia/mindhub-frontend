import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  AddAvailabilities, 
  AppointmentsPatient,
  AppointmentsPsychologist,
  Contents,
  EditProfile,
  Home,
  Login,
  Unauthorized,
  NotFound,
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
import { getToken, getUserType } from './utils/auth';
import { AppointmentItem } from './pages/home/styles';
import ProtectedRoute from './utils/protectedRoute';
import UnauthRoute from './utils/unauthRoute';

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
          <Route index element={auth ? <Home /> : <Unauthorized />} />
          <Route
            path="appointments"
            element={<ProtectedRoute>{getUserType() === 'psychologist' ? <AppointmentsPsychologist /> : <AppointmentsPatient />}</ProtectedRoute>}
          />
          <Route
            path="add-availabilities"
            element={<ProtectedRoute>{getUserType() === 'psychologist' ? <AddAvailabilities /> : <Home />}</ProtectedRoute>}
          />
          <Route path="contents" element={<ProtectedRoute><Contents /></ProtectedRoute>} />
          <Route path="write-content" element={<ProtectedRoute><WriteContent /></ProtectedRoute>} />
          <Route path="edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="schedule-new-appointment" element={<ProtectedRoute><ScheduleNewAppointment /></ProtectedRoute>} />
          <Route path="payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      <Route path="login" element={<UnauthRoute><Login /></UnauthRoute>} />
      <Route path="register" element={<UnauthRoute><Register /></UnauthRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}