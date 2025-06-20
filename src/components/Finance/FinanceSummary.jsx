import React from 'react';

export const FinanceSummary = ({ income, expenses, profit }) => (
    <div className="finance-summary">
        <h2>Финансовая сводка</h2>
        <div className="finance-cards">
            <div className="card income">
                <h3>Доход</h3>
                <p>{income.toLocaleString()} ₽</p>
            </div>
            <div className="card expenses">
                <h3>Расходы</h3>
                <p>{expenses.toLocaleString()} ₽</p>
            </div>
            <div className="card profit">
                <h3>Прибыль</h3>
                <p>{profit.toLocaleString()} ₽</p>
            </div>
        </div>
    </div>
);