import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Enemy, SortField, SortOrder, FilterState } from '@/types/enemy';

export function useEnemyData() {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    race: 'all',
    minHp: null,
    maxHp: null,
    minPoise: null,
    maxPoise: null,
    isBoss: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/enemy_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch enemy data');
        }
        const data = await response.json();
        setEnemies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = useCallback((field: SortField) => {
    setSortField(prev => {
      if (prev === field) {
        setSortOrder(order => order === 'asc' ? 'desc' : 'asc');
        return prev;
      }
      setSortOrder('asc');
      return field;
    });
  }, []);

  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      race: 'all',
      minHp: null,
      maxHp: null,
      minPoise: null,
      maxPoise: null,
      isBoss: null,
    });
  }, []);

  const filteredAndSortedEnemies = useMemo(() => {
    let result = [...enemies];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(searchLower) || 
        e.id.toLowerCase().includes(searchLower)
      );
    }

    if (filters.race && filters.race !== 'all') {
      result = result.filter(e => {
        switch (filters.race) {
          case 'void': return e.void === 'Yes';
          case 'deathborn': return e.deathborn === 'Yes';
          case 'ancient_dragon': return e.ancient_dragon === 'Yes';
          case 'normal_dragon': return e.normal_dragon === 'Yes';
          default: return true;
        }
      });
    }

    if (filters.minHp !== null) {
      result = result.filter(e => e.hp_day1 >= filters.minHp!);
    }
    if (filters.maxHp !== null) {
      result = result.filter(e => e.hp_day1 <= filters.maxHp!);
    }

    if (filters.minPoise !== null) {
      result = result.filter(e => e.poise >= filters.minPoise!);
    }
    if (filters.maxPoise !== null) {
      result = result.filter(e => e.poise <= filters.maxPoise!);
    }

    if (filters.isBoss !== null) {
      result = result.filter(e => {
        const isBoss = e.name.toLowerCase().includes('boss');
        return filters.isBoss === isBoss;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [enemies, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedEnemies.length / pageSize);

  const paginatedEnemies = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedEnemies.slice(startIndex, endIndex);
  }, [filteredAndSortedEnemies, currentPage, pageSize]);

  const stats = useMemo(() => {
    if (enemies.length === 0) return null;
    
    const hpValues = enemies.map(e => e.hp_day1).filter(hp => hp > 0);
    const poiseValues = enemies.map(e => e.poise).filter(p => p >= 0);
    
    return {
      total: enemies.length,
      bossCount: enemies.filter(e => e.name.toLowerCase().includes('boss')).length,
      voidCount: enemies.filter(e => e.void === 'Yes').length,
      deathbornCount: enemies.filter(e => e.deathborn === 'Yes').length,
      ancientDragonCount: enemies.filter(e => e.ancient_dragon === 'Yes').length,
      normalDragonCount: enemies.filter(e => e.normal_dragon === 'Yes').length,
      minHp: Math.min(...hpValues),
      maxHp: Math.max(...hpValues),
      avgHp: Math.round(hpValues.reduce((a, b) => a + b, 0) / hpValues.length),
      minPoise: Math.min(...poiseValues),
      maxPoise: Math.max(...poiseValues),
    };
  }, [enemies]);

  return {
    enemies: paginatedEnemies,
    filteredCount: filteredAndSortedEnemies.length,
    loading,
    error,
    sortField,
    sortOrder,
    filters,
    stats,
    currentPage,
    totalPages,
    pageSize,
    handleSort,
    handleFilterChange,
    resetFilters,
    setCurrentPage,
  };
}
