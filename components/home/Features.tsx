import { BrainCircuit, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-slate-600 dark:text-slate-300" />,
    title: "Smart AI Models",
    description: "State-of-the-art machine learning models tailored for your specific needs."
  },
  {
    icon: <Zap className="h-6 w-6 text-slate-600 dark:text-slate-300" />,
    title: "Instant Inference",
    description: "Lightning-fast processing with optimized inference pipelines."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-slate-600 dark:text-slate-300" />,
    title: "Data-Driven Insights",
    description: "Transform raw data into actionable business intelligence."
  }
];

const Features = () => {
  return (
    <section 
      className="w-full py-20 min-h-[420px]"
      style={{ backgroundColor: '#f1f5f9' }} /* Forcing light slate background */
    >
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-shadow min-h-[220px]"
              style={{ backgroundColor: 'white' }} /* Forcing white background for feature cards */
            >
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 min-h-[28px]">{feature.title}</h3>
              <p className="text-muted-foreground min-h-[40px]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;