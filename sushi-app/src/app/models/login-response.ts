export interface LoginResponse {
  message: string;
  token: string;
  user?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
}