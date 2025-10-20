import { Outlet } from "react-router-dom";
import { MainContainer } from "./AppStyle";
import { ToastContainer } from "./components";

function App() {
  return (
    <MainContainer>
      <Outlet />
      <ToastContainer />
    </MainContainer>
  );
}

export default App;
