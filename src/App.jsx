import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SignedIn>
        <header className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('budgets')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'budgets'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Budgets
              </button>
            </div>
            <div className="cursor-pointer">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Budget Tracker</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAddBudgetModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                  Add Budget
                </button>
                <button
                  onClick={() => openAddExpenseModal()}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                  Add Expense
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {budgets.map((budget) => {
                const amount = getBudgetExpenses(budget.id).reduce(
                  (total, expense) => total + expense.amount,
                  0
                );
                return (
                  <BudgetCard
                    key={budget.id}
                    name={budget.name}
                    amount={amount}
                    max={budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                    onViewExpensesClick={() =>
                      setViewExpensesModalBudgetId(budget.id)
                    }
                  />
                );
              })}
              <UncategorizedBudgetCard
                onAddExpenseClick={openAddExpenseModal}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                }
              />
              <TotalBudgetCard />
            </div>
          </div>
        )}

        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
      </SignedIn>

      <SignedOut>
        <LoginPage />
      </SignedOut>
    </div>
  );
}

export default App;