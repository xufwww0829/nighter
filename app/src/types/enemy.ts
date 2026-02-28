export interface Enemy {
  name: string;
  id: string;
  hp_day1: number;
  hp_day2: number;
  hp_gain_rate: number;
  phys_normal: number;
  slash: number;
  strike: number;
  pierce: number;
  magic: number;
  fire: number;
  lightning: number;
  holy: number;
  poison: number | string;
  scarlet_rot: number | string;
  bleed: number | string;
  frost: number | string;
  sleep: number | string;
  madness: number | string;
  death: number | string;
  poise: number;
  poise_rate: number;
  effective_poise: number;
  poise_recovery: number;
  weakness_dmg: number;
  weakness_type: number | string;
  void: string;
  deathborn: string;
  ancient_dragon: string;
  normal_dragon: string;
}

export type SortField = 
  | 'name' 
  | 'hp_day1' 
  | 'hp_day2' 
  | 'phys_normal' 
  | 'slash' 
  | 'strike' 
  | 'pierce' 
  | 'magic' 
  | 'fire' 
  | 'lightning' 
  | 'holy' 
  | 'poise' 
  | 'effective_poise' 
  | 'weakness_dmg';

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  race: string;
  minHp: number | null;
  maxHp: number | null;
  minPoise: number | null;
  maxPoise: number | null;
  isBoss: boolean | null;
}
