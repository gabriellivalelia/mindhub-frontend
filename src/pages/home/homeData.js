// Mock data for the Home page (next appointment + upcoming list)
export const homeUpcoming = [
  {
    id: 101,
    datetime: "2025-10-15T10:00:00Z",
    professional: "Dra. Marina Rocha",
    professionalPicture: "https://randomuser.me/api/portraits/women/10.jpg",
    status: "Agendada",
    location: "Consulta online",
    price: "R$ 150,00",
    duration: "50 min",
  },
  {
    id: 102,
    datetime: "2025-10-20T14:30:00Z",
    professional: "Dr. Rafael Moreira",
    professionalPicture: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "Confirmada",
    location: "Clínica Centro",
    price: "R$ 180,00",
    duration: "50 min",
  },
  {
    id: 103,
    datetime: "2025-10-22T09:00:00Z",
    professional: "Dra. Paula Fernandes",
    professionalPicture: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "Agendada",
    location: "Consulta online",
    price: "R$ 160,00",
    duration: "50 min",
  },
  {
    id: 104,
    datetime: "2025-10-25T16:15:00Z",
    professional: "Dr. André Gomes",
    professionalPicture: "https://randomuser.me/api/portraits/men/13.jpg",
    status: "Agendada",
    location: "Clínica Leste",
    price: "R$ 140,00",
    duration: "50 min",
  },
  {
    id: 105,
    datetime: "2025-11-01T08:45:00Z",
    professional: "Dra. Juliana Alves",
    professionalPicture: "https://randomuser.me/api/portraits/women/14.jpg",
    status: "Confirmada",
    location: "Consulta online",
    price: "R$ 170,00",
    duration: "50 min",
  },
];

export const nextAppointment = homeUpcoming.length ? homeUpcoming[0] : null;

export default { homeUpcoming, nextAppointment };
