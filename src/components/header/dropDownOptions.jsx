import { Link } from "react-router-dom";


export const DropDownOptions = (authenticated)=> authenticated
  ? [
      {
        key: "1",
        label: <Link to="/">Home</Link>,
      },
      {
        key: "2",
        label: <Link to="/consultations">Consultas</Link>,
      },
      {
        key: "3",
        label: <Link to="/contents">Conteúdos</Link>,
      },
      ]
    : [];