import { useEnemyData } from '@/hooks/useEnemyData';
import { FilterPanel } from '@/components/FilterPanel';
import { StatsCards } from '@/components/StatsCards';
import { EnemyTable } from '@/components/EnemyTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search, Shield, Sparkles, Sword } from 'lucide-react';

function App() {
  const {
    enemies,
    filteredCount,
    loading,
    error,
    sortField,
    sortOrder,
    filters,
    stats,
    currentPage,
    totalPages,
    handleSort,
    handleFilterChange,
    resetFilters,
    setCurrentPage,
  } = useEnemyData();

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_24%),linear-gradient(180deg,#020617,#0f172a_42%,#020617)] p-4 md:p-6">
        <div className="mx-auto max-w-[1400px] space-y-6">
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_24%),linear-gradient(180deg,#020617,#0f172a_42%,#020617)]">
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#f59e0b,#7c2d12)] shadow-lg shadow-amber-950/30">
                <Sword className="h-5 w-5 text-amber-50" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-amber-400/70">Nightreign Enemy Search</p>
                <h1 className="text-xl font-bold text-amber-50 md:text-2xl">
                  艾尔登法环：黑夜君临
                </h1>
                <p className="text-sm text-slate-400">敌人数据查询系统 v1.02.4</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Data</p>
                <p className="mt-1 text-sm font-medium text-slate-100">v1.02.4 修正版</p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Search</p>
                <p className="mt-1 text-sm font-medium text-slate-100">名称 / ID / 标签</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 sm:col-span-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">UX</p>
                <p className="mt-1 text-sm font-medium text-slate-100">移动端已优化</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 md:px-6 md:py-8">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
          <div className="overflow-hidden rounded-[32px] border border-amber-400/15 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_28%),linear-gradient(145deg,rgba(15,23,42,0.95),rgba(2,6,23,0.92))] p-6 shadow-[0_28px_100px_rgba(2,6,23,0.52)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-100">
              <Sparkles className="h-3.5 w-3.5" />
              搜索已增强
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl">
              更快定位 Boss、种族和关键敌人数据
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              现在搜索会同时匹配敌人名称、ID、Boss/小怪状态和种族标签，筛选结果也会在移动端以卡片形式更清晰地展示。
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                <Search className="mb-2 h-4 w-4 text-amber-300" />
                支持搜索: `boss`、`虚空`、`44700010a`
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                <Shield className="mb-2 h-4 w-4 text-blue-300" />
                生命值与韧性组合过滤
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800/80 bg-[linear-gradient(160deg,rgba(15,23,42,0.94),rgba(15,23,42,0.78))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.42)]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Use Cases</p>
            <div className="mt-4 space-y-3">
              {[
                '搜 Boss: 输入 boss 或直接点“仅 Boss”',
                '搜种族: 输入 虚空 / 死诞 / 古龙 / 普通龙',
                '追踪单个敌人: 输入完整或部分 ID',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsCards stats={stats} />

        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          resultCount={filteredCount}
        />

        <EnemyTable
          enemies={enemies}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <footer className="py-6 text-center text-sm text-slate-600">
          <p>艾尔登法环：黑夜君临 敌人数据查询 | 共 {filteredCount} 条记录</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
