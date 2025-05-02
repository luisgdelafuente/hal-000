import { BrainCircuit, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "Smart AI Models",
    description: "State-of-the-art machine learning models tailored for your specific needs."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Inference",
    description: "Lightning-fast processing with optimized inference pipelines."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Data-Driven Insights",
    description: "Transform raw data into actionable business intelligence."
  }
];

const Features = () => {
  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;