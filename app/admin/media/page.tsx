import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  Image as ImageIcon,
  Trash2
} from 'lucide-react';

// Mock media data
const mediaItems = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    name: 'AI Technology',
    type: 'image',
    size: '2.5 MB',
    uploadedAt: '2024-01-15'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg',
    name: 'Machine Learning',
    type: 'image',
    size: '3.1 MB',
    uploadedAt: '2024-01-14'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
    name: 'Data Analytics',
    type: 'image',
    size: '2.8 MB',
    uploadedAt: '2024-01-13'
  }
];

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mediaItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src={item.url}
                  alt={item.name}
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>{item.size}</div>
                  <div>{new Date(item.uploadedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 