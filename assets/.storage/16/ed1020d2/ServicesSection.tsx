import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThreeBackground } from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  details: string;
}

const services: Service[] = [
  {
    title: "AI/ML Solutions",
    description: "Intelligent systems that learn and adapt to your business needs",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
    icon: "🧠",
    details: "End-to-end AI solutions from data processing to model deployment"
  },
  {
    title: "Cloud Migration",
    description: "Seamless transition to cloud infrastructure with zero downtime",
    technologies: ["AWS", "Azure", "GCP", "Kubernetes"],
    icon: "☁️",
    details: "Complete cloud strategy and migration services"
  },
  {
    title: "L3 Support",
    description: "Expert-level technical support for critical systems",
    technologies: ["24/7 Monitoring", "Incident Response", "Performance Tuning"],
    icon: "🛠️",
    details: "Advanced troubleshooting and system optimization"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable business insights",
    technologies: ["Apache Spark", "Tableau", "Power BI", "Snowflake"],
    icon: "📊",
    details: "Advanced analytics and business intelligence solutions"
  },
  {
    title: "DevOps & Automation",
    description: "Streamline development with CI/CD and infrastructure automation",
    technologies: ["Docker", "Jenkins", "Terraform", "Ansible"],
    icon: "⚙️",
    details: "Complete DevOps transformation and automation"
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets",
    technologies: ["Zero Trust", "SIEM", "Penetration Testing", "Compliance"],
    icon: "🔒",
    details: "Advanced security architecture and threat protection"
  }
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service tiles
      gsap.fromTo('.service-tile',
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 50,
          rotationX: -15
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Matrix background animation
      gsap.to('.services-bg', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="services-section relative min-h-screen py-24 overflow-hidden"
    >
      {/* Animated Matrix Background */}
      <div className="services-bg absolute inset-0 opacity-10">
        <ThreeBackground type="matrix" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 cinematic-text">
            Karmuu Operating System
          </h2>
          <p className="text-xl text-porcelain/70 max-w-3xl mx-auto">
            A comprehensive intelligence matrix of services designed to transform your business
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-tile magnetic"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedService(service)}
            >
              <Card className="glassmorphic h-full cursor-pointer group transition-all duration-300 hover:border-coral/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <div className="w-3 h-3 bg-coral rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                  <CardTitle className="text-xl text-porcelain group-hover:text-coral transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-porcelain/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-violet/20 text-porcelain border-violet/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {service.technologies.length > 3 && (
                      <Badge variant="outline" className="border-coral/30 text-coral">
                        +{service.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Service Panel */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-vantablack/80 backdrop-blur-md"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glassmorphic max-w-2xl w-full p-8 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedService.icon}</span>
                    <h3 className="text-3xl font-bold text-porcelain">{selectedService.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedService(null)}
                    className="text-porcelain hover:text-coral"
                  >
                    ✕
                  </Button>
                </div>
                
                <p className="text-lg text-porcelain/80 mb-6">{selectedService.details}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-porcelain mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        className="bg-coral/20 text-coral border-coral/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-coral hover:bg-coral/80">
                    Learn More
                  </Button>
                  <Button variant="outline" className="flex-1 border-violet text-violet hover:bg-violet/10">
                    Case Studies
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};