export interface Friend {
  id: number;
  status: string;
  friend: {
    username: string;
    email: string;
    profile_picture?: string;
    firstname?: string;
    lastname?: string;
  };
}