import { Timestamp } from "firebase/firestore";

// Function to generate a slug based on the title
export function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}
export const timestampToDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US");
};
