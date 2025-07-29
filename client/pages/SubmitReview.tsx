import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Search, User, BookOpen, Star as StarIcon, MessageSquare, Shield } from 'lucide-react';
import { courses, branches } from '@shared/mockData';
import { Course } from '@shared/types';
import { cn } from '../lib/utils';

interface ReviewForm {
  courseId: string;
  studentName: string;
  isAnonymous: boolean;
  overallRating: number;
  difficultyRating: number;
  facilitiesRating: number;
  teachingRating: number;
  feedback: string;
}

export default function SubmitReview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<ReviewForm>({
    courseId: '',
    studentName: '',
    isAnonymous: false,
    overallRating: 0,
    difficultyRating: 0,
    facilitiesRating: 0,
    teachingRating: 0,
    feedback: ''
  });

  const filteredCourses = courses.filter(course => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query) ||
      course.professor.toLowerCase().includes(query)
    );
  });

  const handleCourseSelect = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setFormData(prev => ({ ...prev, courseId }));
    }
  };

  const updateFormData = <K extends keyof ReviewForm>(
    field: K,
    value: ReviewForm[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getDifficultyLevel = (rating: number): string => {
    if (rating <= 2) return 'easy';
    if (rating <= 3) return 'moderate';
    return 'hard';
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
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

  const isFormValid = () => {
    return (
      formData.courseId &&
      formData.overallRating > 0 &&
      formData.difficultyRating > 0 &&
      formData.facilitiesRating > 0 &&
      formData.teachingRating > 0 &&
      formData.feedback.trim().length >= 10 &&
      (!formData.isAnonymous ? formData.studentName.trim().length >= 2 : true)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Here you would typically submit to an API
      console.log('Submitting review:', formData);
      setShowSuccessMessage(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          courseId: '',
          studentName: '',
          isAnonymous: false,
          overallRating: 0,
          difficultyRating: 0,
          facilitiesRating: 0,
          teachingRating: 0,
          feedback: ''
        });
        setSelectedCourse(null);
        setSearchQuery('');
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  if (showSuccessMessage) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-course-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Review Submitted Successfully!</h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for sharing your experience. Your review will help other students make informed decisions about their course selections.
            </p>
            <div className="bg-course-primary/5 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-slate-600 space-y-2 text-left max-w-md mx-auto">
                <li>• Your review will be moderated within 24 hours</li>
                <li>• Once approved, it will be visible to other students</li>
                <li>• You can submit more reviews for other courses</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Submit a Course Review
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Share your experience and help fellow students make informed decisions about their course selections.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-course-primary" />
                <span>Select Course</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="courseSearch">Search for a course</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="courseSearch"
                    type="text"
                    placeholder="Type course name, code, or professor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {searchQuery && (
                <div className="border rounded-lg max-h-60 overflow-y-auto">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.slice(0, 10).map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handleCourseSelect(course.id)}
                        className={cn(
                          'w-full text-left p-4 hover:bg-slate-50 border-b last:border-b-0 transition-colors',
                          selectedCourse?.id === course.id && 'bg-course-primary/5 border-course-primary'
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-800">{course.name}</h4>
                            <p className="text-sm text-slate-600">{course.code} • {course.professor}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {branches.find(b => b.id === course.branch)?.code}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Semester {course.semester}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-course-accent fill-current" />
                            <span className="text-sm">{course.averageRating}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500">
                      No courses found matching your search.
                    </div>
                  )}
                </div>
              )}

              {selectedCourse && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Selected: <strong>{selectedCourse.name}</strong> ({selectedCourse.code}) by {selectedCourse.professor}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-course-primary" />
                <span>Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => updateFormData('isAnonymous', checked)}
                />
                <Label htmlFor="anonymous" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Submit anonymously</span>
                </Label>
              </div>

              {!formData.isAnonymous && (
                <div>
                  <Label htmlFor="studentName">Your Name</Label>
                  <Input
                    id="studentName"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.studentName}
                    onChange={(e) => updateFormData('studentName', e.target.value)}
                    className="mt-2"
                    required={!formData.isAnonymous}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ratings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-course-primary" />
                <span>Rate the Course</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StarRating
                label="Overall Rating"
                value={formData.overallRating}
                onChange={(rating) => updateFormData('overallRating', rating)}
                size="lg"
              />

              <StarRating
                label="Teaching Quality"
                value={formData.teachingRating}
                onChange={(rating) => updateFormData('teachingRating', rating)}
              />

              <StarRating
                label="Course Facilities & Resources"
                value={formData.facilitiesRating}
                onChange={(rating) => updateFormData('facilitiesRating', rating)}
              />

              <div>
                <StarRating
                  label="Difficulty Level"
                  value={formData.difficultyRating}
                  onChange={(rating) => updateFormData('difficultyRating', rating)}
                />
                {formData.difficultyRating > 0 && (
                  <div className="mt-2">
                    <Badge className={getDifficultyColor(getDifficultyLevel(formData.difficultyRating))}>
                      {getDifficultyLevel(formData.difficultyRating)}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Written Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-course-primary" />
                <span>Written Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="feedback">Share your experience</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell other students about your experience with this course. What did you like? What was challenging? Any tips for future students?"
                  value={formData.feedback}
                  onChange={(e) => updateFormData('feedback', e.target.value)}
                  className="mt-2 min-h-[120px]"
                  required
                />
                <p className="text-sm text-slate-500 mt-2">
                  Minimum 10 characters ({formData.feedback.length}/10)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid()}
              className="bg-course-primary hover:bg-course-primary-dark px-8"
            >
              Submit Review
            </Button>
          </div>

          {!isFormValid() && (
            <p className="text-center text-sm text-slate-500">
              Please complete all required fields to submit your review.
            </p>
          )}
        </form>
      </div>
    </Layout>
  );
}
