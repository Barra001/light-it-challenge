/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';
import Patient from '../models/patient';
const setShowModal = (show: boolean) => {};
const setPatientToShow = (patient: Patient) => {};
export const ModalContext = createContext({setPatientToShow, setShowModal});
