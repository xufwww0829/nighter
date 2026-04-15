import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterState } from '@/types/enemy';
import { Search, RotateCcw, Skull, Heart, Shield, Sparkles, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  resultCount: number;
}

export function FilterPanel({ filters, onFilterChange, onReset, resultCount }: FilterPanelProps) {
  const raceLabelMap: Record<string, string> = {
    void: '虚空',
    deathborn: '死诞',
    ancient_dragon: '古龙',
    normal_dragon: '普通龙',
  };

  const activeFilters = [
    filters.search ? `关键词: ${filters.search}` : null,
    filters.race !== 'all' ? `种族: ${raceLabelMap[filters.race] ?? filters.race}` : null,
    filters.minHp !== null ? `生命 ≥ ${filters.minHp}` : null,
    filters.maxHp !== null ? `生命 ≤ ${filters.maxHp}` : null,
    filters.minPoise !== null ? `韧性 ≥ ${filters.minPoise}` : null,
    filters.maxPoise !== null ? `韧性 ≤ ${filters.maxPoise}` : null,
    filters.isBoss === true ? '仅 Boss' : null,
    filters.isBoss === false ? '仅小怪' : null,
  ].filter(Boolean);

  return (
    <section className="overflow-hidden rounded-[28px] border border-amber-400/20 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_26%),linear-gradient(145deg,rgba(15,23,42,0.94),rgba(15,23,42,0.82))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.48)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
              <SlidersHorizontal className="h-4 w-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">智能筛选</h2>
              <p className="text-sm text-slate-400">支持名称、ID、Boss、小怪和种族关键词联动搜索</p>
            </div>
          </div>

          <div className="relative max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-300/80" />
            <Input
              placeholder="输入敌人名称、ID、Boss、虚空、死诞等关键词..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="h-12 rounded-2xl border-slate-700/80 bg-slate-950/70 pl-11 text-slate-50 placeholder:text-slate-500 focus:border-amber-400 focus-visible:ring-amber-400/20"
            />
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Results</p>
            <p className="mt-1 text-2xl font-semibold text-amber-300">{resultCount}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={onReset}
            className="h-12 rounded-2xl border-amber-400/40 bg-amber-400/10 px-5 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            重置
          </Button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {activeFilters.length > 0 ? (
          activeFilters.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="rounded-full border-amber-400/20 bg-amber-400/10 px-3 py-1 text-amber-100"
            >
              <Sparkles className="h-3 w-3" />
              {item}
            </Badge>
          ))
        ) : (
          <Badge
            variant="outline"
            className="rounded-full border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
          >
            当前未启用额外过滤条件
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
          <Label className="mb-2 flex items-center gap-1 text-sm text-slate-200">
            <Skull className="h-3.5 w-3.5" />
            种族
          </Label>
          <Select 
            value={filters.race} 
            onValueChange={(value) => onFilterChange('race', value)}
          >
            <SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-900/80 text-slate-100 focus:ring-amber-500/20">
              <SelectValue placeholder="全部种族" />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-900">
              <SelectItem value="all" className="text-slate-100 focus:bg-slate-800 focus:text-amber-200">全部种族</SelectItem>
              <SelectItem value="void" className="text-slate-100 focus:bg-slate-800 focus:text-amber-200">虚空</SelectItem>
              <SelectItem value="deathborn" className="text-slate-100 focus:bg-slate-800 focus:text-amber-200">死诞</SelectItem>
              <SelectItem value="ancient_dragon" className="text-slate-100 focus:bg-slate-800 focus:text-amber-200">古龙</SelectItem>
              <SelectItem value="normal_dragon" className="text-slate-100 focus:bg-slate-800 focus:text-amber-200">普通龙</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
          <Label className="mb-2 flex items-center gap-1 text-sm text-slate-200">
            <Heart className="h-3.5 w-3.5 text-red-400" />
            生命值范围
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="最小"
              value={filters.minHp ?? ''}
              onChange={(e) => onFilterChange('minHp', e.target.value ? Number(e.target.value) : null)}
              className="h-11 rounded-xl border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
            <span className="text-slate-400 self-center">-</span>
            <Input
              type="number"
              placeholder="最大"
              value={filters.maxHp ?? ''}
              onChange={(e) => onFilterChange('maxHp', e.target.value ? Number(e.target.value) : null)}
              className="h-11 rounded-xl border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
          <Label className="mb-2 flex items-center gap-1 text-sm text-slate-200">
            <Shield className="h-3.5 w-3.5 text-blue-400" />
            韧性值范围
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="最小"
              value={filters.minPoise ?? ''}
              onChange={(e) => onFilterChange('minPoise', e.target.value ? Number(e.target.value) : null)}
              className="h-11 rounded-xl border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
            <span className="text-slate-400 self-center">-</span>
            <Input
              type="number"
              placeholder="最大"
              value={filters.maxPoise ?? ''}
              onChange={(e) => onFilterChange('maxPoise', e.target.value ? Number(e.target.value) : null)}
              className="h-11 rounded-xl border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
          <Label className="mb-2 flex items-center gap-1 text-sm text-slate-200">
            <Skull className="h-3.5 w-3.5 text-amber-300" />
            敌人类型
          </Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.isBoss === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('isBoss', filters.isBoss === true ? null : true)}
              className={filters.isBoss === true 
                ? 'h-11 rounded-xl bg-amber-500 px-4 text-slate-950 hover:bg-amber-400' 
                : 'h-11 rounded-xl border-slate-700 bg-slate-900/80 px-4 text-slate-200 hover:border-amber-400/40 hover:bg-slate-800'}
            >
              <Skull className="mr-2 h-4 w-4" />
              仅 Boss
            </Button>
            <Button
              variant={filters.isBoss === false ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('isBoss', filters.isBoss === false ? null : false)}
              className={filters.isBoss === false 
                ? 'h-11 rounded-xl bg-slate-200 px-4 text-slate-950 hover:bg-white' 
                : 'h-11 rounded-xl border-slate-700 bg-slate-900/80 px-4 text-slate-200 hover:border-slate-500 hover:bg-slate-800'}
            >
              仅小怪
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
