import Patient from "../models/patient";

let localPatients: Patient[] = [];
const apiUrl = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

async function sleep(ms: number):Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkFor200Response(url?: string): Promise<boolean> {
    if(!url){
        return false;
    }

    try{
        const response = await fetch(url.startsWith("https://") ?
        url : `https://${url}`);
        if(!response || !response.ok){
            return false;
        }
    }catch(e){
        console.error(e);
        return false;
    }
 
    return true;
}

export async function getPatients(): Promise<Patient[]> {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const promiseList = await (( jsonData as Patient[])
    .map(async (patient: Patient) => 
        {
          const isImageOk = await checkFor200Response(patient.avatar);

            return new Patient(patient.id, patient.name, 
                patient.description, patient.website,
                new Date(patient.createdAt),
                isImageOk ? patient.avatar : undefined, 
         patient.age, patient.gender, patient.address);
        }));
    localPatients = await Promise.all (promiseList);
    
    return localPatients;
}

export async function editPatient(patient:Patient): Promise<Patient[]>{
    await sleep(2000);
    const indexInList = localPatients.findIndex(p => p.id === patient.id);
    const listWithoutPatient = localPatients.filter(p => p.id !== patient.id);
    const isImageOk = await checkFor200Response(patient.avatar);
    const patientCopy = patient;
    patientCopy.avatar = isImageOk ? patient.avatar : undefined;
    listWithoutPatient.splice(indexInList, 0, patientCopy);
    localPatients = listWithoutPatient;
    return localPatients;
}

export async function addPatient(patient:Patient): Promise<Patient[]>{
    await sleep(2000);
    const isImageOk = await checkFor200Response(patient.avatar);
    const patientCopy = patient;
    patientCopy.avatar = isImageOk ? patient.avatar : undefined;
    patientCopy.id = (localPatients.length + 1).toString();
    patientCopy.createdAt = new Date();
    localPatients.unshift(patientCopy);
    return localPatients;
}