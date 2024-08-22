import { ChangeEvent, FormEvent, useState, useContext } from "react";
import Patient from "../../models/patient";
import SimpleTextInput, { TextAreaInput } from "../inputs/textInput";
import theme from "./formModal.theme.module.scss";
import { addPatient, editPatient } from "../../repositories/patientRepository";
import { PatientsContext } from "../../contexts/patientsContext";
import Logo from "../../assets/spinner.svg";
import { useSnackbar } from "notistack";
import noImage from "../../assets/user.jpeg";
import NumberInput from "../inputs/numberInput";
import SelectInput from "../inputs/selectInput";

type FormModalProps = {
  handleClose: () => void;
  patient: Patient;
  show: boolean;
};

type FormData = {
  name: string;
  age?: number;
  gender?: number;
  address?: string;
  avatar?: string;
  description: string;
  website: string;
};

type FormErrors = {
  name: string;
  age: string;
  gender: string;
  address: string;
  avatar: string;
  description: string;
  website: string;
};

function FormModal({ handleClose, patient, show }: FormModalProps) {
  const { setPatients } = useContext(PatientsContext);

  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<FormData>({
    name: patient.name,
    age: patient.age,
    gender: patient.gender
      ? Patient.possibleLocalGenders.indexOf(patient.gender)
      : undefined,
    address: patient.address,
    avatar: patient.avatar,
    description: patient.description,
    website: patient.website,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    age: "",
    gender: "",
    address: "",
    avatar: "",
    description: "",
    website: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validateForm(formData);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const editedPatient = new Patient(
        patient.id,
        formData.name,
        formData.description,
        formData.website,
        patient.createdAt,
        formData.avatar,
        formData.age,
        formData.gender
          ? Patient.possibleLocalGenders[formData.gender ?? 0]
          : undefined,
        formData.address
      );

      const isToAdd = patient.id === "";

      try {
        const newPatientsList = isToAdd
          ? await addPatient(editedPatient)
          : await editPatient(editedPatient);

        setPatients(newPatientsList);
        enqueueSnackbar(
          `Patient ${isToAdd ? "added" : "edited"} successfully`,
          { variant: "success" }
        );
      } catch {
        enqueueSnackbar(`Error ${isToAdd ? "adding" : "editing"} patient`, {
          variant: "error",
        });
      }
      handleClose();
    }

    setIsLoading(false);
  };

  const validateForm = (data: FormData) => {
    const errors: FormErrors = {
      name: "",
      age: "",
      gender: "",
      address: "",
      avatar: "",
      description: "",
      website: "",
    };

    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.length < 4) {
      errors.name = "Name must be at least 4 characters long";
    }

    if (!data.website.trim()) {
      errors.website = "Website is required";
    } else if (!data.website.startsWith("https://")) {
      errors.website = "Website is invalid (must start with https://)";
    }

    if (data.avatar && !data.avatar.startsWith("https://")) {
      errors.avatar = "Avatar URL is invalid (must start with https://)";
    }

    if (!data.description.trim()) {
      errors.description = "Description is required";
    } else if (data.description.length < 12) {
      errors.description = "Description must be at least 8 characters long";
    }

    if (data.address && data.address.length < 12) {
      errors.address = "Address must be at least 12 characters long";
    }

    if (data.age && data.age <= 0) {
      errors.age = "Age must be greater than 0";
    }

    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof FormErrors] === "") {
        delete errors[key as keyof FormErrors];
      }
    });

    return errors;
  };

  return (
    <div
      className={theme.modalBackdrop + " " + (show ? "" : theme.hideBackdrop)}
      onClick={() => handleClose()}
    >
      <form
        onSubmit={handleSubmit}
        className={theme.modal + " " + (show ? "" : theme.hide)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={theme.separator}></div>
        <div className={theme.row}>
          <div>
            <div className={theme.line}></div>
            <div className={theme.name}>{patient.name}</div>
            <div className={theme.mainInfo}>
              {patient.gender ? patient.gender : "No gender data"}
              {", "}
              {patient.age ? "Age " + patient.age : "No age data"}
              <br />
              {patient.address ? patient.address : "No address data"}
            </div>
          </div>
          <img
            className={theme.modalImg}
            src={patient.avatar ?? noImage}
            alt="profile pic"
          />
        </div>
        <SimpleTextInput
          placeholder="Name"
          id="NameInputId"
          required
          error={formErrors.name}
          onChange={handleChange}
          value={formData.name}
        />
        <div className={theme.row}>
          <NumberInput
            placeholder="Age"
            id="AgeInputId"
            error={formErrors.age}
            onChange={handleChange}
            value={formData.age ?? 0}
          />
          <div className={theme.separator}></div>
          <SelectInput
            placeholder="Gender"
            id="GenderInputId"
            error={formErrors.gender}
            onChange={handleChange}
            value={formData.gender?.toString() ?? "empty"}
            options={Patient.possibleLocalGenders}
          />
        </div>
        <div className={theme.row}>
          <SimpleTextInput
            placeholder="Website"
            required
            id="WebsiteInputId"
            error={formErrors.website}
            onChange={handleChange}
            value={formData.website ?? ""}
          />
          <div className={theme.separator}></div>
          <SimpleTextInput
            placeholder="Avatar"
            id="AvatarInputId"
            error={formErrors.avatar}
            onChange={handleChange}
            value={formData.avatar ?? ""}
          />
        </div>
        <SimpleTextInput
          placeholder="Address"
          id="AddressInputId"
          error={formErrors.address}
          onChange={handleChange}
          value={formData.address ?? ""}
        />
        <TextAreaInput
          placeholder="Description"
          required={true}
          id="DescriptionInputId"
          error={formErrors.description}
          onChange={handleChange}
          value={formData.description}
        />
        <div className={theme.row} style={{ justifyContent: "center" }}>
          {" "}
          <button
            className={theme.closeBtn}
            onClick={handleClose}
            disabled={isLoading}
          >
            Close
          </button>
          <div className={theme.separator}></div>
          {isLoading ? (
            <img height={50} width={50} src={Logo} className={theme.loader} />
          ) : (
            <button
              className={theme.saveBtn}
              type="submit"
              disabled={isLoading}
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormModal;
