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
    coordinates: [-8.050699500588593, -34.953622081334835],
    description: 'Centro de Artes e Comunicação da UFPE',
  },
  {
    id: 'cb',
    name: 'CB - Centro de Biociências',
    shortName: 'CB',
    coordinates: [-8.050339240828395, -34.948263354673394],
    description: 'Centro de Biociências da UFPE',
  },
  {
    id: 'ccen',
    name: 'CCEN - Centro de Ciências Exatas e da Natureza',
    shortName: 'CCEN',
    coordinates: [-8.05630408194283, -34.95193546436896],
    description: 'Centro de Ciências Exatas e da Natureza da UFPE',
  },
  {
    id: 'ce',
    name: 'CE - Centro de Educação',
    shortName: 'CE',
    coordinates: [-8.049282707160984, -34.95357175926145],
    description: 'Centro de Educação da UFPE',
  },
  {
    id: 'cin',
    name: 'CIn - Centro de Informática',
    shortName: 'CIn',
    coordinates: [-8.055441768125542, -34.951326608359416],
    description: 'Centro de Informática da UFPE',
  },
  {
    id: 'ccj',
    name: 'CCJ - Centro de Ciências Jurídicas',
    shortName: 'CCJ',
    coordinates: [-8.058421213914945, -34.88245883608054],
    description: 'Centro de Ciências Jurídicas da UFPE',
  },
  {
    id: 'ccm',
    name: 'CCM - Centro de Ciências Médicas',
    shortName: 'CCM',
    coordinates: [-8.051219210392986, -34.94753375293651],
    description: 'Centro de Ciências Médicas da UFPE',
  },
  {
    id: 'ccs',
    name: 'CCS - Centro de Ciências da Saúde',
    shortName: 'CCS',
    coordinates: [-8.050227631916107, -34.94702359372915],
    description: 'Centro de Ciências da Saúde da UFPE',
  },
  {
    id: 'ccsa',
    name: 'CCSA - Centro de Ciências Sociais Aplicadas',
    shortName: 'CCSA',
    coordinates: [-8.049188117449745, -34.951237947133315],
    description: 'Centro de Ciências Sociais Aplicadas da UFPE',
  },
  {
    id: 'cfch',
    name: 'CFCH - Centro de Filosofia e Ciências Humanas',
    shortName: 'CFCH',
    coordinates: [-8.04986637259787, -34.953942867985766],
    description: 'Centro de Filosofia e Ciências Humanas da UFPE',
  },
  {
    id: 'ctg',
    name: 'CTG - Centro de Tecnologia e Geociências',
    shortName: 'CTG',
    coordinates: [-8.052698820292154, -34.953939674236004],
    description: 'Centro de Tecnologia e Geociências da UFPE',
  },
  {
    id: 'bc',
    name: 'BC - Biblioteca Central',
    shortName: 'BC',
    coordinates: [-8.050944818539538, -34.95117180414746],
    description: 'Biblioteca Central da UFPE',
  },
  {
    id: 'concha',
    name: 'Concha Acústica',
    shortName: 'Concha',
    coordinates: [-8.052512026105196, -34.95199581786307],
    description: 'Concha Acústica da UFPE',
  },
  {
    id: 'editora',
    name: 'Editora Universitária',
    shortName: 'Editora',
    coordinates: [-8.055143327369061, -34.95567580336382],
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
