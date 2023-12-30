export interface IFormNote {
	title: string;
	createdAt?: Date;
	body: string;
	id: string;
}

export interface IUser {
	username: string
}

export interface IFormUser extends IUser {
	password: string
}