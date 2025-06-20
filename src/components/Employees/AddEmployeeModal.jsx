import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function AddEmployeeModal({ isOpen, onClose, onAdd }) {
    const [employee, setEmployee] = useState({
        name: '',
        salary: '',
        position: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...employee,
            salary: Number(employee.salary)
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-header">
                <h2>Добавить сотрудника</h2>
                <button onClick={onClose} className="close-button">×</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={employee.name}
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Зарплата:</label>
                    <input
                        type="number"
                        value={employee.salary}
                        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Должность:</label>
                    <input
                        type="text"
                        value={employee.position}
                        onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">Добавить</button>
                    <button type="button" onClick={onClose} className="cancel-button">Отмена</button>
                </div>
            </form>
        </Modal>
    );
};