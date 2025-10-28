
import type { Issue, User, Comment, Official } from "./types";
import placeholderImages from "./placeholder-images.json";

const allImages = placeholderImages.placeholderImages;

export const users: { [key: string]: User } = {
  ananya: {
    id: "user-1",
    name: "Ananya Sharma",
    avatar: allImages.find((img) => img.id === "avatar-1")?.imageUrl || "",
  },
  rohan: {
    id: "user-2",
    name: "Rohan Verma",
    avatar: allImages.find((img) => img.id === "avatar-2")?.imageUrl || "",
  },
  priya: {
    id: "user-3",
    name: "Priya Patel",
    avatar: allImages.find((img) => img.id === "avatar-3")?.imageUrl || "",
  },
  arjun: {
    id: "user-4",
    name: "Arjun Singh",
    avatar: allImages.find((img) => img.id === "avatar-4")?.imageUrl || "",
  },
  official: {
    id: "user-official",
    name: "Mr. Gupta (PWD Official)",
    avatar:
      allImages.find((img) => img.id === "avatar-official")?.imageUrl || "",
    isOfficial: true,
  },
};

const comments: Comment[] = [
  {
    id: "comment-1",
    text: "I live nearby and this has been a problem for weeks!",
    author: users.rohan,
    timestamp: "2024-07-22T10:30:00Z",
  },
  {
    id: "comment-2",
    text: "Thanks for reporting this. It's dangerous for cyclists.",
    author: users.priya,
    timestamp: "2024-07-22T11:00:00Z",
  },
  {
    id: "comment-3",
    text: "Our team has been dispatched to assess the damage. We expect to begin repairs within 48 hours.",
    author: users.official,
    timestamp: "2024-07-23T09:00:00Z",
    isOfficialReply: true,
  },
  {
    id: "comment-4",
    text: "This whole area needs better waste management.",
    author: users.ananya,
    timestamp: "2024-07-21T15:00:00Z",
  },
  {
    id: "comment-5",
    text: "It's a health hazard. I hope they clear it soon.",
    author: users.arjun,
    timestamp: "2024-07-21T16:00:00Z",
  },
];

const issueImages = {
  pothole: allImages.find((img) => img.id === "issue-pothole"),
  garbage: allImages.find((img) => img.id === "issue-garbage"),
  streetlight: allImages.find((img) => img.id === "issue-streetlight"),
  waterLogging: allImages.find((img) => img.id === "issue-water-logging"),
  brokenPipe: allImages.find((img) => img.id === "issue-broken-pipe"),
};

export const issues: Issue[] = [
  {
    id: "issue-1",
    title: "Massive Pothole on Janpath",
    description:
      "A very large and dangerous pothole has formed on Janpath, near Connaught Place. It's causing traffic issues and could damage vehicles.",
    imageUrl: issueImages.pothole?.imageUrl || "",
    imageHint: issueImages.pothole?.imageHint || "pothole road",
    department: "Public Works Department",
    status: "In Progress",
    author: users.ananya,
    timestamp: "2024-07-22T09:15:00Z",
    location: {
      address: "12 Janpath, Connaught Place, New Delhi",
      mapCoordinates: { y: 28.627, x: 77.216 },
    },
    comments: [comments[0], comments[1], comments[2]],
    upvotes: 42,
  },
  {
    id: "issue-2",
    title: "Garbage Overflow at Lodhi Garden",
    description:
      "The garbage bins at the main entrance of Lodhi Garden are overflowing. It's attracting pests and smells terrible. Needs immediate attention.",
    imageUrl: issueImages.garbage?.imageUrl || "",
    imageHint: issueImages.garbage?.imageHint || "garbage overflow",
    department: "Sanitation Department",
    status: "Reported",
    author: users.rohan,
    timestamp: "2024-07-21T14:00:00Z",
    location: {
      address: "Lodhi Garden, Lodhi Estate, New Delhi",
      mapCoordinates: { y: 28.5925, x: 77.2188 },
    },
    comments: [comments[3], comments[4]],
    upvotes: 28,
  },
  {
    id: "issue-3",
    title: "Streetlight Out on Shambhajinagar Road",
    description:
      "The streetlight at the intersection of Shambhajinagar Road and Safdarjung Lane has been out for three nights. It's very dark and feels unsafe.",
    imageUrl: issueImages.streetlight?.imageUrl || "",
    imageHint: issueImages.streetlight?.imageHint || "broken streetlight",
    department: "Electricity Department",
    status: "Resolved",
    author: users.priya,
    timestamp: "2024-07-19T21:00:00Z",
    location: {
      address: "APJ Abdul Kalam Rd & Safdarjung Ln, New Delhi",
      mapCoordinates: { y: 28.600, x: 77.220 },
    },
    comments: [],
    upvotes: 15,
  },
  {
    id: "issue-4",
    title: "Water Logging after rain in Chandni Chowk",
    description:
      "Heavy water logging on the main Chandni Chowk road after yesterday's rain. It is impossible to walk or drive through this section. Drainage system seems blocked.",
    imageUrl: issueImages.waterLogging?.imageUrl || "",
    imageHint: issueImages.waterLogging?.imageHint || "flooded street",
    department: "Drainage Department",
    status: "Reported",
    author: users.arjun,
    timestamp: "2024-07-23T08:00:00Z",
    location: {
      address: "Chandni Chowk, near Red Fort, New Delhi",
      mapCoordinates: { y: 28.656, x: 77.241 },
    },
    comments: [],
    upvotes: 35,
  },
];

export const departments = [
  "Public Works Department",
  "Sanitation Department",
  "Electricity Department",
  "Water Supply Board",
  "Drainage Department",
  "Parks and Recreation",
  "Traffic Police",
];

export const officials: Official[] = [
    {
        id: "official-1",
        name: "Rajesh Kumar",
        department: "Public Works Department",
        contactInformation: "rajesh.kumar.pwd@gov.in"
    },
    {
        id: "official-2",
        name: "Sunita Singh",
        department: "Sanitation Department",
        contactInformation: "s.singh.sanitation@gov.in"
    },
    {
        id: "official-3",
        name: "Amit Patel",
        department: "Water Supply Board",
        contactInformation: "apatel.wsb@gov.in"
    }
];
