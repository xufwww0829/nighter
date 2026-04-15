import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { Enemy, SortField, SortOrder } from '@/types/enemy';
import { getEnemyRaceLabels, isBossEnemy } from '@/lib/enemy';
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
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
    <TableHead className={`cursor-pointer hover:bg-slate-800/50 transition-colors text-slate-100 ${className}`} onClick={() => onSort(field)}>
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

export function EnemyTable({ enemies, sortField, sortOrder, onSort, currentPage, totalPages, onPageChange }: EnemyTableProps) {
  const formatNumber = (num: number | string) => {
    if (num === '' || num === null || num === undefined) return '-';
    const n = Number(num);
    if (isNaN(n)) return '-';
    if (n >= 10000) return (n / 10000).toFixed(1) + '万';
    return n.toLocaleString();
  };

  const getRaceBadges = (enemy: Enemy) => {
    return getEnemyRaceLabels(enemy).map((label) => ({
      label,
      color:
        label === '虚空'
          ? 'bg-purple-600/60 text-purple-100'
          : label === '死诞'
            ? 'bg-cyan-600/60 text-cyan-100'
            : label === '古龙'
              ? 'bg-red-600/60 text-red-100'
              : 'bg-yellow-600/60 text-yellow-100',
    }));
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.88))] shadow-[0_28px_90px_rgba(2,6,23,0.48)]">
      <div className="flex flex-col gap-3 border-b border-slate-800/80 px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Enemy Index</p>
          <h3 className="mt-1 text-xl font-semibold text-white">敌人数据总览</h3>
          <p className="mt-1 text-sm text-slate-400">点击表头可排序，移动端可直接浏览卡片化结果。</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-slate-200">
            第 {currentPage} / {Math.max(totalPages, 1)} 页
          </Badge>
          <Badge className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-amber-100">
            支持多字段搜索
          </Badge>
        </div>
      </div>

      <div className="grid gap-3 border-b border-slate-800/80 p-4 md:hidden">
        {enemies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 px-4 py-10 text-center text-slate-400">
            <Skull className="mx-auto mb-3 h-10 w-10 opacity-30" />
            没有找到匹配的敌人
          </div>
        ) : (
          enemies.map((enemy, index) => {
            const raceBadges = getRaceBadges(enemy);
            const boss = isBossEnemy(enemy);

            return (
              <article
                key={enemy.id + index}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {boss && <Skull className="h-4 w-4 text-amber-400" />}
                      <h4 className={`font-medium ${boss ? 'text-amber-200' : 'text-slate-100'}`}>{enemy.name}</h4>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{enemy.id}</p>
                  </div>
                  <Badge className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-blue-100">
                    韧性 {formatNumber(enemy.poise)}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-xs text-slate-500">第一日生命</p>
                    <p className="mt-1 font-semibold text-slate-100">{formatNumber(enemy.hp_day1)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-xs text-slate-500">第二日生命</p>
                    <p className="mt-1 font-semibold text-slate-100">{formatNumber(enemy.hp_day2)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-xs text-slate-500">物普</p>
                    <p className="mt-1 font-semibold text-emerald-300">{enemy.phys_normal > 0 ? `+${enemy.phys_normal}%` : '0%'}</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-xs text-slate-500">弱点倍率</p>
                    <p className="mt-1 font-semibold text-amber-300">×{enemy.weakness_dmg}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {raceBadges.length > 0 ? raceBadges.map((badge) => (
                    <Badge key={`${enemy.id}-${badge.label}`} className={`${badge.color} rounded-full px-2 py-0.5 text-xs`}>
                      {badge.label}
                    </Badge>
                  )) : (
                    <span className="text-xs text-slate-500">无特殊种族标签</span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      <div className="hidden md:block">
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
              <TableHead className="text-center text-slate-100">种族</TableHead>
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
                const boss = isBossEnemy(enemy);
                
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
      {totalPages > 1 && (
        <div className="flex items-center justify-center border-t border-slate-800/80 px-4 py-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 || 
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
