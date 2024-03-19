import { Plan } from "./plan";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  plan?: Plan;
  role: string;
}
