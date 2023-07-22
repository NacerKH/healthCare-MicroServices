// Forum.model.ts

export interface Forum {
    _id: string,
    posterId?: string;
    message?: string;
    likers?: string[];
    comments?: Comment[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Comment {
    _id: string,
    commenterId?: string;
    commenterPseudo?: string;
    text?: string;
    gifurl?: string;
    timestamp?: number;
  }
  