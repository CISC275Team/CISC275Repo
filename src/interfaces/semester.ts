import { Course } from "./course";
export interface Semester {
    title: string;
    totalCredits: number;
    classesList: Course[];
}
