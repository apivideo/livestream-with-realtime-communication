import { v4 as uuidv4 } from 'uuid';

export default function GenerateUserId() : string {
    return uuidv4();
}
