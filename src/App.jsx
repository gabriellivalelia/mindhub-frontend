import { Outlet } from "react-router-dom";
import { MainContainer } from "./AppStyle";

function App() {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
}

export default App;