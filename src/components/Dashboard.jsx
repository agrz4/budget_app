import { useUser } from "@clerk/clerk-react";
import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function Dashboard() {
  const { user } = useUser();
  const { budgets, expenses } = useBudgets();

  // Menghitung total budget
  const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
  
  // Menghitung total pengeluaran
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Menghitung sisa budget
  const remainingBudget = totalBudget - totalExpenses;
  
  // Menghitung persentase penggunaan budget
  const budgetUsagePercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <img 
            src={user?.imageUrl} 
            alt="Profile" 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Selamat datang, {user?.firstName || 'Pengguna'}!
            </h2>
            <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Budget</h3>
          <p className="text-2xl font-bold text-gray-800">{currencyFormatter.format(totalBudget)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Pengeluaran</h3>
          <p className="text-2xl font-bold text-gray-800">{currencyFormatter.format(totalExpenses)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Sisa Budget</h3>
          <p className="text-2xl font-bold text-gray-800">{currencyFormatter.format(remainingBudget)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Penggunaan Budget</h3>
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  budgetUsagePercentage > 90 ? 'bg-red-500' :
                  budgetUsagePercentage > 70 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, budgetUsagePercentage)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(budgetUsagePercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pengeluaran Terakhir</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-medium text-gray-600">Deskripsi</th>
                <th className="pb-3 font-medium text-gray-600">Kategori</th>
                <th className="pb-3 font-medium text-gray-600">Jumlah</th>
                <th className="pb-3 font-medium text-gray-600">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((expense) => {
                const budget = budgets.find(b => b.id === expense.budgetId);
                return (
                  <tr key={expense.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-800">{expense.description}</td>
                    <td className="py-3 text-gray-600">{budget?.name || 'Tidak terkategorikan'}</td>
                    <td className="py-3 text-gray-800 font-medium">{currencyFormatter.format(expense.amount)}</td>
                    <td className="py-3 text-gray-600">
                      {new Date(expense.id).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 