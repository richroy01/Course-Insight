import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, Star, PenTool, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Courses', href: '/courses', icon: Search },
    { name: 'Submit Review', href: '/submit-review', icon: PenTool },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-course-primary to-course-secondary rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-course-primary to-course-primary-dark bg-clip-text text-transparent">
                CourseInsight
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-course-primary text-white'
                        : 'text-slate-600 hover:text-course-primary hover:bg-course-primary/10'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-course-primary text-white'
                          : 'text-slate-600 hover:text-course-primary hover:bg-course-primary/10'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-course-primary to-course-secondary rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-course-primary to-course-primary-dark bg-clip-text text-transparent">
                  CourseInsight
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Helping students make informed decisions about their academic journey through honest course reviews and ratings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-slate-600 hover:text-course-primary text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>Email: support@courseinsight.edu</p>
                <p>Phone: +1 (555) 123-4567</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-slate-400 hover:text-course-primary transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-slate-400 hover:text-course-primary transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-slate-400 hover:text-course-primary transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-8 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2024 CourseInsight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
