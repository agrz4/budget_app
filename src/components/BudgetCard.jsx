import { currencyFormatter } from "../utils"

export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    onAddExpenseClick,
    onViewExpensesClick,
    hideButtons,
}) {
    const bgClasses = []
    if (amount > max) {
        bgClasses.push("bg-red-50")
    } else if (gray) {
        bgClasses.push("bg-gray-50")
    }

    const progressBarColor = getProgressBarColor(amount, max)

    return (
        <div className={`border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${bgClasses.join("")}`}>
            <div className="p-6">
                <div className="flex justify-between items-baseline mb-4">
                    <div className="text-lg font-medium text-gray-800">{name}</div>
                    <div className="flex items-baseline">
                        <span className="text-xl font-semibold text-gray-900">
                            {currencyFormatter.format(amount)}
                        </span>
                        {max && (
                            <span className="text-gray-500 text-sm ml-2">
                                / {currencyFormatter.format(max)}
                            </span>
                        )}
                    </div>
                </div>
                {max && (
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
                        <div 
                            className={`h-3 rounded-full transition-all duration-300 ${progressBarColor}`}
                            style={{ width: `${Math.min(100, (amount / max) * 100)}%` }}
                        ></div>
                    </div>
                )}
                {!hideButtons && (
                    <div className="flex gap-3 justify-end">
                        <button
                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onAddExpenseClick}
                        >
                            Add Expense
                        </button>
                        <button
                            className="bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            onClick={onViewExpensesClick}
                        >
                            View Expenses
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function getProgressBarColor(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "bg-blue-500"
    if (ratio < 0.75) return "bg-yellow-500"
    return "bg-red-500"
}