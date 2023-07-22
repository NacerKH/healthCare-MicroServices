export interface User {
    _id?: string;
    pseudo?: string;
    email?: string;
    password?: string;
    picture?: string;
    bio?: string;
    role?: 'patient' | 'medecin'; // The role can be either 'patient' or 'medecin' (doctor)
    followers?: string;
    following?: string;
    // Add other properties as needed for your appointment model
}
