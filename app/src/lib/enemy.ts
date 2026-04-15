import type { Enemy } from '@/types/enemy';

const RACE_ALIASES: Record<string, string[]> = {
  void: ['虚空', 'void'],
  deathborn: ['死诞', 'deathborn'],
  ancient_dragon: ['古龙', 'ancient dragon', 'elder dragon'],
  normal_dragon: ['普通龙', '龙', 'dragon'],
};

export function normalizeSearchText(value: string) {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function isBossEnemy(enemy: Enemy) {
  return /\bboss\b/i.test(enemy.name) || /boss/i.test(enemy.name);
}

export function getEnemyRaceLabels(enemy: Enemy) {
  const labels: string[] = [];

  if (enemy.void === 'Yes') labels.push('虚空');
  if (enemy.deathborn === 'Yes') labels.push('死诞');
  if (enemy.ancient_dragon === 'Yes') labels.push('古龙');
  if (enemy.normal_dragon === 'Yes') labels.push('普通龙');

  return labels;
}

export function buildEnemySearchText(enemy: Enemy) {
  const raceKeys = Object.entries({
    void: enemy.void,
    deathborn: enemy.deathborn,
    ancient_dragon: enemy.ancient_dragon,
    normal_dragon: enemy.normal_dragon,
  })
    .filter(([, value]) => value === 'Yes')
    .flatMap(([key]) => RACE_ALIASES[key] ?? []);

  const tags = isBossEnemy(enemy)
    ? ['boss', '首领', '头目']
    : ['小怪', '普通敌人'];

  return normalizeSearchText(
    [
      enemy.name,
      enemy.id,
      ...getEnemyRaceLabels(enemy),
      ...raceKeys,
      ...tags,
    ].join(' ')
  );
}
