export interface Prediction {
  status: "starting" | "processing" | "succeeded";
  id: string;
  output: [string, string, string, string, string];
}
export interface Session {
  expires: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}
