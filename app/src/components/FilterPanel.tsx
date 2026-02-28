import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterState } from '@/types/enemy';
import { Search, RotateCcw, Skull, Heart, Shield } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onReset: () => void;
  resultCount: number;
}

export function FilterPanel({ filters, onFilterChange, onReset, resultCount }: FilterPanelProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-amber-100">筛选条件</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">
            结果: <span className="text-amber-400 font-semibold">{resultCount}</span> 条
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="border-amber-500/50 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            重置
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-sm">搜索</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="敌人名称或ID..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="pl-10 bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Race Filter */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-sm flex items-center gap-1">
            <Skull className="w-3.5 h-3.5" />
            种族
          </Label>
          <Select 
            value={filters.race} 
            onValueChange={(value) => onFilterChange('race', value)}
          >
            <SelectTrigger className="bg-slate-800/80 border-slate-600 text-slate-200 focus:ring-amber-500/20">
              <SelectValue placeholder="全部种族" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-amber-200">全部种族</SelectItem>
              <SelectItem value="void" className="text-slate-200 focus:bg-slate-700 focus:text-amber-200">虚空</SelectItem>
              <SelectItem value="deathborn" className="text-slate-200 focus:bg-slate-700 focus:text-amber-200">死诞</SelectItem>
              <SelectItem value="ancient_dragon" className="text-slate-200 focus:bg-slate-700 focus:text-amber-200">古龙</SelectItem>
              <SelectItem value="normal_dragon" className="text-slate-200 focus:bg-slate-700 focus:text-amber-200">普通龙</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* HP Range */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-sm flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            生命值范围
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="最小"
              value={filters.minHp ?? ''}
              onChange={(e) => onFilterChange('minHp', e.target.value ? Number(e.target.value) : null)}
              className="bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
            <span className="text-slate-500 self-center">-</span>
            <Input
              type="number"
              placeholder="最大"
              value={filters.maxHp ?? ''}
              onChange={(e) => onFilterChange('maxHp', e.target.value ? Number(e.target.value) : null)}
              className="bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Poise Range */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-sm flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            韧性值范围
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="最小"
              value={filters.minPoise ?? ''}
              onChange={(e) => onFilterChange('minPoise', e.target.value ? Number(e.target.value) : null)}
              className="bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
            <span className="text-slate-500 self-center">-</span>
            <Input
              type="number"
              placeholder="最大"
              value={filters.maxPoise ?? ''}
              onChange={(e) => onFilterChange('maxPoise', e.target.value ? Number(e.target.value) : null)}
              className="bg-slate-800/80 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>
        </div>
      </div>

      {/* Boss Filter */}
      <div className="mt-4 flex gap-2">
        <Button
          variant={filters.isBoss === true ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('isBoss', filters.isBoss === true ? null : true)}
          className={filters.isBoss === true 
            ? 'bg-amber-600 hover:bg-amber-700 text-white' 
            : 'border-slate-600 text-slate-400 hover:border-amber-500/50 hover:text-amber-300'}
        >
          <Skull className="w-4 h-4 mr-1" />
          仅Boss
        </Button>
        <Button
          variant={filters.isBoss === false ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('isBoss', filters.isBoss === false ? null : false)}
          className={filters.isBoss === false 
            ? 'bg-slate-600 hover:bg-slate-700 text-white' 
            : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'}
        >
          仅小怪
        </Button>
      </div>
    </div>
  );
}
