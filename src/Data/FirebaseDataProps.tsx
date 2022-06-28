import { UpdateData } from "firebase/firestore";

export default interface FirebaseDataProps<T> {
    data: T;
    onUpdate: (updateData: UpdateData<T>) => void;
}
