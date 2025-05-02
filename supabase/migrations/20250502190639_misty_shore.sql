/*
  # Seed Initial Data

  1. Content
    - Add sample projects
    - Add sample blog posts

  2. Purpose
    - Populate the database with initial content for testing and development
*/

-- Seed projects
INSERT INTO projects (title, description, image, industry, slug, content, technologies)
VALUES
  (
    'Financial Forecasting AI',
    'Predictive analytics system for financial markets using deep learning.',
    'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Finance',
    'financial-forecasting-ai',
    '{
      "about": "Our Financial Forecasting AI is a cutting-edge solution that leverages deep learning to predict market trends and financial outcomes.",
      "challenge": "Financial institutions needed a more accurate way to predict market movements and make data-driven investment decisions.",
      "solution": "We developed a sophisticated AI model that analyzes multiple data sources including market indicators, news sentiment, and historical patterns.",
      "results": "The system achieved 85% accuracy in short-term market trend predictions, helping clients optimize their investment strategies."
    }',
    ARRAY['TensorFlow', 'Python', 'AWS', 'Time Series Analysis', 'Natural Language Processing']
  ),
  (
    'Healthcare Diagnostics',
    'AI-powered diagnostics platform for early disease detection.',
    'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Healthcare',
    'healthcare-diagnostics',
    '{
      "about": "Our Healthcare Diagnostics platform uses AI to assist medical professionals in early disease detection.",
      "challenge": "Traditional diagnostic methods were time-consuming and sometimes missed early signs of diseases.",
      "solution": "We created an AI system that analyzes medical imaging and patient data to identify potential health issues early.",
      "results": "Reduced diagnostic time by 60% while maintaining 99% accuracy in preliminary screenings."
    }',
    ARRAY['PyTorch', 'Medical Imaging', 'Cloud Computing', 'Machine Learning', 'HIPAA Compliance']
  );

-- Seed blog posts
INSERT INTO blog_posts (title, slug, date, image, excerpt, content)
VALUES
  (
    'The Future of AI in Enterprise',
    'future-of-ai-enterprise',
    '2024-01-15',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Exploring how artificial intelligence is transforming business operations and decision-making.',
    '<p>Artificial intelligence is rapidly transforming how enterprises operate, from automating routine tasks to providing deep insights for strategic decision-making. This evolution is not just about implementing new technologies—it''s about fundamentally rethinking how businesses operate in the digital age.</p>
    <h2>Key Trends in Enterprise AI</h2>
    <p>Several key trends are shaping the future of AI in enterprise settings:</p>
    <ul>
      <li>Automated Decision Making</li>
      <li>Predictive Analytics</li>
      <li>Natural Language Processing</li>
      <li>Computer Vision Applications</li>
    </ul>
    <p>As these technologies mature, we''re seeing increasingly sophisticated applications across various industries.</p>'
  ),
  (
    'Machine Learning Best Practices',
    'machine-learning-best-practices',
    '2024-01-10',
    'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Essential guidelines for implementing successful machine learning projects.',
    '<p>Successful machine learning projects require careful planning, robust methodology, and attention to detail. Here are some essential best practices that can help ensure your ML initiatives succeed.</p>
    <h2>Data Quality and Preparation</h2>
    <p>The foundation of any successful ML project is high-quality, well-prepared data. This includes:</p>
    <ul>
      <li>Thorough data cleaning</li>
      <li>Proper feature engineering</li>
      <li>Careful handling of missing values</li>
      <li>Appropriate data normalization</li>
    </ul>
    <p>Without these fundamentals in place, even the most sophisticated algorithms will struggle to perform effectively.</p>'
  );