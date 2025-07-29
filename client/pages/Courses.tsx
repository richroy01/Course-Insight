import React from 'react';
import { Layout } from '../components/Layout';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function Courses() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-course-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-course-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Courses Page Coming Soon</h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you the complete course listing page with advanced filtering, 
            sorting, and detailed course information. This page will allow you to browse all available 
            courses by branch, semester, difficulty, and more.
          </p>
          <div className="space-y-4">
            <p className="text-slate-600">
              In the meantime, you can explore featured courses and search functionality on the homepage.
            </p>
            <Link to="/">
              <Button className="bg-course-primary hover:bg-course-primary-dark">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
