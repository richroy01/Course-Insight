import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SearchFilters } from '@shared/types';
import { branches } from '@shared/mockData';
import { cn } from '../lib/utils';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  showAdvanced = false,
  onToggleAdvanced,
}: SearchAndFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-sm">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search courses, professors, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 h-12 text-lg border-slate-300 focus:border-course-primary focus:ring-course-primary"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={onToggleAdvanced}
          className={cn(
            'flex items-center space-x-2',
            showAdvanced && 'bg-course-primary text-white hover:bg-course-primary-dark'
          )}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 hover:text-slate-800"
          >
            <X className="w-4 h-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
          {/* Branch Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Branch
            </label>
            <Select
              value={filters.branch || 'all'}
              onValueChange={(value) => updateFilter('branch', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Semester
            </label>
            <Select
              value={filters.semester?.toString() || 'all'}
              onValueChange={(value) => 
                updateFilter('semester', value === 'all' ? undefined : parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Course Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type
            </label>
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) => updateFilter('type', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="elective">Elective</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Difficulty
            </label>
            <Select
              value={filters.difficulty || 'all'}
              onValueChange={(value) => updateFilter('difficulty', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
          {filters.branch && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Branch: {branches.find(b => b.id === filters.branch)?.code}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => updateFilter('branch', undefined)}
              />
            </Badge>
          )}
          {filters.semester && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Semester: {filters.semester}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => updateFilter('semester', undefined)}
              />
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Type: {filters.type}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => updateFilter('type', undefined)}
              />
            </Badge>
          )}
          {filters.difficulty && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Difficulty: {filters.difficulty}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => updateFilter('difficulty', undefined)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
