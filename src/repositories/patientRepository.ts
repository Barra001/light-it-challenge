import Patient from "../models/patient";

export async function getPatients(): Promise<Patient[]> {
    return fetch("https://63bedcf7f5cfc0949b634fc8.mockapi.io/users")
        .then((response) => response.json())
        .then((data) => data.map((patient: Patient) => 
            {
                const someAvatarImage = "https://picsum.photos/200/200?random=" + patient.id;
                return new Patient(patient.id, patient.name, someAvatarImage, 
                    patient.description, patient.website, new Date(patient.createdAt),
             patient.age, patient.gender, patient.address);
            }));
}