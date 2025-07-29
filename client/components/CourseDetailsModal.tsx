import React from 'react';
import { X, Star, User, Clock, BookOpen, Users, Calendar, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Course, Review } from '@shared/types';
import { reviews } from '@shared/mockData';
import { cn } from '../lib/utils';

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailsModal({ course, isOpen, onClose }: CourseDetailsModalProps) {
  if (!course) return null;

  const courseReviews = reviews.filter(review => review.courseId === course.id);
  
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 pr-8">
            {course.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Course Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Course Code:</span>
                <span>{course.code}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Professor:</span>
                <span>{course.professor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Semester:</span>
                <span>{course.semester}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Credits:</span>
                <span>{course.credits}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Rating:</span>
                <div className="flex items-center space-x-1">
                  {renderStars(course.averageRating)}
                  <span className="text-sm font-medium ml-1">{course.averageRating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-course-primary" />
                <span className="font-medium">Reviews:</span>
                <span>{course.totalReviews}</span>
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-medium">Tags:</span>
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <Badge variant="outline" className="text-course-primary border-course-primary">
                  {course.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Course Description</h3>
            <p className="text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Rating Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Rating Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-course-primary">{course.teaching.toFixed(1)}</div>
                <div className="text-sm text-slate-600">Teaching Quality</div>
                <div className="flex justify-center mt-1">
                  {renderStars(course.teaching)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-course-primary">{course.facilities.toFixed(1)}</div>
                <div className="text-sm text-slate-600">Facilities</div>
                <div className="flex justify-center mt-1">
                  {renderStars(course.facilities)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-course-primary">{course.averageRating.toFixed(1)}</div>
                <div className="text-sm text-slate-600">Overall</div>
                <div className="flex justify-center mt-1">
                  {renderStars(course.averageRating)}
                </div>
              </div>
            </div>
          </div>

          {/* Student Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Student Reviews</h3>
            {courseReviews.length > 0 ? (
              <div className="space-y-4">
                {courseReviews.slice(0, 3).map((review) => (
                  <Card key={review.id} className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-course-primary rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">
                              {review.isAnonymous ? 'Anonymous Student' : review.studentName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {formatDate(review.date)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.overallRating)}
                          <span className="text-sm font-medium ml-1">{review.overallRating}/5</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{review.feedback}</p>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500">Teaching:</span>
                          <div className="flex items-center">
                            {renderStars(review.teachingRating)}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Difficulty:</span>
                          <div className="flex items-center">
                            {renderStars(review.difficultyRating)}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Facilities:</span>
                          <div className="flex items-center">
                            {renderStars(review.facilitiesRating)}
                          </div>
                        </div>
                      </div>
                      {review.helpful > 0 && (
                        <div className="mt-2 text-xs text-slate-500">
                          👍 {review.helpful} students found this helpful
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {courseReviews.length > 3 && (
                  <p className="text-center text-sm text-slate-500">
                    And {courseReviews.length - 3} more reviews...
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">No reviews yet for this course.</p>
                <p className="text-sm text-slate-400">Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
