/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getPatients } from "../../repositories/patientRepository";
import Patient from "../../models/patient";
import Loader from "../loader/loader";
import PatientGrid from "../patientGrid/patientGrid";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[] | undefined>();

  useEffect(() => {
    const handleGetPatients = async () => {
      setIsLoading(true);
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
        console.log(patients);
        console.log(isLoading);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    };
    void handleGetPatients();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <PatientGrid patients={patients || []} />
    </>
  );
}

export default App;
