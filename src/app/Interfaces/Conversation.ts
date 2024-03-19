import { response } from "./response";
import { User } from "./user";

export interface conversation {
    id: number;
    prompt: string;
    client : User;
    response : response;
}