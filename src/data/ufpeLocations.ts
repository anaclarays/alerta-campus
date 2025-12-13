export interface UFPELocation {
  id: string;
  name: string;
  shortName: string;
  coordinates: [number, number];
  description: string;
}

export const ufpeLocations: UFPELocation[] = [
  {
    id: 'cac',
    name: 'CAC - Centro de Artes e Comunicação',
    shortName: 'CAC',
    coordinates: [-8.05428, -34.95184],
    description: 'Centro de Artes e Comunicação da UFPE',
  },
  {
    id: 'cb',
    name: 'CB - Centro de Biociências',
    shortName: 'CB',
    coordinates: [-8.05097, -34.94825],
    description: 'Centro de Biociências da UFPE',
  },
  {
    id: 'ccen',
    name: 'CCEN - Centro de Ciências Exatas e da Natureza',
    shortName: 'CCEN',
    coordinates: [-8.05072, -34.95103],
    description: 'Centro de Ciências Exatas e da Natureza da UFPE',
  },
  {
    id: 'ce',
    name: 'CE - Centro de Educação',
    shortName: 'CE',
    coordinates: [-8.05292, -34.95378],
    description: 'Centro de Educação da UFPE',
  },
  {
    id: 'cin',
    name: 'CIn - Centro de Informática',
    shortName: 'CIn',
    coordinates: [-8.05494, -34.95128],
    description: 'Centro de Informática da UFPE',
  },
  {
    id: 'ccj',
    name: 'CCJ - Centro de Ciências Jurídicas',
    shortName: 'CCJ',
    coordinates: [-8.05185, -34.95305],
    description: 'Centro de Ciências Jurídicas da UFPE',
  },
  {
    id: 'ccm',
    name: 'CCM - Centro de Ciências Médicas',
    shortName: 'CCM',
    coordinates: [-8.05649, -34.95245],
    description: 'Centro de Ciências Médicas da UFPE',
  },
  {
    id: 'ccs',
    name: 'CCS - Centro de Ciências da Saúde',
    shortName: 'CCS',
    coordinates: [-8.05523, -34.95345],
    description: 'Centro de Ciências da Saúde da UFPE',
  },
  {
    id: 'ccsa',
    name: 'CCSA - Centro de Ciências Sociais Aplicadas',
    shortName: 'CCSA',
    coordinates: [-8.05051, -34.95248],
    description: 'Centro de Ciências Sociais Aplicadas da UFPE',
  },
  {
    id: 'cfch',
    name: 'CFCH - Centro de Filosofia e Ciências Humanas',
    shortName: 'CFCH',
    coordinates: [-8.05155, -34.95487],
    description: 'Centro de Filosofia e Ciências Humanas da UFPE',
  },
  {
    id: 'ctg',
    name: 'CTG - Centro de Tecnologia e Geociências',
    shortName: 'CTG',
    coordinates: [-8.05548, -34.95535],
    description: 'Centro de Tecnologia e Geociências da UFPE',
  },
  {
    id: 'bc',
    name: 'BC - Biblioteca Central',
    shortName: 'BC',
    coordinates: [-8.05234, -34.95035],
    description: 'Biblioteca Central da UFPE',
  },
  {
    id: 'concha',
    name: 'Concha Acústica',
    shortName: 'Concha',
    coordinates: [-8.05324, -34.95158],
    description: 'Concha Acústica da UFPE',
  },
  {
    id: 'editora',
    name: 'Editora Universitária',
    shortName: 'Editora',
    coordinates: [-8.05403, -34.94985],
    description: 'Editora Universitária da UFPE',
  },
];

export const centrosAcademicos = [
  'CAC - Centro de Artes e Comunicação',
  'CB - Centro de Biociências',
  'CCEN - Centro de Ciências Exatas e da Natureza',
  'CCJ - Centro de Ciências Jurídicas',
  'CCS - Centro de Ciências da Saúde',
  'CCM - Centro de Ciências Médicas',
  'CCSA - Centro de Ciências Sociais Aplicadas',
  'CE - Centro de Educação',
  'CFCH - Centro de Filosofia e Ciências Humanas',
  'CIn - Centro de Informática',
  'CTG - Centro de Tecnologia e Geociências',
];
