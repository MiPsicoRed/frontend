export interface Therapist {
  id: string;
  name: string;
  specialty: string[];
  bio: string;
  rating: number;
  reviewsCount: number;
  sessionPrice: number;
  image: string;
  availability: string[];
  education: string;
  languages: string[];
}

export const therapistsData: Therapist[] = [
  {
    id: 'therapist-1',
    name: 'Dra. Elena Ruiz Belmonte',
    specialty: ['Terapia Cognitivo-Conductual', 'Ansiedad y Depresión', 'Manejo del Estrés'],
    bio: 'Especialista en trastornos del estado de ánimo con más de 12 años de experiencia clínica. Enfoque práctico orientado a metas y herramientas prácticas para el día a día.',
    rating: 4.9,
    reviewsCount: 142,
    sessionPrice: 55,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    availability: ['Lunes 10:00 - 14:00', 'Miércoles 16:00 - 20:00', 'Viernes 09:00 - 15:00'],
    education: 'Doctorado en Psicología Clínica - Universidad Complutense de Madrid',
    languages: ['Español', 'Inglés']
  },
  {
    id: 'therapist-2',
    name: 'Dr. Alejandro Silva',
    specialty: ['Psicoanálisis Clínico', 'Crecimiento Personal', 'Conflictos Existenciales'],
    bio: 'Comprometido en guiar a las personas a explorar el inconsciente, buscando sanar desde la raíz. Espacio reflexivo, empático y libre de juicios para un autoconocimiento profundo.',
    rating: 4.8,
    reviewsCount: 98,
    sessionPrice: 60,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    availability: ['Martes 11:00 - 18:00', 'Jueves 15:00 - 21:00'],
    education: 'Maestría en Clínica Psicoanalítica - Universidad de Buenos Aires',
    languages: ['Español', 'Portugués']
  },
  {
    id: 'therapist-3',
    name: 'Msc. Clara Benítez',
    specialty: ['Terapia de Pareja', 'Terapia Familiar', 'Conflictos de Relación'],
    bio: 'Experta en dinámicas interpersonales, resolución de conflictos de pareja y comunicación asertiva. Ofrece soluciones y mediaciones centradas en el respeto mutuo.',
    rating: 4.9,
    reviewsCount: 120,
    sessionPrice: 50,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400&h=400',
    availability: ['Lunes 15:00 - 20:00', 'Jueves 09:00 - 14:00', 'Sábado 10:00 - 13:00'],
    education: 'Especialización en Terapia Familiar Distancia - Universidad Autónoma de Barcelona',
    languages: ['Español', 'Catalán']
  },
  {
    id: 'therapist-4',
    name: 'Msc. Javier Morales Ortiz',
    specialty: ['Psicología Infantil y Adolescentes', 'TDAH', 'Dificultades del Aprendizaje'],
    bio: 'Pasión por el bienestar de los jóvenes. Empleo dinámicas lúdicas y adaptadas para el desarrollo saludable de la mente infantil y la orientación familiar.',
    rating: 4.7,
    reviewsCount: 84,
    sessionPrice: 45,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    availability: ['Miércoles 09:00 - 13:00', 'Viernes 14:00 - 19:00'],
    education: 'Máster en Neuropsicología Infantil - Universidad de Sevilla',
    languages: ['Español']
  },
  {
    id: 'therapist-5',
    name: 'Dra. Sofía Varela',
    specialty: ['Mindfulness', 'Terapia de Aceptación y Compromiso', 'Manejo del Trauma'],
    bio: 'Combina técnicas científicas occidentales con prácticas de atención plena orientales. Ayuda a navegar fobias, ansiedad generalizada y estrés postraumático.',
    rating: 5.0,
    reviewsCount: 76,
    sessionPrice: 65,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=400',
    availability: ['Martes 08:00 - 13:00', 'Miércoles 14:00 - 18:00', 'Jueves 08:00 - 13:00'],
    education: 'Ph.D. en Psicología Integradora - Universidad Autónoma de Madrid',
    languages: ['Español', 'Inglés', 'Francés']
  }
];
