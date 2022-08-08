export interface IPhoto {
  photoUrl: string;
  main: boolean;
}

export interface IEvent {
  title: string;
  descraption: string;
  creator: ObjectId;
  location: string;
  date: Date;
  photos?: IPhoto[];
}
