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
    coordinates: [-8.0527, -34.9509],
    description: 'Centro de Artes e Comunicação da UFPE',
  },
  {
    id: 'cb',
    name: 'CB - Centro de Biociências',
    shortName: 'CB',
    coordinates: [-8.0512, -34.9485],
    description: 'Centro de Biociências da UFPE',
  },
  {
    id: 'ccen',
    name: 'CCEN - Centro de Ciências Exatas e da Natureza',
    shortName: 'CCEN',
    coordinates: [-8.0505, -34.9510],
    description: 'Centro de Ciências Exatas e da Natureza da UFPE',
  },
  {
    id: 'ccj',
    name: 'CCJ - Centro de Ciências Jurídicas',
    shortName: 'CCJ',
    coordinates: [-8.0535, -34.9530],
    description: 'Centro de Ciências Jurídicas da UFPE',
  },
  {
    id: 'ccs',
    name: 'CCS - Centro de Ciências da Saúde',
    shortName: 'CCS',
    coordinates: [-8.0545, -34.9505],
    description: 'Centro de Ciências da Saúde da UFPE',
  },
  {
    id: 'ccm',
    name: 'CCM - Centro de Ciências Médicas',
    shortName: 'CCM',
    coordinates: [-8.0555, -34.9495],
    description: 'Centro de Ciências Médicas da UFPE',
  },
  {
    id: 'ccsa',
    name: 'CCSA - Centro de Ciências Sociais Aplicadas',
    shortName: 'CCSA',
    coordinates: [-8.0498, -34.9525],
    description: 'Centro de Ciências Sociais Aplicadas da UFPE',
  },
  {
    id: 'ce',
    name: 'CE - Centro de Educação',
    shortName: 'CE',
    coordinates: [-8.0518, -34.9545],
    description: 'Centro de Educação da UFPE',
  },
  {
    id: 'cfch',
    name: 'CFCH - Centro de Filosofia e Ciências Humanas',
    shortName: 'CFCH',
    coordinates: [-8.0508, -34.9535],
    description: 'Centro de Filosofia e Ciências Humanas da UFPE',
  },
  {
    id: 'cin',
    name: 'CIn - Centro de Informática',
    shortName: 'CIn',
    coordinates: [-8.0550, -34.9515],
    description: 'Centro de Informática da UFPE',
  },
  {
    id: 'ctg',
    name: 'CTG - Centro de Tecnologia e Geociências',
    shortName: 'CTG',
    coordinates: [-8.0525, -34.9555],
    description: 'Centro de Tecnologia e Geociências da UFPE',
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
