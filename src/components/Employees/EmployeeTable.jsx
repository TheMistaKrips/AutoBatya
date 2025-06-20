import React from 'react';
export default function EmployeeTable({ employees }) {
    return (
        <table className="employee-table">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Зарплата</th>
                    <th>Должность</th>
                    <th>Дата найма</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, i) => (
                    <tr key={i}>
                        <td>{emp.name}</td>
                        <td>{emp.salary} ₽</td>
                        <td>{emp.position}</td>
                        <td>{new Date(emp.hireDate).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};