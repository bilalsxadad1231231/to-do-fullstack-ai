import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1 mb-2 sm:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>using React & FastAPI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://docs.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Docs</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 