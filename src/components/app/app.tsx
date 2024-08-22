import { useState, useEffect } from "react";
import { getPatients } from "../../repositories/patientRepository";
import Patient from "../../models/patient";
import Loader from "../loader/loader";
import PatientGrid from "../patientGrid/patientGrid";
import { PatientsContext } from "../../contexts/patientsContext";
import { ModalContext } from "../../contexts/patientModalContext";
import { SnackbarProvider } from "notistack";
import FormModal from "../formModal/formModal";
import AddButton from "../addButton/addButton";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [patientToShow, setPatientToShow] = useState(Patient.createEmpty());
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const handleGetPatients = async () => {
      setIsLoading(true);
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    };
    void handleGetPatients();
  }, []);

  return (
    <>
      <SnackbarProvider>
        <ModalContext.Provider value={{ setPatientToShow, setShowModal }}>
          <PatientsContext.Provider value={{ patients, setPatients }}>
            {isLoading && <Loader />}
            <PatientGrid />
            <AddButton />
            {showModal && (
              <FormModal
                patient={patientToShow}
                handleClose={() => setShowModal(false)}
                show={showModal}
              />
            )}
          </PatientsContext.Provider>
        </ModalContext.Provider>
      </SnackbarProvider>
    </>
  );
}

export default App;
