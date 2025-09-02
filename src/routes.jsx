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
} from './pages';
import { 
  Footer, 
  Header 
} from './components';

import App from './App';

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

const auth = false; //TO DO: Implementar o sistema de obter autenticação;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<HasFooterAndHeaderRoutes />}>
        <Route index element={auth ? <Home /> : <PreLogin />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="contents" element={<Contents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}