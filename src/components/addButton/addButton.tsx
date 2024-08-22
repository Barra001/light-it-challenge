import { useContext } from "react";
import theme from "./addButton.theme.module.scss";
import { ModalContext } from "../../contexts/patientModalContext";
import Patient from "../../models/patient";

function AddButton() {
  const { setPatientToShow, setShowModal } = useContext(ModalContext);
  return (
    <div className={theme.mainContainer}>
      <span
        className={"material-symbols-outlined " + theme.icon}
        onClick={() => {
          setPatientToShow(Patient.createEmpty());
          setShowModal(true);
        }}
      >
        add
      </span>
    </div>
  );
}

export default AddButton;
