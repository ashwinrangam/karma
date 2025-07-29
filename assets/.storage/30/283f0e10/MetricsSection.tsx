import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  value: string;
  label: string;
  description: string;
  icon: string;
}

const metrics: Metric[] = [
  {
    value: "98%",
    label: "Incident Resolution Rate",
    description: "Critical issues resolved within SLA",
    icon: "🎯"
  },
  {
    value: "$3.4M",
    label: "Cloud Savings Delivered",
    description: "Cost optimization across all clients",
    icon: "💰"
  },
  {
    value: "4",
    label: "Continents. 24/7 Support",
    description: "Global presence with round-the-clock service",
    icon: "🌍"
  },
  {
    value: "99.99%",
    label: "System Uptime",
    description: "Reliable infrastructure and monitoring",
    icon: "⚡"
  },
  {
    value: "150+",
    label: "Projects Delivered",
    description: "Successful transformations completed",
    icon: "🚀"
  },
  {
    value: "50+",
    label: "Enterprise Clients",
    description: "Fortune 500 companies trust us",
    icon: "🏢"
  }
];

export const MetricsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle animation setup
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#F1464A' : '#635D7D'
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (80 - distance) / 80 * 0.2;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP animations
    const ctx_gsap = gsap.context(() => {
      // Counter animations
      gsap.fromTo('.metric-number',
        { innerText: 0 },
        {
          innerText: (i, target) => {
            const value = target.dataset.value;
            return value.includes('%') ? parseInt(value) : 
                   value.includes('M') ? parseFloat(value) :
                   value.includes('+') ? parseInt(value) : parseInt(value);
          },
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: ".metrics-section",
            start: "top 80%",
            toggleActions: "play none none reset"
          },
          onUpdate: function() {
            const target = this.targets()[0] as HTMLElement;
            const originalValue = target.dataset.value!;
            const currentValue = Math.round(this.progress() * parseFloat(originalValue));
            
            if (originalValue.includes('%')) {
              target.innerText = `${currentValue}%`;
            } else if (originalValue.includes('M')) {
              target.innerText = `$${(currentValue / 10).toFixed(1)}M`;
            } else if (originalValue.includes('+')) {
              target.innerText = `${currentValue}+`;
            } else {
              target.innerText = currentValue.toString();
            }
          }
        }
      );

      // Metric cards animation
      gsap.fromTo('.metric-card',
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 50 
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".metrics-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      ctx_gsap.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="metrics-section relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-vantablack via-vantablack/98 to-coral/5"
    >
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 cinematic-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our Work Speaks in Numbers
          </motion.h2>
          <motion.p 
            className="text-xl text-porcelain/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Measurable results that drive business transformation
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="metric-card magnetic text-center p-8 glassmorphic rounded-lg group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                {metric.icon}
              </div>
              
              <div 
                className="metric-number text-4xl md:text-5xl font-bold text-coral mb-2"
                data-value={metric.value.replace(/[^\d.]/g, '')}
              >
                0
              </div>
              
              <h3 className="text-xl font-semibold text-porcelain mb-2 group-hover:text-coral transition-colors">
                {metric.label}
              </h3>
              
              <p className="text-porcelain/70 text-sm">
                {metric.description}
              </p>

              {/* Spark Lines Animation */}
              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-coral to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-full bg-coral animate-pulse"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </motion.div>
          ))}
        </div>

        {/* Floating Particles for Extra Visual Interest */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-coral/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};