/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';
import Patient from '../models/patient';
const setShowModal = (_show: boolean) => {};
const setPatientToShow = (_patient: Patient) => {};
export const ModalContext = createContext({setPatientToShow, setShowModal});
