
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOfficial?: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  timestamp: string;
  isOfficialReply?: boolean;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  department: string;
  status: "Reported" | "In Progress" | "Resolved";
  author: User;
  timestamp: string;
  location: {
    address: string;
    mapCoordinates: { y: number; x: number }; // y is lat, x is lng
  };
  comments: Comment[];
  upvotes: number;
}

export interface Official {
  id: string;
  name: string;
  department: string;
  contactInformation: string;
}
