export default class Patient {
        
	constructor(
        public id: string,
        public name: string, 
        public description: string, 
        public website: string, 
        public createdAt: Date, 
        public avatar?: string, 
        public age?: number, 
        public gender?: string, 
        public address?: string
    ) {
	}

    static createEmpty(): Patient {
        return new Patient("", "", "", "", new Date(),
         undefined, undefined, undefined, undefined);
    }

    static possibleLocalGenders: string[] = ["Male", "Female", "Other"];
}
