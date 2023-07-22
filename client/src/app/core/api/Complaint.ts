export interface Complaint {
    medecineId:number;
    userId: number; // Optional property
    _id: string; // Optional property for MongoDB ObjectId
    title: string;
    description: string; // Optional property
    type: string; // Optional property
    // Optional property
    createdAt?: Date; 
    updatedAt?: Date; 
}
