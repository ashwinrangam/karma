import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  solution: string;
  metrics: string[];
  techStack: string[];
  image: string;
  timeline: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "fintech-ai",
    title: "AI-Powered Financial Fraud Detection",
    client: "Global FinTech Leader",
    industry: "Financial Services",
    challenge: "Processing 10M+ daily transactions with 15% false positive rate",
    approach: "Built ensemble ML models with real-time stream processing",
    solution: "Deployed federated learning system with 99.7% accuracy",
    metrics: ["99.7% accuracy", "2.1% false positive rate", "$50M fraud prevented", "200ms response time"],
    techStack: ["TensorFlow", "Apache Kafka", "Redis", "AWS SageMaker"],
    image: "/api/placeholder/600/400",
    timeline: "6 months"
  },
  {
    id: "retail-cloud",
    title: "Global E-commerce Cloud Migration",
    client: "Fortune 100 Retailer",
    industry: "E-commerce",
    challenge: "Legacy monolith handling 1M+ daily orders with frequent outages",
    approach: "Microservices architecture with containerization and CI/CD",
    solution: "Kubernetes-native platform with auto-scaling and monitoring",
    metrics: ["99.99% uptime", "3x faster deployment", "$2M cost savings", "50% performance boost"],
    techStack: ["Kubernetes", "Docker", "Jenkins", "Prometheus"],
    image: "/api/placeholder/600/400",
    timeline: "8 months"
  },
  {
    id: "healthcare-analytics",
    title: "Predictive Healthcare Analytics Platform",
    client: "Major Hospital Network",
    industry: "Healthcare",
    challenge: "Predicting patient readmissions and optimizing resource allocation",
    approach: "Real-time data pipeline with predictive modeling",
    solution: "Integrated analytics platform with clinical decision support",
    metrics: ["23% reduction in readmissions", "30% better resource utilization", "15min faster diagnosis", "HIPAA compliant"],
    techStack: ["Apache Spark", "Snowflake", "Tableau", "Python"],
    image: "/api/placeholder/600/400",
    timeline: "12 months"
  },
  {
    id: "manufacturing-iot",
    title: "Smart Manufacturing IoT Solution",
    client: "Industrial Manufacturer",
    industry: "Manufacturing",
    challenge: "Equipment downtime costing $1M+ monthly in lost production",
    approach: "IoT sensors with predictive maintenance algorithms",
    solution: "Edge computing platform with real-time anomaly detection",
    metrics: ["40% reduction in downtime", "60% maintenance cost savings", "95% prediction accuracy", "ROI in 8 months"],
    techStack: ["Azure IoT", "Edge Computing", "Time Series DB", "Machine Learning"],
    image: "/api/placeholder/600/400",
    timeline: "10 months"
  }
];

export const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate case study cards
      gsap.fromTo('.case-card',
        { 
          scale: 0.9, 
          opacity: 0, 
          rotationX: -15 
        },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".case-studies-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax background effect
      gsap.to('.case-bg', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-studies-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="case-studies-section relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="case-bg absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-coral/10 via-transparent to-violet/10"></div>
        {/* Data Visualization Pattern */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle 
                cx={Math.random() * 1000} 
                cy={Math.random() * 1000} 
                r="2" 
                fill="rgba(241, 70, 74, 0.3)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <line 
                x1={Math.random() * 1000} 
                y1={Math.random() * 1000}
                x2={Math.random() * 1000} 
                y2={Math.random() * 1000}
                stroke="rgba(99, 93, 125, 0.2)" 
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 cinematic-text">
            Case Studies in Motion
          </h2>
          <p className="text-xl text-porcelain/70 max-w-3xl mx-auto">
            Real-world transformations that showcase our expertise in action
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="case-card magnetic"
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedCase(caseStudy)}
            >
              <Card className="glassmorphic h-full cursor-pointer group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-coral/80 text-white">
                      {caseStudy.industry}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="border-porcelain/30 text-porcelain">
                      {caseStudy.timeline}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-porcelain group-hover:text-coral transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                  <CardDescription className="text-porcelain/70">
                    {caseStudy.client}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-porcelain/80 text-sm mb-4 line-clamp-3">
                    {caseStudy.challenge}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {caseStudy.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="text-center p-2 bg-coral/10 rounded">
                        <span className="text-coral font-semibold text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.slice(0, 3).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-violet/20 text-porcelain text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="border-coral/30 text-coral text-xs">
                      Read More →
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-vantablack/90 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glassmorphic max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-transparent to-transparent"></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:text-coral bg-vantablack/50"
                  onClick={() => setSelectedCase(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-porcelain mb-2">
                      {selectedCase.title}
                    </h3>
                    <p className="text-coral text-lg">{selectedCase.client}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-coral/20 text-coral mb-2">
                      {selectedCase.industry}
                    </Badge>
                    <p className="text-porcelain/70 text-sm">{selectedCase.timeline}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-porcelain mb-3">Challenge</h4>
                    <p className="text-porcelain/80 mb-6">{selectedCase.challenge}</p>
                    
                    <h4 className="text-xl font-semibold text-porcelain mb-3">Approach</h4>
                    <p className="text-porcelain/80">{selectedCase.approach}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-porcelain mb-3">Solution</h4>
                    <p className="text-porcelain/80 mb-6">{selectedCase.solution}</p>

                    <h4 className="text-xl font-semibold text-porcelain mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.techStack.map((tech) => (
                        <Badge 
                          key={tech} 
                          className="bg-violet/20 text-porcelain border-violet/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-porcelain mb-4">Key Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCase.metrics.map((metric, i) => (
                      <div key={i} className="text-center p-4 bg-coral/10 rounded-lg">
                        <span className="text-coral font-bold text-lg block">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-coral hover:bg-coral/80">
                    Contact Us About This Project
                  </Button>
                  <Button variant="outline" className="flex-1 border-violet text-violet hover:bg-violet/10">
                    View Similar Cases
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};