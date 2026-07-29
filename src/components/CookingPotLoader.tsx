import { motion } from "motion/react";

interface CookingPotLoaderProps {
  onComplete?: () => void;
  message?: string;
}

export default function CookingPotLoader({ message = "Préparation de vos saveurs africaines..." }: CookingPotLoaderProps) {
  // Traditional West African three-legged cooking pot (Marmite Africaine)
  return (
    <div className="fixed inset-0 bg-brand-cream z-50 flex flex-col items-center justify-center p-6 select-none">
      <div className="relative w-64 h-64 flex flex-col items-center justify-center">
        {/* Steam Waves */}
        <div className="absolute top-8 flex space-x-3 justify-center items-end h-20 w-32">
          {[0, 1, 2, 3].map((index) => (
            <motion.svg
              key={index}
              className="w-6 h-16 text-brand-orange/30"
              viewBox="0 0 20 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                y: [-10, -60],
                x: [0, index % 2 === 0 ? 15 : -15, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeInOut",
              }}
            >
              <path d="M10,90 Q20,70 10,50 T10,10" />
            </motion.svg>
          ))}
        </div>

        {/* African Cooking Pot (Marmite) */}
        <div className="relative mt-12 w-48 h-36">
          {/* Pot Lid Handle */}
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-brand-dark rounded-t-full border-t border-gray-600"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Pot Lid */}
          <motion.div 
            className="absolute top-0 left-4 right-4 h-5 bg-brand-dark rounded-full shadow-md border-b-2 border-brand-orange/50"
            animate={{ rotate: [0, -1, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
          />

          {/* Pot Body (Bulbous Clay/Iron Pot) */}
          <div className="absolute top-4 left-0 right-0 h-24 bg-brand-dark rounded-b-full border-x border-b border-gray-800 shadow-2xl flex flex-col items-center justify-center">
            {/* Traditional Geometric Pattern Engraved on Pot */}
            <div className="w-full h-4 flex justify-around opacity-40 overflow-hidden px-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-3 rotate-45 border-r border-b border-brand-orange" />
              ))}
            </div>
            
            {/* Brand Initials engraved */}
            <span className="font-serif text-brand-orange text-xs tracking-widest font-semibold mt-1">ICP</span>
          </div>

          {/* Side handles */}
          <div className="absolute top-8 -left-2 w-3 h-6 bg-brand-dark rounded-l-full border-l border-gray-800" />
          <div className="absolute top-8 -right-2 w-3 h-6 bg-brand-dark rounded-r-full border-r border-gray-800" />

          {/* Three Legs of the Marmite */}
          <div className="absolute -bottom-4 left-8 w-4 h-6 bg-brand-dark rounded-b-lg origin-top rotate-12" />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-6 bg-brand-dark rounded-b-lg" />
          <div className="absolute -bottom-4 right-8 w-4 h-6 bg-brand-dark rounded-b-lg origin-top -rotate-12" />
        </div>

        {/* Glowing Embers and Fire beneath */}
        <div className="absolute bottom-12 flex justify-center items-center w-36 h-6">
          <motion.div
            className="w-24 h-4 bg-brand-orange rounded-full blur-md"
            animate={{
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.7, 0.9, 0.6, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="absolute flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-4 bg-red-600 rounded-t-full"
                animate={{
                  y: [0, -10 - (i % 2) * 6, 0],
                  scaleX: [1, 1.3, 0.8, 1],
                }}
                transition={{
                  duration: 0.8 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Traditional Border Spacer */}
      <div className="flex space-x-1 my-4 opacity-50">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-brand-green" />
        ))}
      </div>

      <motion.p
        className="font-serif text-xl text-brand-dark font-medium tracking-wide text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      <p className="text-xs text-brand-green font-mono uppercase tracking-widest mt-2">
        Ivoir'Cuisine Pro
      </p>
    </div>
  );
}
