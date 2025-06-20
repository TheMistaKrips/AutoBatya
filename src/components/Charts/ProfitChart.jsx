// ProfitChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitChart = ({ data }) => {
    const chartData = [
        { name: 'Доход', value: data.income },
        { name: 'Расходы', value: data.expenses },
        { name: 'Прибыль', value: data.profit },
    ];

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`${value.toLocaleString()} ₽`, 'Сумма']}
                        labelFormatter={(label) => label}
                    />
                    <Legend />
                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        name="Сумма"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfitChart;