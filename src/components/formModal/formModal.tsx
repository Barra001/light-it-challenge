import { ChangeEvent, FormEvent, useState } from "react";
import Patient from "../../models/patient";
import SimpleTextInput, { TextAreaInput } from "../textInput/textInput";
import theme from "./formModal.theme.module.scss";

type FormModalProps = {
  handleClose: () => void;
  patient: Patient;
};

type FormData = {
  name: string;
  age?: number;
  gender?: string;
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

function FormModal({ handleClose, patient }: FormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
    } else {
      // send error state to form
      // const form = e.target as HTMLFormElement;
      // form.checkValidity();
    }
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
      errors.name = "Username must be at least 4 characters long";
    }

    if (!data.website.trim()) {
      errors.website = "Email is required";
    } else if (!data.website.includes(".com")) {
      errors.website = "Website is invalid";
    }

    if (data.avatar && !data.avatar.includes(".com")) {
      errors.avatar = "Avatar URL is invalid";
    }

    if (!data.description.trim()) {
      errors.description = "Description is required";
    } else if (data.description.length < 12) {
      errors.description = "Description must be at least 8 characters long";
    }

    if (data.address && data.address.length < 12) {
      errors.description = "Address must be at least 12 characters long";
    }

    return errors;
  };

  return (
    <div className={theme.modalBackdrop} onClick={() => handleClose()}>
      <form
        onSubmit={handleSubmit}
        className={theme.modal}
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
            src={patient.avatar}
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
          <SimpleTextInput
            placeholder="Age"
            id="AgeInputId"
            error={formErrors.age}
            onChange={handleChange}
            value={formData.age?.toString() ?? "0"}
          />
          <div className={theme.separator}></div>
          <SimpleTextInput
            placeholder="Gender"
            id="GenderInputId"
            error={formErrors.gender}
            onChange={handleChange}
            value={formData.gender ?? ""}
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
        <button className={theme.closeBtn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default FormModal;
