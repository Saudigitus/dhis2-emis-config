export const ALL_ATTRIBUTES = [
    { key: 'fullName', label: 'Nome completo' },
    { key: 'systemId', label: 'Código do sistema' },
    { key: 'dateOfBirth', label: 'Data de nascimento' },
    { key: 'gender', label: 'Sexo' },
    { key: 'nationality', label: 'Nacionalidade' },
    { key: 'enrollmentStatus', label: 'Estado de matrícula' },
    { key: 'guardian', label: 'Encarregado' },
    { key: 'guardianContact', label: 'Contacto do encarregado' },
    { key: 'distanceToSchool', label: 'Distância à escola' },
    { key: 'modeOfTransport', label: 'Meio de transporte' },
    { key: 'foodProgramme', label: 'Programa alimentar' },
    { key: 'disability', label: 'Deficiência' },
    { key: 'orphanStatus', label: 'Estado de orfandade' },
    { key: 'householdIncome', label: 'Rendimento familiar' },
    { key: 'numberOfSiblings', label: 'Número de irmãos' },
];

export const SECTIONS = [
    { id: 1, headerLabel: 'Section 1 · Names', placeholder: 'Add attribute…', max: 5 },
    { id: 2, headerLabel: 'Section 2 · Subtitle', placeholder: 'Add attribute…', max: 5 },
    { id: 3, headerLabel: 'Section 3 · Tags', placeholder: 'Add attribute…', max: 5 },
];

export type SectionConfig = (typeof SECTIONS)[number];
