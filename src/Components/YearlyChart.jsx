import '../Styles/yearlyChart.css';

function YearlyChart({ monthlyTotals, onMonthClick }) {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const maxAmount = Math.max(...monthlyTotals);

  return (
    <div className="chart-section">
      <h3>Yearly Overview</h3>

      <div className="year-chart">
        {monthlyTotals.map((amount, index) => {
          const heightPercent = maxAmount
            ? (amount / maxAmount) * 100
            : 0;

          return (
            <div
              key={index}
              className="month-bar"
              onClick={() => onMonthClick(index)}
            >
              <div className="bar-wrapper">
                <div
                  className="bar-fill"
                  style={{ height: `${heightPercent}%` }}
                >

                  <div className="bar-tooltip">
                    ₹ {amount}
                  </div>
                </div>

              </div>

              <span>{months[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YearlyChart;
