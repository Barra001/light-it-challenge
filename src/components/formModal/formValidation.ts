export type FormData = {
    name: string;
    age?: number;
    gender?: number;
    address?: string;
    avatar?: string;
    description: string;
    website: string;
  };
  
  export  type FormErrors = {
    name: string;
    age: string;
    gender: string;
    address: string;
    avatar: string;
    description: string;
    website: string;
  };

export const validateForm = (data: FormData) => {
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