import { COURSE_TYPE } from '../server/db/schema';

interface Course {
    id: number;
    thumbnail?: string | null;
    type: COURSE_TYPE;
    title: string;
    description: string;
    file: string;
    deadline: Date;
    video?: string | null;
}

interface CourseRequest {
    title: string;
    thumbnail: string;
    description: string;
    file: string;
    type: COURSE_TYPE;
    deadline: Date;
    video?: string | null;
}