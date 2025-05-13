import Image from 'next/image';
import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'about'); 
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    title: seoData.title, 
    description: seoData.description, 
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [{ url: seoData.ogImage }],
      type: 'website',
      url: `${siteUrl}/about`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/about`, 
    }
  };
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About HAL149</h1>
        <p className="text-lg text-muted-foreground">
          Pioneers in AI solutions for business transformation
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At HAL149, we're on a mission to democratize artificial intelligence and make it accessible to businesses of all sizes. 
            We believe that AI has the power to transform industries, streamline operations, and create new opportunities for growth.
          </p>
          <p className="text-muted-foreground">
            Our team of experts combines deep technical knowledge with business acumen to deliver solutions that not only leverage 
            cutting-edge technology but also address real-world challenges and deliver measurable results.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Team collaboration" 
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description: "We constantly push the boundaries of what's possible with AI, staying at the forefront of technological advancements."
            },
            {
              title: "Integrity",
              description: "We are committed to ethical AI development and transparent business practices that prioritize our clients' best interests."
            },
            {
              title: "Impact",
              description: "We measure our success by the tangible results and value we create for businesses and the broader community."
            }
          ].map((value, index) => (
            <div key={index} className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Chen",
              role: "CEO & Co-Founder",
              bio: "Ph.D. in Computer Science with 15+ years experience in AI and machine learning.",
              image: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            {
              name: "Michael Rodriguez",
              role: "CTO & Co-Founder",
              bio: "Former lead engineer at Google AI with expertise in neural networks and deep learning.",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            {
              name: "Aisha Patel",
              role: "Head of Research",
              bio: "Specialist in natural language processing and computer vision applications for business.",
              image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}