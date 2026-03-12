import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Enemy, SortField, SortOrder } from '@/types/enemy';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Skull, 
  Heart, 
  Shield,
  Sword,
  Flame,
  Zap,
  Sparkles,
  Wind
} from 'lucide-react';

interface EnemyTableProps {
  enemies: Enemy[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

interface SortHeaderProps {
  field: SortField;
  label: string;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
  icon?: React.ReactNode;
  className?: string;
}

function SortHeader({ field, label, currentField, currentOrder, onSort, icon, className = '' }: SortHeaderProps) {
  const isActive = currentField === field;
  
  return (
    <TableHead className={`cursor-pointer hover:bg-slate-800/50 transition-colors ${className}`} onClick={() => onSort(field)}>
      <div className="flex items-center gap-1">
        {icon && <span className="opacity-60">{icon}</span>}
        <span>{label}</span>
        {isActive ? (
          currentOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-30" />
        )}
      </div>
    </TableHead>
  );
}

export function EnemyTable({ enemies, sortField, sortOrder, onSort }: EnemyTableProps) {
  const formatNumber = (num: number | string) => {
    if (num === '' || num === null || num === undefined) return '-';
    const n = Number(num);
    if (isNaN(n)) return '-';
    if (n >= 10000) return (n / 10000).toFixed(1) + '万';
    return n.toLocaleString();
  };

  const getRaceBadges = (enemy: Enemy) => {
    const badges = [];
    if (enemy.void === 'Yes') badges.push({ label: '虚空', color: 'bg-purple-600/60 text-purple-100' });
    if (enemy.deathborn === 'Yes') badges.push({ label: '死诞', color: 'bg-cyan-600/60 text-cyan-100' });
    if (enemy.ancient_dragon === 'Yes') badges.push({ label: '古龙', color: 'bg-red-600/60 text-red-100' });
    if (enemy.normal_dragon === 'Yes') badges.push({ label: '龙', color: 'bg-yellow-600/60 text-yellow-100' });
    return badges;
  };

  const isBoss = (name: string) => name.toLowerCase().includes('boss');

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <SortHeader 
                field="name" 
                label="敌人名称" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Skull className="w-4 h-4" />}
                className="min-w-[200px]"
              />
              <SortHeader 
                field="hp_day1" 
                label="生命值(第一日)" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Heart className="w-4 h-4 text-red-400" />}
                className="text-right"
              />
              <SortHeader 
                field="hp_day2" 
                label="生命值(第二日)" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Heart className="w-4 h-4 text-rose-400" />}
                className="text-right"
              />
              <SortHeader 
                field="phys_normal" 
                label="物普" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Sword className="w-4 h-4 text-slate-400" />}
                className="text-right"
              />
              <SortHeader 
                field="slash" 
                label="斩击" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                className="text-right"
              />
              <SortHeader 
                field="strike" 
                label="打击" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                className="text-right"
              />
              <SortHeader 
                field="pierce" 
                label="突刺" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                className="text-right"
              />
              <SortHeader 
                field="magic" 
                label="魔力" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Sparkles className="w-4 h-4 text-blue-400" />}
                className="text-right"
              />
              <SortHeader 
                field="fire" 
                label="火" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Flame className="w-4 h-4 text-orange-400" />}
                className="text-right"
              />
              <SortHeader 
                field="lightning" 
                label="雷" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Zap className="w-4 h-4 text-yellow-400" />}
                className="text-right"
              />
              <SortHeader 
                field="holy" 
                label="圣" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Wind className="w-4 h-4 text-amber-200" />}
                className="text-right"
              />
              <SortHeader 
                field="poise" 
                label="韧性" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                icon={<Shield className="w-4 h-4 text-blue-400" />}
                className="text-right"
              />
              <SortHeader 
                field="weakness_dmg" 
                label="弱点倍率" 
                currentField={sortField} 
                currentOrder={sortOrder} 
                onSort={onSort}
                className="text-right"
              />
              <TableHead className="text-center">种族</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enemies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} className="text-center py-12 text-slate-500">
                  <Skull className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>没有找到匹配的敌人</p>
                </TableCell>
              </TableRow>
            ) : (
              enemies.map((enemy, index) => {
                const raceBadges = getRaceBadges(enemy);
                const boss = isBoss(enemy.name);
                
                return (
                  <TableRow 
                    key={enemy.id + index} 
                    className="border-slate-700/30 hover:bg-slate-800/40 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {boss && <Skull className="w-4 h-4 text-amber-400" />}
                        <span className={boss ? 'text-amber-200' : 'text-slate-100'}>
                          {enemy.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 mt-0.5 block">{enemy.id}</span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-slate-100">
                      {formatNumber(enemy.hp_day1)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-slate-100">
                      {formatNumber(enemy.hp_day2)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.phys_normal > 0 ? 'text-green-400' : 'text-slate-400'}>
                        {enemy.phys_normal > 0 ? `+${enemy.phys_normal}%` : '0%'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.slash > 0 ? 'text-green-400' : enemy.slash < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.slash > 0 ? `+${enemy.slash}%` : `${enemy.slash}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.strike > 0 ? 'text-green-400' : enemy.strike < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.strike > 0 ? `+${enemy.strike}%` : `${enemy.strike}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.pierce > 0 ? 'text-green-400' : enemy.pierce < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.pierce > 0 ? `+${enemy.pierce}%` : `${enemy.pierce}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.magic > 0 ? 'text-green-400' : enemy.magic < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.magic > 0 ? `+${enemy.magic}%` : `${enemy.magic}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.fire > 0 ? 'text-green-400' : enemy.fire < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.fire > 0 ? `+${enemy.fire}%` : `${enemy.fire}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.lightning > 0 ? 'text-green-400' : enemy.lightning < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.lightning > 0 ? `+${enemy.lightning}%` : `${enemy.lightning}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={enemy.holy > 0 ? 'text-green-400' : enemy.holy < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {enemy.holy > 0 ? `+${enemy.holy}%` : `${enemy.holy}%`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-blue-200">
                      {formatNumber(enemy.poise)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className="text-amber-400">×{enemy.weakness_dmg}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {raceBadges.length > 0 ? (
                          raceBadges.map((badge, i) => (
                            <Badge key={i} className={`${badge.color} text-xs px-1.5 py-0`}>
                              {badge.label}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-slate-500 text-xs">-</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
