import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
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
} from "./pages";
import { Footer, Header } from "./components";

import App from "./App";
import { useAuthStore } from "./stores/useAuthStore";
import { AppointmentItem } from "./pages/home/styles";
import ProtectedRoute from "./utils/protectedRoute";
import UnauthRoute from "./utils/unauthRoute";
import { useCurrentUser } from "./services/useCurrentUser";

function HasFooterAndHeaderRoutes() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function AppointmentsRoute() {
  const { data: user } = useCurrentUser();
  return (
    <>
      {user?.type === "psychologist" ? (
        <AppointmentsPsychologist />
      ) : (
        <AppointmentsPatient />
      )}
    </>
  );
}

function AddAvailabilitiesRoute() {
  const { data: user } = useCurrentUser();
  return (
    <>{user?.type === "psychologist" ? <AddAvailabilities /> : <Home />}</>
  );
}

function WriteContentRoute() {
  const { data: user } = useCurrentUser();
  return <>{user?.type === "psychologist" ? <WriteContent /> : <Home />}</>;
}

function HomeRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Home /> : <PreLogin />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<UnauthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<HasFooterAndHeaderRoutes />}>
        <Route index element={<HomeRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomeRoute />} />
          <Route path="appointments" element={<AppointmentsRoute />} />
          <Route
            path="add-availabilities"
            element={<AddAvailabilitiesRoute />}
          />
          <Route path="contents" element={<Contents />} />
          <Route path="write-content" element={<WriteContentRoute />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route
            path="schedule-new-appointment"
            element={<ScheduleNewAppointment />}
          />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<HomeRoute />} />
      </Route>
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
