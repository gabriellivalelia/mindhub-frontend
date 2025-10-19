// Mock data for the Home page (next appointment + upcoming list)

// For testing the "Reagendar" flow, expose only a past appointment and no next appointment
export const homeUpcoming = [
  // past appointment (patient's last) - professionalId 3 maps to Dra. Camila Ferreira in psychologists data
  {
    id: 201,
    datetime: "2025-10-01T10:00:00Z",
    professionalId: 3,
    professional: "Dra. Camila Ferreira",
    professionalPicture: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "Realizada",
    location: "Consulta online",
    price: "R$ 160,00",
    duration: "50 min",
  },
  // another past appointment (to test 'mark as completed' when not yet completed)
  {
    id: 202,
    datetime: "2025-10-10T09:00:00Z",
    professionalId: 2,
    professional: "Dr. Marcos Silva",
    professionalPicture: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "Confirmada",
    location: "Clínica Centro",
    price: "R$ 140,00",
    duration: "50 min",
  },
  // appointment scheduled for today to test psychologist's "Consultas de Hoje"
  {
    id: 204,
    datetime: "2025-10-17T15:30:00Z",
    professionalId: 1,
    professional: "Dra. Laura Mendes",
    professionalPicture: "https://randomuser.me/api/portraits/women/10.jpg",
    // patient-specific fields (shown to psychologists)
    patient: "João Carvalho",
    patientPicture: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Agendada",
    location: "Consulta online",
    price: "R$ 150,00",
    duration: "50 min",
  },
  // upcoming appointment for scheduling flow
  {
    id: 203,
    datetime: "2025-11-05T14:30:00Z",
    professionalId: 1,
    professional: "Dra. Laura Mendes",
    professionalPicture: "https://randomuser.me/api/portraits/women/10.jpg",
    status: "Agendada",
    location: "Consulta online",
    price: "R$ 150,00",
    duration: "50 min",
  },
  // next appointment for the patient view happening today as well
  {
    id: 205,
    datetime: "2025-10-18T02:00:00Z",
    professionalId: 2,
    professional: "Marcos Silva",
    professionalPicture: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "Agendada",
    location: "Clínica Centro",
    price: "R$ 140,00",
    duration: "50 min",
  },
];

export const nextAppointment = null;

export default { homeUpcoming, nextAppointment };
