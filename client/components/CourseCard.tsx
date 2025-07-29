import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, User, Calendar, Trophy } from 'lucide-react';
import { Course } from '@shared/types';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { cn } from '../lib/utils';

interface CourseCardProps {
  course: Course;
  showBranch?: boolean;
}

export function CourseCard({ course, showBranch = false }: CourseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-course-success text-white';
      case 'moderate':
        return 'bg-course-accent text-white';
      case 'hard':
        return 'bg-course-error text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) ? 'text-course-accent fill-current' : 'text-slate-300'
        )}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-slate-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <Link 
              to={`/course/${course.id}`}
              className="block"
            >
              <h3 className="font-semibold text-slate-800 group-hover:text-course-primary transition-colors line-clamp-2">
                {course.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{course.code}</p>
            </Link>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            {renderStars(course.averageRating)}
            <span className="text-sm font-medium text-slate-700 ml-1">
              {course.averageRating.toFixed(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
          <Badge variant="outline" className="text-course-primary border-course-primary">
            {course.type}
          </Badge>
          {showBranch && (
            <Badge variant="secondary">
              {course.branch.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-slate-600 mb-3">
          <User className="w-4 h-4 mr-2" />
          <span className="truncate">{course.professor}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-slate-600">
            <Calendar className="w-4 h-4 mr-2 text-course-primary" />
            <span>Semester {course.semester}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <BookOpen className="w-4 h-4 mr-2 text-course-primary" />
            <span>{course.credits} Credits</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center text-sm text-slate-600">
            <Trophy className="w-4 h-4 mr-1 text-course-accent" />
            <span>{course.totalReviews} reviews</span>
          </div>
          <Link
            to={`/course/${course.id}`}
            className="text-sm font-medium text-course-primary hover:text-course-primary-dark transition-colors"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
