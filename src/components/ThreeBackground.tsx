import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  type?: 'particles' | 'neural' | 'matrix';
  className?: string;
  enabled?: boolean; // new prop to control rendering
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ 
  type = 'particles', 
  className = '',
  enabled = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Detect mobile
    const isMobile = window.innerWidth < 768;

    // Create different backgrounds based on type
    if (type === 'particles') {
      createParticleSystem(scene, isMobile);
    } else if (type === 'neural') {
      createNeuralNetwork(scene);
    } else if (type === 'matrix') {
      createMatrix(scene);
    }

    camera.position.z = 5;

    // Animation loop with frame limiting (max 60fps)
    const animate = (now: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (now - lastFrameTime.current < 1000 / 60) return; // 60fps cap
      lastFrameTime.current = now;
      if (scene.children.length > 0) {
        scene.children.forEach((child, i) => {
          if (child instanceof THREE.Points || child instanceof THREE.Mesh) {
            child.rotation.y += 0.001 * (i + 1);
            child.rotation.x += 0.0005 * (i + 1);
          }
        });
      }
      renderer.render(scene, camera);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [type, enabled]);

  // Particle count is now responsive
  const createParticleSystem = (scene: THREE.Scene, isMobile: boolean) => {
    const particleCount = isMobile ? 300 : 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      const color = Math.random() > 0.5 
        ? new THREE.Color(0xF1464A) 
        : new THREE.Color(0x635D7D);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
  };

  const createNeuralNetwork = (scene: THREE.Scene) => {
    const nodeCount = 50;
    const nodes: THREE.Vector3[] = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      nodes.push(node);

      // Create node sphere
      const geometry = new THREE.SphereGeometry(0.05, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0xF1464A,
        transparent: true,
        opacity: 0.8
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(node);
      scene.add(sphere);
    }

    // Create connections
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.distanceTo(otherNode) < 2) {
          linePositions.push(node.x, node.y, node.z);
          linePositions.push(otherNode.x, otherNode.y, otherNode.z);
        }
      });
    });

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x635D7D,
      transparent: true,
      opacity: 0.3
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
  };

  const createMatrix = (scene: THREE.Scene) => {
    const gridSize = 20;
    const spacing = 0.5;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const height = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;
        
        const geometry = new THREE.BoxGeometry(0.1, height + 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(
            (x + z) * 0.05, 
            0.7, 
            0.5 + Math.sin(Date.now() * 0.001 + x + z) * 0.2
          ),
          transparent: true,
          opacity: 0.6
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
          (x - gridSize / 2) * spacing,
          height / 2,
          (z - gridSize / 2) * spacing
        );
        scene.add(cube);
      }
    }
  };

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};