export interface Complaint {
    _id: string; // Optional property for MongoDB ObjectId
    title: string;
    description: string; // Optional property
    type: string; // Optional property
    userId: number; // Optional property
    createdAt?: Date; 
    updatedAt?: Date; 
}
