import {createContext} from 'react';
import Patient from '../models/patient';
const patients:Patient[] = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setPatients = (_patients: Patient[]) => {};
export const PatientsContext = createContext({patients, setPatients});
