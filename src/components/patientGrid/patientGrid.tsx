import theme from "./patientGrid.theme.module.scss";
import Patient from "../../models/patient";
import { useCollapse } from "react-collapsed";
import FormModal from "../formModal/formModal";
import { useState } from "react";
import noImage from "../../assets/user.jpeg";

type PatientGridProps = {
  patients: Patient[];
};

function PatientGrid({ patients }: PatientGridProps) {
  return (
    <div className={theme.mainContainer}>
      <div className={theme.title}>OUR PATIENTS</div>
      <div className={theme.titleLine}></div>
      <div className={theme.grid}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}

type PatientCardProps = {
  patient: Patient;
};

function PatientCard({ patient }: PatientCardProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={theme.card}>
        <img src={patient.avatar ?? noImage} className={theme.avatar} />
        <div className={theme.row}>
          {" "}
          <div className={theme.line}></div>
        </div>

        <div className={theme.row}>
          <div className={theme.textBody}>
            <div className={theme.name}>{patient.name}</div>
            <div className={theme.mainInfo}>
              {patient.gender ? patient.gender : "No gender data"}
              {", "}
              {patient.age ? "Age " + patient.age : "No age data"}
              <br />
              {patient.address ? patient.address : "No address data"}
            </div>

            <section {...getCollapseProps()} className={theme.mainInfo}>
              <strong>Description: </strong> {patient.description}
              <br />
              <br />
              <strong>Created at: </strong>{" "}
              {patient.createdAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </section>
            <div className={theme.readMore} {...getToggleProps()}>
              {isExpanded ? "Read less" : "Read more"} &gt;
            </div>
          </div>
          <div className={theme.column}>
            {" "}
            <span
              className={"material-symbols-outlined " + theme.editButton}
              onClick={() => setShowModal(true)}
            >
              edit
            </span>
            <a
              href={
                !patient.website?.includes(".") ? undefined : patient.website
              }
              title={
                !patient.website?.includes(".")
                  ? "Invalid website data!"
                  : undefined
              }
            >
              <span
                className={
                  "material-symbols-outlined " +
                  (!patient.website?.includes(".")
                    ? theme.invalidWeb
                    : theme.webLink)
                }
              >
                language
              </span>
            </a>
          </div>
        </div>
      </div>
      {showModal && (
        <FormModal patient={patient} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default PatientGrid;
