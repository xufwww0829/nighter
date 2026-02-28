import { Card, CardContent } from '@/components/ui/card';
import { Skull, Heart, Shield, Flame, Wind, Droplets, Sparkles } from 'lucide-react';

interface Stats {
  total: number;
  bossCount: number;
  voidCount: number;
  deathbornCount: number;
  ancientDragonCount: number;
  normalDragonCount: number;
  minHp: number;
  maxHp: number;
  avgHp: number;
  minPoise: number;
  maxPoise: number;
}

interface StatsCardsProps {
  stats: Stats | null;
}

export function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) return null;

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    return num.toLocaleString();
  };

  const cards = [
    { 
      label: '总敌人', 
      value: stats.total, 
      icon: Skull, 
      color: 'text-slate-300',
      bgColor: 'from-slate-700/50 to-slate-800/50'
    },
    { 
      label: 'Boss数量', 
      value: stats.bossCount, 
      icon: Skull, 
      color: 'text-amber-400',
      bgColor: 'from-amber-900/30 to-amber-950/30'
    },
    { 
      label: '虚空', 
      value: stats.voidCount, 
      icon: Wind, 
      color: 'text-purple-400',
      bgColor: 'from-purple-900/30 to-purple-950/30'
    },
    { 
      label: '死诞', 
      value: stats.deathbornCount, 
      icon: Droplets, 
      color: 'text-cyan-400',
      bgColor: 'from-cyan-900/30 to-cyan-950/30'
    },
    { 
      label: '古龙', 
      value: stats.ancientDragonCount, 
      icon: Flame, 
      color: 'text-red-400',
      bgColor: 'from-red-900/30 to-red-950/30'
    },
    { 
      label: '普通龙', 
      value: stats.normalDragonCount, 
      icon: Sparkles, 
      color: 'text-yellow-400',
      bgColor: 'from-yellow-900/30 to-yellow-950/30'
    },
    { 
      label: '平均生命', 
      value: formatNumber(stats.avgHp), 
      icon: Heart, 
      color: 'text-rose-400',
      bgColor: 'from-rose-900/30 to-rose-950/30'
    },
    { 
      label: '最高韧性', 
      value: stats.maxPoise, 
      icon: Shield, 
      color: 'text-blue-400',
      bgColor: 'from-blue-900/30 to-blue-950/30'
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`bg-gradient-to-br ${card.bgColor} border-slate-700/50 hover:border-slate-600/50 transition-all duration-300`}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">{card.label}</p>
                <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <card.icon className={`w-5 h-5 ${card.color} opacity-60`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
