import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { HeroSection } from '@/components/HeroSection';
import { MissionSection } from '@/components/MissionSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TeamSection } from '@/components/TeamSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { MetricsSection } from '@/components/MetricsSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import { Navigation } from '@/components/Navigation';
import { MagneticCursor } from '@/components/MagneticCursor';

export default function KarmuuTechnologies() {
  const { containerRef } = useScrollAnimations();

  return (
    <div ref={containerRef} className="min-h-screen bg-vantablack text-porcelain overflow-x-hidden">
      {/* Custom Cursor */}
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />

      {/* Page Sections */}
      <main>
        <HeroSection />
        <MissionSection />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <div id="cases">
          <CaseStudiesSection />
        </div>
        <div id="metrics">
          <MetricsSection />
        </div>
        <div id="contact">
          <FinalCTASection />
        </div>
      </main>

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-silver/3 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}