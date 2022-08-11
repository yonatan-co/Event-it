export interface IEvent {
  title: string;
  descraption: string;
  creator: ObjectId;
  location: string;
  date: Date;
  photos?: string[];
}

// types for multer (file uploads).
export type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;
