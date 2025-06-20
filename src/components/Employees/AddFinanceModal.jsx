import { useState } from 'react';
import Modal from '../UI/Modal'

export default function AddFinanceModal({ type, isOpen, onClose, onAdd }) {
    const [record, setRecord] = useState({
        type,
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...record,
            amount: Number(record.amount)
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">
                <h2>{type === 'income' ? 'Добавить доход' : 'Добавить расход'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                    <label>Сумма (₽)</label>
                    <input
                        type="number"
                        value={record.amount}
                        onChange={(e) => setRecord({ ...record, amount: e.target.value })}
                        required
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="text"
                        value={record.description}
                        onChange={(e) => setRecord({ ...record, description: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Дата</label>
                    <input
                        type="date"
                        value={record.date}
                        onChange={(e) => setRecord({ ...record, date: e.target.value })}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onClose} className="cancel-button">
                        Отмена
                    </button>
                    <button type="submit" className="submit-button">
                        {type === 'income' ? 'Добавить доход' : 'Добавить расход'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}