import React from 'react';

const Projects = () => {
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'Developing a responsive e-commerce platform using React and Node.js.',
      category: 'Web Development',
      analytics: {
        views: 1200,
        likes: 800,
        comments: 25
      }
    },
    {
      id: 2,
      title: 'Image Classification App',
      description: 'Building an image classification app using machine learning and TensorFlow.',
      category: 'Machine Learning',
      analytics: {
        views: 950,
        likes: 700,
        comments: 35
      }
    },
    {
      id: 3,
      title: 'Chatbot Development',
      description: 'Creating an AI-powered chatbot for customer support using NLP techniques.',
      category: 'Artificial Intelligence',
      analytics: {
        views: 850,
        likes: 600,
        comments: 30
      }
    },
    {
      id: 4,
      title: 'Blockchain Application',
      description: 'Implementing a decentralized application (DApp) for secure transactions.',
      category: 'Blockchain',
      analytics: {
        views: 780,
        likes: 550,
        comments: 20
      }
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      description: 'Developing a data visualization dashboard using D3.js and React.',
      category: 'Data Science',
      analytics: {
        views: 700,
        likes: 500,
        comments: 15
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div key={project.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{project.description}</p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">{project.category}</span>
            </div>
            <div className="mt-2">
              <ul className="flex">
                <li className="mr-4">
                  <strong>{project.analytics.views}</strong> views
                </li>
                <li className="mr-4">
                  <strong>{project.analytics.likes}</strong> likes
                </li>
                <li className="mr-4">
                  <strong>{project.analytics.comments}</strong> comments
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
