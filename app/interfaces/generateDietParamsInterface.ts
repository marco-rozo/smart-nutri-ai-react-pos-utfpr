import { GenderEnum } from "../enums/genderEnum";

export interface GenerateDietParamsInterface {
    weight: string;
    height: string;
    age: string;
    gender: GenderEnum;
    goal?: string;
    restrictions?: string;
}