import ProfitChart from '../Charts/ProfitChart';

export default function FinanceDashboard({ data, onAddIncome, onAddExpense }) {
    return (
        <section className="finance-section">
            <div className="section-header">
                <h2>Финансовая аналитика</h2>
                <div className="finance-actions">
                    <button className="income-button" onClick={onAddIncome}>
                        + Доход
                    </button>
                    <button className="expense-button" onClick={onAddExpense}>
                        + Расход
                    </button>
                </div>
            </div>

            <div className="finance-cards">
                <div className="finance-card income">
                    <h3>Доход</h3>
                    <p>{data.income.toLocaleString()} ₽</p>
                </div>

                <div className="finance-card expenses">
                    <h3>Расходы</h3>
                    <p>{data.expenses.toLocaleString()} ₽</p>
                </div>

                <div className="finance-card profit">
                    <h3>Прибыль</h3>
                    <p>{data.profit.toLocaleString()} ₽</p>
                </div>
            </div>

            <div className="finance-chart">
                <ProfitChart data={data} />
            </div>
        </section>
    );
}