import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, BookOpen, TrendingUp, Users, Award, ChevronRight, Sparkles } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { CourseDetailsModal } from '../components/CourseDetailsModal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { courses, featuredCourses, branches } from '@shared/mockData';
import { SearchFilters, Course } from '@shared/types';
import { cn } from '../lib/utils';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          course.name.toLowerCase().includes(query) ||
          course.professor.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Branch filter
      if (filters.branch && course.branch !== filters.branch) return false;
      
      // Semester filter
      if (filters.semester && course.semester !== filters.semester) return false;
      
      // Type filter
      if (filters.type && course.type !== filters.type) return false;
      
      // Difficulty filter
      if (filters.difficulty && course.difficulty !== filters.difficulty) return false;
      
      // Rating filter
      if (filters.minRating && course.averageRating < filters.minRating) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const stats = {
    totalCourses: courses.length,
    totalReviews: courses.reduce((sum, course) => sum + course.totalReviews, 0),
    averageRating: courses.reduce((sum, course) => sum + course.averageRating, 0) / courses.length,
    branches: branches.length
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-course-primary/5 via-course-secondary/5 to-course-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-course-primary/10 text-course-primary border-course-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by thousands of students
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Discover the
              <span className="bg-gradient-to-r from-course-primary to-course-primary-dark bg-clip-text text-transparent">
                {' '}Best Courses{' '}
              </span>
              for Your Journey
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              CourseInsight helps you make informed decisions about your academic path through honest student reviews, detailed ratings, and comprehensive course information.
            </p>
            <p className="text-lg text-course-primary font-semibold max-w-2xl mx-auto mb-8">
              Specially designed for students of VIT University
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-course-primary">{stats.totalCourses}+</div>
                <div className="text-sm text-slate-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-course-primary">{stats.totalReviews.toLocaleString()}+</div>
                <div className="text-sm text-slate-600">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-course-primary">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-slate-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-course-primary">{stats.branches}</div>
                <div className="text-sm text-slate-600">Branches</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFiltersChange={setFilters}
              showAdvanced={showAdvancedFilters}
              onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/courses">
              <Button size="lg" className="bg-course-primary hover:bg-course-primary-dark">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse All Courses
              </Button>
            </Link>
            <Link to="/submit-review">
              <Button size="lg" variant="outline" className="border-course-primary text-course-primary hover:bg-course-primary hover:text-white">
                <Star className="w-5 h-5 mr-2" />
                Submit a Review
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {searchQuery || Object.keys(filters).length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800">
                Search Results
                <span className="text-lg font-normal text-slate-600 ml-3">
                  ({filteredCourses.length} courses found)
                </span>
              </h2>
              {filteredCourses.length > 6 && (
                <Link to="/courses" className="flex items-center text-course-primary hover:text-course-primary-dark">
                  View all results
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} showBranch={true} />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No courses found</h3>
                <p className="text-slate-500">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Courses</h2>
                <p className="text-slate-600">Highest-rated courses across all branches</p>
              </div>
              <Link to="/courses" className="flex items-center text-course-primary hover:text-course-primary-dark">
                View all courses
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} showBranch={true} />
              ))}
            </div>

            {/* Popular Branches */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Explore by Branch</h2>
              <p className="text-slate-600 mb-8 text-center">Click on any course to see detailed description and student reviews</p>
              {branches.slice(0, 3).map((branch) => {
                const branchCourses = courses.filter(c => c.branch === branch.id);

                return (
                  <div key={branch.id} className="mb-12">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-course-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{branch.name}</h3>
                        <p className="text-sm text-slate-600">{branch.code} • {branchCourses.length} courses available</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {branchCourses.slice(0, 3).map((course) => (
                        <div
                          key={course.id}
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsModalOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <CourseCard course={course} showBranch={false} />
                        </div>
                      ))}
                    </div>

                    {branchCourses.length > 3 && (
                      <div className="text-center mt-6">
                        <Link to={`/courses?branch=${branch.id}`}>
                          <Button variant="outline" className="border-course-primary text-course-primary hover:bg-course-primary hover:text-white">
                            View all {branchCourses.length} {branch.code} courses
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Why Choose CourseInsight */}
            <div className="bg-gradient-to-r from-course-primary/5 to-course-secondary/5 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Choose CourseInsight?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-course-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Student Reviews</h3>
                  <p className="text-slate-600">
                    Get honest feedback from students who have actually taken the courses. Real experiences, real insights.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-course-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Detailed Analytics</h3>
                  <p className="text-slate-600">
                    Comprehensive ratings for teaching quality, course difficulty, and facilities to help you decide.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-course-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Quality Assured</h3>
                  <p className="text-slate-600">
                    All reviews are moderated to ensure authenticity and helpfulness for the student community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
