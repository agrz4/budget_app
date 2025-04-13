import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

  const expenses = getBudgetExpenses(budgetId)
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  if (budgetId == null) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-800">Expenses - {budget?.name}</h3>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <button
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
                className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 font-medium py-1.5 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            )}
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          {expenses.map(expense => (
            <div key={expense.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-grow text-lg font-medium text-gray-800">{expense.description}</div>
              <div className="text-lg font-semibold text-gray-900">{currencyFormatter.format(expense.amount)}</div>
              <button
                onClick={() => deleteExpense(expense)}
                className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}