export default class Patient {
	constructor(
        public id: string,
        public name: string, 
        public avatar: string, 
        public description: string, 
        public website: string, 
        public createdAt: Date, 
        public age?: number, 
        public gender?: string, 
        public address?: string
    ) {
	}
}
