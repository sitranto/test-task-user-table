import type { User } from "../../types/user.ts";
import "./UserModal.css";

interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
    if (!user) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="modal-avatar" />
                <h2>{`${user.lastName} ${user.firstName} ${user.maidenName ?? ""}`}</h2>
                <p><b>Возраст:</b> {user.age}</p>
                <p><b>Адрес:</b> {user.address?.address}, {user.address?.city}, {user.address?.postalCode}, {user.address?.state}, {user.address?.country}</p>
                <p><b>Рост:</b> {user.height} см</p>
                <p><b>Вес:</b> {user.weight} кг</p>
                <p><b>Телефон:</b> {user.phone}</p>
                <p><b>Email:</b> {user.email}</p>
            </div>
        </div>
    );
}
