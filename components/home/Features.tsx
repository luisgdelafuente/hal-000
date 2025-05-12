'use client';

import { useEffect, useState } from 'react';
import { BrainCircuit, Zap, BarChart3 } from 'lucide-react';
import { getPageContent } from '@/lib/db';

const ICONS: Record<string, any> = {
  BrainCircuit,
  Zap,
  BarChart3,
};

const Features = () => {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const page = await getPageContent('home');
        console.log('Fetched page:', page);
        let content = page?.content;
        if (typeof content === 'string') {
          try {
            content = JSON.parse(content);
          } catch (e) {
            console.error('Error parsing content JSON:', e);
            content = {};
          }
        }
        console.log('Page content:', content);
        console.log('Features array:', content?.features);
        setFeatures(content?.features || []);
      } catch (error) {
        console.error('Error fetching features:', error);
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatures();
  }, []);

  return (
    <section 
      className="w-full py-20 min-h-[420px]"
      style={{ backgroundColor: '#f1f5f9' }}
    >
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center">Loading features...</div>
          ) : features.length === 0 ? (
            <div className="col-span-3 text-center">No features found.</div>
          ) : (
            features.map((feature, index) => {
  const Icon = feature.icon && ICONS[feature.icon];
  return (
    <div
      key={feature.id || index}
      className="p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-shadow min-h-[220px]"
      style={{ backgroundColor: 'white' }}
    >
      {Icon ? (
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <Icon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold mb-3 min-h-[28px]">{feature.title}</h3>
      <p className="text-muted-foreground min-h-[40px]">{feature.description}</p>
    </div>
  );
})
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;