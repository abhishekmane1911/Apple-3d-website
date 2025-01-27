import { useInView } from 'react-intersection-observer';
import { motion, useTransform, MotionValue } from 'framer-motion';
import Particles from 'react-tsparticles'; // Import the particles library

interface ScrollSectionProps {
  index: number;
  onExpand: () => void;
  progress: MotionValue<number>;
}

export function Elements({ index, onExpand, progress }: ScrollSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const yOffset = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25],
    [100, -100]
  );

  const scale = useTransform(
    progress,
    [index * 0.25, (index + 0.5) * 0.25, (index + 1) * 0.25],
    [0.8, 1, 0.8]
  );

  const opacity = useTransform(
    progress,
    [index * 0.25, (index + 0.5) * 0.25, (index + 1) * 0.25],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y: yOffset, scale, opacity }}
      className="min-h-screen flex items-center justify-center p-8 sticky top-0"
    >
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10">
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Section {index + 1}
          </h2>
          <p className="text-gray-300 mb-6">
            Watch the particles dance as you scroll! Each section reveals an interactive particle effect.
          </p>
        </div>
      </div>

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#000000", // Background color
            },
          },
          particles: {
            number: {
              value: 50, // Number of particles
            },
            size: {
              value: 3, // Size of particles
            },
            move: {
              enable: true,
              speed: 1, // Speed of particles
              direction: "none", // Direction of movement
            },
            opacity: {
              value: 0.5, // Opacity of particles
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse", // Particle interaction on hover
              },
            },
          },
        }}
      />
    </motion.div>
  );
}