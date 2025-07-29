import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-course-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-course-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Course Details Page Coming Soon</h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            We're building a comprehensive course details page that will show detailed information, 
            student reviews, rating breakdowns, professor information, and much more for course ID: {id}.
          </p>
          <div className="space-y-4">
            <p className="text-slate-600">
              This page will include:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-slate-600">
              <li>• Detailed course description and syllabus</li>
              <li>• Professor information and teaching style</li>
              <li>• Student reviews and ratings breakdown</li>
              <li>• Difficulty and workload analysis</li>
              <li>• Prerequisites and recommended preparation</li>
            </ul>
            <div className="pt-4">
              <Link to="/">
                <Button className="bg-course-primary hover:bg-course-primary-dark">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
