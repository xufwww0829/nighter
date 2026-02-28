import { useEnemyData } from '@/hooks/useEnemyData';
import { FilterPanel } from '@/components/FilterPanel';
import { StatsCards } from '@/components/StatsCards';
import { EnemyTable } from '@/components/EnemyTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Sword } from 'lucide-react';

function App() {
  const {
    enemies,
    loading,
    error,
    sortField,
    sortOrder,
    filters,
    stats,
    handleSort,
    handleFilterChange,
    resetFilters,
  } = useEnemyData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="w-10 h-10 rounded-lg bg-slate-800" />
            <Skeleton className="h-8 w-64 bg-slate-800" />
          </div>
          <Skeleton className="h-32 bg-slate-800/50" />
          <Skeleton className="h-24 bg-slate-800/50" />
          <Skeleton className="h-96 bg-slate-800/50" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md bg-red-950/50 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-200">
            加载数据失败: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <Sword className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-100">
                  艾尔登法环：黑夜君临
                </h1>
                <p className="text-xs text-slate-500">敌人数据查询系统 v1.02.4</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">数据版本</p>
                <p className="text-xs text-amber-500/80">v1.02.4 修正版</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          resultCount={enemies.length}
        />

        {/* Enemy Table */}
        <EnemyTable
          enemies={enemies}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* Footer */}
        <footer className="text-center py-6 text-slate-600 text-sm">
          <p>艾尔登法环：黑夜君临 敌人数据查询 | 共 {enemies.length} 条记录</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
