import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
  image: string;
  story: string;
  achievements: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Chief AI Architect",
    expertise: ["Machine Learning", "Deep Learning", "MLOps"],
    image: "/api/placeholder/300/300",
    story: "Leading AI transformation across Fortune 500 companies",
    achievements: ["50+ ML models in production", "PhD in Computer Science", "Former Google AI researcher"]
  },
  {
    name: "Sarah Rodriguez",
    role: "Cloud Infrastructure Lead",
    expertise: ["AWS", "Kubernetes", "DevOps"],
    image: "/api/placeholder/300/300",
    story: "Architecting scalable cloud solutions for global enterprises",
    achievements: ["99.99% uptime record", "AWS Solutions Architect Expert", "Kubernetes certified"]
  },
  {
    name: "Marcus Thompson",
    role: "Data Science Director",
    expertise: ["Analytics", "Big Data", "Statistical Modeling"],
    image: "/api/placeholder/300/300",
    story: "Transforming raw data into strategic business insights",
    achievements: ["$10M+ cost savings delivered", "Published researcher", "Harvard MBA"]
  },
  {
    name: "Priya Patel",
    role: "Cybersecurity Specialist",
    expertise: ["Zero Trust", "Penetration Testing", "Compliance"],
    image: "/api/placeholder/300/300",
    story: "Protecting digital assets with cutting-edge security",
    achievements: ["CISSP certified", "Former NSA consultant", "Zero breaches record"]
  },
  {
    name: "David Kim",
    role: "Product Innovation Lead",
    expertise: ["Product Strategy", "UX Design", "Innovation"],
    image: "/api/placeholder/300/300",
    story: "Creating user-centric solutions that drive business growth",
    achievements: ["20+ successful product launches", "Design Thinking certified", "Stanford graduate"]
  }
];

export const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const scrollContainer = containerRef.current;
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;
        
        gsap.to(scrollContainer, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            onUpdate: (self) => {
              // Animate cards based on scroll progress
              gsap.to('.team-card', {
                rotationY: self.progress * 5 - 2.5,
                duration: 0.3
              });
            }
          }
        });
      }

      // Individual card animations
      gsap.fromTo('.team-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.team-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="team-section relative h-screen overflow-hidden bg-gradient-to-br from-vantablack via-vantablack/95 to-violet/10"
    >
      {/* Section Header */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 cinematic-text">
          Faces Behind the Future
        </h2>
        <p className="text-lg text-porcelain/70">
          Meet the visionaries driving technological transformation
        </p>
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={containerRef}
        className="team-cards flex items-center h-full pt-32 pb-16 pl-8"
        style={{ width: `${teamMembers.length * 400 + 200}px` }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="team-card magnetic flex-shrink-0 w-80 h-96 mx-4"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glassmorphic h-full overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vantablack/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-porcelain">{member.name}</h3>
                  <p className="text-coral text-sm">{member.role}</p>
                </div>
              </div>
              
              <CardContent className="p-4 h-48 flex flex-col justify-between">
                <div>
                  <p className="text-porcelain/80 text-sm mb-3">{member.story}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.expertise.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-violet/20 text-porcelain text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ul className="text-xs text-porcelain/70 space-y-1">
                    {member.achievements.slice(0, 2).map((achievement, i) => (
                      <li key={i}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Join Karmuu CTA */}
        <motion.div
          className="team-card flex-shrink-0 w-80 h-96 mx-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Card className="glassmorphic glow-border h-full w-full flex flex-col items-center justify-center text-center p-8 cursor-pointer group">
            <div className="text-6xl mb-6 animate-pulse-glow">🚀</div>
            <h3 className="text-2xl font-bold text-porcelain mb-4">Join Karmuu</h3>
            <p className="text-porcelain/70 mb-6">
              Be part of the team shaping the future of technology
            </p>
            <Button 
              className="bg-coral hover:bg-coral/80 text-white magnetic"
              size="lg"
            >
              View Careers
            </Button>
            <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-transparent to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};