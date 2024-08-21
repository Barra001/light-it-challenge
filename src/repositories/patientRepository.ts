import Patient from "../models/patient";

let localPatients: Patient[] = [];
const apiUrl = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export async function getPatients(): Promise<Patient[]> {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const promiseList = await (( jsonData as Patient[])
    .map(async (patient: Patient) => 
        {
            let avatar = patient.avatar;
            if(avatar && avatar.includes(".com")){
                try{
                    const response = await fetch(avatar)
                    if(!response || !response.ok){
                        avatar = undefined;
                    }
                }catch{
                    avatar = undefined;
                }
            }else{
                avatar = undefined;
            }

            return new Patient(patient.id, patient.name, 
                patient.description, patient.website,
                patient.createdAt ? new Date(patient.createdAt)
                 : undefined,avatar, 
         patient.age, patient.gender, patient.address);
        }));
    localPatients = await Promise.all (promiseList);
    
    return localPatients;
}