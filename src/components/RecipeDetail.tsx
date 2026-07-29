import React, { useState, useEffect, useRef } from "react";
import { Recipe, ShoppingItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Users, Flame, Heart, ShoppingBag, CheckCircle, Share2, Award, Info, RefreshCw, X, ChevronLeft, ChevronRight, Eye, Sparkles, ArrowLeftRight, Play, Pause, RotateCcw, Volume2, VolumeX, Timer, Bell } from "lucide-react";
import { INGREDIENT_SUBSTITUTIONS } from "../data/substitutions";

interface RecipeDetailProps {
  recipe: Recipe;
  isFavorite: boolean;
  isCompleted: boolean;
  onToggleFavorite: () => void;
  onToggleComplete: () => void;
  onAddToShoppingList: (items: Omit<ShoppingItem, "id" | "completed">[]) => void;
  onBack: () => void;
  onShare: (platform: string) => void;
}

export default function RecipeDetail({
  recipe,
  isFavorite,
  isCompleted,
  onToggleFavorite,
  onToggleComplete,
  onAddToShoppingList,
  onBack,
  onShare,
}: RecipeDetailProps) {
  const [servings, setServings] = useState<number>(4); // Default to 4 people
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shoppingAddedAlert, setShoppingAddedAlert] = useState(false);

  // Integrated Timer States
  const [timerDuration, setTimerDuration] = useState<number>(recipe.cookingTime * 60); // Default: cookingTime in seconds
  const [timeLeft, setTimeLeft] = useState<number>(recipe.cookingTime * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [showTimerAlert, setShowTimerAlert] = useState<boolean>(false);
  const [selectedTimerStep, setSelectedTimerStep] = useState<number | null>(null);
  const [selectedStepText, setSelectedStepText] = useState<string>("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Parse step duration e.g. "15 min" or "5 min" to number of minutes
  const parseDurationInMinutes = (durationStr: string): number => {
    const match = durationStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 5;
  };

  const playCompletionSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const playBeep = (time: number, frequency: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, time);
        
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.5, time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      // Play a beautiful rhythmic alarm chime
      playBeep(now, 880, 0.15); // A5
      playBeep(now + 0.2, 880, 0.15);
      playBeep(now + 0.4, 1174.66, 0.35); // D6 (higher note)
      
      playBeep(now + 0.8, 880, 0.15);
      playBeep(now + 1.0, 880, 0.15);
      playBeep(now + 1.2, 1174.66, 0.35);
    } catch (e) {
      console.warn("Could not play completion sound via Web Audio API:", e);
    }
  };

  // Timer interval effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setShowTimerAlert(true);
            if (timerRef.current) clearInterval(timerRef.current);
            if (isSoundOn) {
              playCompletionSound();
              // Repeat chime once more after 1.8 seconds for full notification experience
              setTimeout(() => {
                playCompletionSound();
              }, 1800);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isSoundOn]);

  const handleToggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(timerDuration);
    }
    setIsTimerRunning(!isTimerRunning);
    setShowTimerAlert(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerDuration);
    setShowTimerAlert(false);
  };

  const handleSelectPreset = (minutes: number) => {
    setIsTimerRunning(false);
    const secs = minutes * 60;
    setTimerDuration(secs);
    setTimeLeft(secs);
    setShowTimerAlert(false);
    setSelectedTimerStep(null);
    setSelectedStepText("");
  };

  const adjustTimer = (secondsDelta: number) => {
    setTimeLeft((prev) => {
      const newVal = Math.max(0, prev + secondsDelta);
      // Also update current base duration if it became larger
      if (newVal > timerDuration) {
        setTimerDuration(newVal);
      }
      return newVal;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStepTimer = (stepNum: number, durationStr: string, text: string) => {
    const minutes = parseDurationInMinutes(durationStr);
    setIsTimerRunning(false);
    setTimerDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setSelectedTimerStep(stepNum);
    setSelectedStepText(text);
    setShowTimerAlert(false);
    
    // Auto start the timer and smooth scroll to the timer view
    setTimeout(() => {
      setIsTimerRunning(true);
      document.getElementById("cooking-timer-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Parse and scale the ingredient quantities based on selected servings (default in RECIPES is calibrated for 4 people)
  const scaleQuantity = (quantityStr: string, baseServings: number, targetServings: number) => {
    if (!quantityStr) return "";
    const ratio = targetServings / baseServings;
    
    // Regular expression to find numbers (integers or fractions or decimals)
    const numRegex = /(\d+[,.]\d+|\d+\/\d+|\d+)/g;
    
    return quantityStr.replace(numRegex, (match) => {
      if (match.includes("/")) {
        const [num, den] = match.split("/").map(Number);
        const decimal = num / den;
        const scaled = decimal * ratio;
        return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
      }
      const val = Number(match.replace(",", "."));
      if (isNaN(val)) return match;
      const scaled = val * ratio;
      // Round to clean decimal points
      const rounded = Math.round(scaled * 100) / 100;
      return rounded.toString();
    });
  };

  const handleToggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleToggleStep = (stepNum: number) => {
    setCheckedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const handleAddToShopping = () => {
    const listItems = recipe.ingredients.map((ing) => ({
      recipeId: recipe.id,
      recipeName: recipe.name,
      name: ing.name,
      quantity: scaleQuantity(ing.quantity, 4, servings),
    }));
    onAddToShoppingList(listItems);
    setShoppingAddedAlert(true);
    setTimeout(() => setShoppingAddedAlert(false), 3000);
  };

  const shareText = `Découvre la recette magique de "${recipe.name}" (${recipe.country}) de Ivoir'Cuisine Pro ! Jour ${recipe.id} du challenge 30 Jours de saveurs.`;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Facile":
        return "bg-emerald-50 text-brand-green border-emerald-200";
      case "Moyenne":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Difficile":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const galleryLabels = [
    "Plat terminé",
    "Préparation culinaire",
    "Ingrédients frais",
    "Présentation finale"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto px-4 py-8"
      id={`recipe-detail-${recipe.id}`}
    >
      {/* Top action bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-brand-green hover:text-brand-green-light font-medium transition-colors"
          id="btn-back-to-home"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Challenge 30 Jours</span>
        </button>

        <div className="flex space-x-2">
          {/* Complete challenge check button */}
          <button
            onClick={onToggleComplete}
            className={`p-2.5 rounded-full border transition-all ${
              isCompleted
                ? "bg-brand-green text-white border-brand-green shadow-sm"
                : "bg-white text-gray-400 border-gray-200 hover:text-brand-green hover:bg-emerald-50"
            }`}
            title={isCompleted ? "Marquer comme non réalisé" : "Marquer comme réalisé !"}
            id="btn-toggle-completed"
          >
            <CheckCircle className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={onToggleFavorite}
            className={`p-2.5 rounded-full border transition-all ${
              isFavorite
                ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                : "bg-white text-gray-400 border-gray-200 hover:text-brand-orange hover:bg-orange-50"
            }`}
            title="Ajouter aux favoris"
            id="btn-toggle-favorite"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          {/* Share button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2.5 rounded-full bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Partager la recette"
            id="btn-share-recipe"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Recipe Card Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl mb-8">
        {/* Main 8K realistic image with overlay */}
        <div className="relative h-96 w-full">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            id="recipe-main-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <span className="bg-brand-orange text-white px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider">
              Jour {recipe.id}
            </span>
            <span className="bg-brand-green text-white px-3 py-1 rounded-full text-xs font-semibold">
              {recipe.country}
            </span>
          </div>

          {/* Title and Country */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-brand-orange font-mono text-xs uppercase tracking-widest font-semibold mb-1">
              Recette Traditionnelle
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {recipe.name}
            </h1>
          </div>
        </div>

        {/* Nutritional & Cooking Times Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 bg-brand-cream/40">
          <div className="p-4 text-center border-r border-b md:border-b-0 border-gray-100">
            <Clock className="w-5 h-5 text-brand-green mx-auto mb-1" />
            <span className="block text-xs text-gray-500 font-medium">Préparation</span>
            <span className="font-mono text-sm font-semibold text-brand-dark">{recipe.preparationTime} min</span>
          </div>
          <div className="p-4 text-center border-r border-b md:border-b-0 border-gray-100">
            <Flame className="w-5 h-5 text-brand-orange mx-auto mb-1" />
            <span className="block text-xs text-gray-500 font-medium">Cuisson</span>
            <span className="font-mono text-sm font-semibold text-brand-dark">{recipe.cookingTime} min</span>
          </div>
          <div className="p-4 text-center border-r border-gray-100">
            <Clock className="w-5 h-5 text-brand-orange mx-auto mb-1" />
            <span className="block text-xs text-gray-500 font-medium">Temps Total</span>
            <span className="font-mono text-sm font-semibold text-brand-dark">{recipe.preparationTime + recipe.cookingTime} min</span>
          </div>
          <div className="p-4 text-center">
            <Award className="w-5 h-5 text-brand-green mx-auto mb-1" />
            <span className="block text-xs text-gray-500 font-medium">Difficulté</span>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(recipe.difficulty)} mt-0.5`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Dynamic Servings Controls */}
        <div className="p-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-brand-green" />
            <div>
              <p className="text-sm font-semibold text-brand-dark">Ajuster les portions</p>
              <p className="text-xs text-gray-400">Les quantités d'ingrédients se recalculent automatiquement</p>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => setServings(num)}
                className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${
                  servings === num
                    ? "bg-brand-orange text-white shadow-sm"
                    : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                }`}
                id={`servings-select-${num}`}
              >
                {num} pers.
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: Ingredients & Preparation */}
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {/* Ingredients Column (2/5 size) */}
          <div className="lg:col-span-2 p-6 bg-brand-cream/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-bold text-brand-dark flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-brand-orange rounded-full"></span>
                <span>Ingrédients</span>
              </h2>
              <span className="font-mono text-xs text-brand-green bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                {recipe.ingredients.length} articles
              </span>
            </div>

            {/* Shopping trigger */}
            <button
              onClick={handleAddToShopping}
              className="w-full mb-6 py-2.5 px-4 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow flex items-center justify-center space-x-2 transition-all cursor-pointer"
              id="btn-add-all-shopping"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ajouter à la liste de courses</span>
            </button>

            {shoppingAddedAlert && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-brand-green-light font-medium flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Ingrédients ajoutés avec succès !</span>
              </motion.div>
            )}

            {/* List */}
            <div className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const scaledQty = scaleQuantity(ing.quantity, 4, servings);
                const isChecked = !!checkedIngredients[ing.name];
                
                // Check if this ingredient has an available substitution
                const subs = INGREDIENT_SUBSTITUTIONS[recipe.id] || [];
                const hasSub = subs.some(s => 
                  s.originalIngredient.toLowerCase().includes(ing.name.toLowerCase()) || 
                  ing.name.toLowerCase().includes(s.originalIngredient.toLowerCase())
                );

                return (
                  <label
                    key={idx}
                    className={`flex items-start space-x-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-emerald-50/40 border-emerald-100 text-gray-400"
                        : "bg-white border-gray-100 text-gray-700 hover:border-gray-200"
                    }`}
                    id={`ing-item-${idx}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleIngredient(ing.name)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    <div className="flex-1 text-sm">
                      <div className="flex justify-between items-start">
                        <span className={isChecked ? "line-through text-gray-400" : "font-medium text-brand-dark"}>
                          {ing.name}
                        </span>
                        <span className="font-mono text-xs font-semibold text-brand-orange bg-orange-50/50 px-2 py-0.5 rounded shrink-0 ml-2">
                          {scaledQty}
                        </span>
                      </div>
                      
                      {hasSub && !isChecked && (
                        <div className="mt-1.5">
                          <span 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              document.getElementById("ingredient-substitutions-panel")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center text-[10px] text-brand-green bg-emerald-50/60 hover:bg-emerald-50 border border-brand-green/25 px-2 py-0.5 rounded-full font-bold cursor-pointer select-none transition-all hover:scale-105"
                          >
                            <Sparkles className="w-2.5 h-2.5 mr-1 text-brand-orange animate-pulse" />
                            Alternative disponible
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Substitution d'Ingrédients */}
            {(() => {
              const subs = INGREDIENT_SUBSTITUTIONS[recipe.id];
              if (!subs || subs.length === 0) return null;
              return (
                <div className="mt-8 pt-6 border-t border-gray-150" id="ingredient-substitutions-panel">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
                    <h3 className="font-serif text-lg font-bold text-brand-dark">
                      Alternatives & Substitutions
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Un ingrédient traditionnel est difficile à trouver ? Remplacez-le facilement tout en préservant l'authenticité des saveurs :
                  </p>
                  <div className="space-y-4">
                    {subs.map((sub, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="bg-white rounded-2xl p-4 border border-gray-150 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col space-y-1 mb-2.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ingrédient d'origine</span>
                          <span className="text-sm font-bold text-gray-700 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover:scale-125 transition-transform"></span>
                            <span>{sub.originalIngredient}</span>
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1 mb-3 bg-brand-green/5 border-l-4 border-brand-green p-3 rounded-r-xl">
                          <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider flex items-center space-x-1">
                            <ArrowLeftRight className="w-3 h-3" />
                            <span>Remplacement recommandé</span>
                          </span>
                          <span className="text-sm font-bold text-brand-dark">
                            {sub.replacement}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 font-light">
                          {sub.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Preparation Column (3/5 size) */}
          <div className="lg:col-span-3 p-6 bg-white">
            <h2 className="font-serif text-xl font-bold text-brand-dark mb-5 flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
              <span>Préparation Étape par Étape</span>
            </h2>

            {/* Integrated Cooking Timer Card */}
            <div 
              id="cooking-timer-card"
              className="mb-6 p-5 rounded-3xl bg-brand-dark text-white shadow-xl relative overflow-hidden border border-gray-800"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex justify-between items-center mb-4 relative z-10 border-b border-gray-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Timer className={`w-5 h-5 ${isTimerRunning ? "text-brand-orange animate-spin" : "text-brand-green"}`} />
                  <h3 className="font-serif text-base font-bold text-brand-cream">
                    Minuteur de Cuisson
                  </h3>
                </div>
                <button
                  onClick={() => setIsSoundOn(!isSoundOn)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isSoundOn ? "bg-brand-orange/20 text-brand-orange hover:bg-brand-orange/30" : "bg-gray-800 text-gray-500 hover:bg-gray-700"
                  }`}
                  title={isSoundOn ? "Désactiver le son" : "Activer le son"}
                >
                  {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Alarm Alert */}
              <AnimatePresence>
                {showTimerAlert && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="mb-4 p-4 bg-brand-orange rounded-2xl flex items-center justify-between shadow-lg relative z-10"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="w-6 h-6 text-white animate-bounce shrink-0" />
                      <div>
                        <p className="font-bold text-sm text-white">Le temps est écoulé ! ⏰</p>
                        <p className="text-[11px] text-orange-100 font-light leading-snug">
                          {selectedTimerStep ? `L'Étape ${selectedTimerStep} est terminée !` : "Votre préparation de cuisson est prête !"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTimerAlert(false)}
                      className="px-3 py-1.5 bg-white text-brand-orange hover:bg-orange-50 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 ml-2"
                    >
                      OK
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Display & Adjustments Layout */}
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 relative z-10 mb-5">
                {/* Time Display */}
                <div className="text-center md:text-left">
                  {selectedTimerStep && (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-brand-orange bg-brand-orange/15 px-2.5 py-0.5 rounded-full mb-1">
                      Étape {selectedTimerStep} active
                    </span>
                  )}
                  <div className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-white mb-1">
                    {formatTime(timeLeft)}
                  </div>
                  {selectedStepText ? (
                    <p className="text-[11px] text-gray-400 font-light italic line-clamp-1 max-w-[240px]">
                      "{selectedStepText}"
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-400 font-light">
                      Ajustez le temps ou choisissez un préréglage
                    </p>
                  )}
                </div>

                {/* Micro Adjustments (-/+ Buttons) */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => adjustTimer(-300)} 
                    className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-750 text-xs font-mono font-bold rounded-xl text-gray-300 transition-colors cursor-pointer"
                    title="-5 minutes"
                  >
                    -5m
                  </button>
                  <button 
                    onClick={() => adjustTimer(-60)} 
                    className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-750 text-xs font-mono font-bold rounded-xl text-gray-300 transition-colors cursor-pointer"
                    title="-1 minute"
                  >
                    -1m
                  </button>
                  <button 
                    onClick={() => adjustTimer(60)} 
                    className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-750 text-xs font-mono font-bold rounded-xl text-gray-300 transition-colors cursor-pointer"
                    title="+1 minute"
                  >
                    +1m
                  </button>
                  <button 
                    onClick={() => adjustTimer(300)} 
                    className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-750 text-xs font-mono font-bold rounded-xl text-gray-300 transition-colors cursor-pointer"
                    title="+5 minutes"
                  >
                    +5m
                  </button>
                </div>

                {/* Primary Play/Pause and Reset Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleToggleTimer}
                    className={`p-3.5 rounded-2xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                      isTimerRunning 
                        ? "bg-amber-500 hover:bg-amber-600 text-white" 
                        : "bg-brand-green hover:bg-brand-green/90 text-white"
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <button
                    onClick={handleResetTimer}
                    className="p-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                    title="Réinitialiser"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mb-5 relative z-10">
                <motion.div 
                  className="bg-brand-orange h-full rounded-full"
                  animate={{ width: `${timerDuration > 0 ? (timeLeft / timerDuration) * 100 : 0}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>

              {/* Presets Grid */}
              <div className="relative z-10">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">Préréglages de cuisson</span>
                <div className="flex flex-wrap gap-2">
                  {[3, 5, 10, 15].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleSelectPreset(mins)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        timerDuration === mins * 60 && !selectedTimerStep
                          ? "bg-brand-orange text-white border border-brand-orange shadow-sm"
                          : "bg-gray-800/60 text-gray-300 border border-transparent hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                  <button
                    onClick={() => handleSelectPreset(recipe.cookingTime)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                      timerDuration === recipe.cookingTime * 60 && !selectedTimerStep
                        ? "bg-brand-green text-white border border-brand-green shadow-sm"
                        : "bg-gray-800/60 text-gray-300 border border-transparent hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Flame className="w-3 h-3 text-brand-orange" />
                    <span>Cuisson Recette ({recipe.cookingTime} min)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {recipe.preparation.map((prep) => {
                const isStepChecked = !!checkedSteps[prep.step];
                return (
                  <div
                    key={prep.step}
                    onClick={() => handleToggleStep(prep.step)}
                    className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isStepChecked
                        ? "bg-gray-50 border-gray-100 text-gray-400 opacity-60"
                        : "bg-brand-cream/10 border-gray-100 hover:border-brand-green/30 text-gray-700"
                    }`}
                    id={`prep-step-${prep.step}`}
                  >
                    {/* Step number badge / check */}
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-serif text-sm font-bold border transition-all ${
                      isStepChecked
                        ? "bg-brand-green text-white border-brand-green"
                        : "bg-white text-brand-green border-brand-green/20"
                    }`}>
                      {isStepChecked ? <CheckCircle className="w-4 h-4" /> : prep.step}
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className={`text-sm leading-relaxed ${isStepChecked ? "line-through font-normal" : "font-medium"}`}>
                        {prep.text}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="flex items-center space-x-1.5 text-xs text-brand-orange font-mono font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Durée estimée : {prep.duration}</span>
                        </div>

                        {!isStepChecked && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStartStepTimer(prep.step, prep.duration, prep.text);
                            }}
                            className="inline-flex items-center text-[10px] text-white bg-brand-green hover:bg-brand-green/90 px-2.5 py-1 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm border border-transparent"
                          >
                            <Timer className="w-3 h-3 mr-1" />
                            Lancer le minuteur
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chef Tips (Astuces, Variantes, Erreurs à éviter) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 border border-gray-100 shadow-xl">
        <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
          <Award className="w-6 h-6 text-brand-green" />
          <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
            Conseils Spéciaux du Chef
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipe.chefTips.map((tip, idx) => (
            <div key={idx} className="bg-brand-green/5 border-l-4 border-brand-green p-5 rounded-r-2xl hover:shadow-md transition-all">
              <h3 className="font-serif text-base font-bold text-brand-green mb-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                <span>{tip.title}</span>
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-light">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Presentation section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl mb-8">
        <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center space-x-3">
          <Info className="w-6 h-6 text-brand-green" />
          <span>Dressage & Présentation Premium</span>
        </h2>
        <div className="p-4 bg-brand-cream rounded-2xl border border-brand-green/10 flex flex-col md:flex-row items-start gap-4">
          <div className="bg-white p-3 rounded-xl border border-gray-150 shrink-0 mx-auto md:mx-0">
            <div className="font-serif text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2 text-center">Garnitures requises</div>
            <div className="flex flex-wrap gap-1.5 max-w-[180px] justify-center">
              {["persil", "tomates", "citron", "salade", "piment", "oignons"].map((g) => (
                <span key={g} className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full text-[10px] text-brand-dark font-semibold font-mono capitalize">
                  {g}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed italic md:pt-1">
            "{recipe.presentation}"
          </p>
        </div>
      </div>

      {/* Nutritional values */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl mb-8">
        <div className="bg-brand-orange/5 border-l-4 border-brand-orange p-5 rounded-r-2xl mb-6">
          <h2 className="font-serif text-xl font-bold text-brand-orange flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-brand-orange" />
            <span>Valeurs Nutritionnelles Moyennes</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Calibré pour une portion individuelle équilibrée du challenge.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: "Calories", value: `${recipe.nutrition.calories} kcal`, color: "bg-orange-50 text-brand-orange" },
            { label: "Protéines", value: recipe.nutrition.protein, color: "bg-emerald-50 text-brand-green" },
            { label: "Lipides", value: recipe.nutrition.fat, color: "bg-amber-50 text-amber-700" },
            { label: "Glucides", value: recipe.nutrition.carbs, color: "bg-blue-50 text-blue-700" },
            { label: "Fibres", value: recipe.nutrition.fiber, color: "bg-stone-50 text-stone-700" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-all bg-white">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{item.label}</span>
              <span className={`inline-block px-3 py-1 rounded-xl text-xs font-mono font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
          {/* Vitamins list */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1 p-4 rounded-2xl border border-gray-100 text-center bg-brand-cream/30">
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Vitamines</span>
            <div className="flex flex-wrap justify-center gap-1">
              {recipe.nutrition.vitamins.map((vit) => (
                <span key={vit} className="bg-white border border-gray-150 text-[10px] px-1.5 py-0.5 rounded text-brand-green font-semibold">
                  {vit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 8K Ultra Photorealistic Gallery */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark">Galerie Haute Définition 8K</h2>
            <p className="text-xs text-gray-400">Cliquez sur une image pour l'agrandir en ultra-résolution</p>
          </div>
          <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-xs font-semibold font-mono">
            4 Photos HD
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recipe.gallery.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => setActiveGalleryIndex(index)}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all border border-gray-100"
            >
              <img
                src={imgUrl}
                alt={`${recipe.name} - ${galleryLabels[index]}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
                <span className="text-[10px] font-mono tracking-wide font-medium">
                  {galleryLabels[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Gallery Zoom Overlay */}
      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left and Right navigation */}
            <button
              onClick={() => setActiveGalleryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : 3))}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setActiveGalleryIndex((prev) => (prev !== null && prev < 3 ? prev + 1 : 0))}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Big image container */}
            <div className="max-w-4xl max-h-[75vh] w-full flex justify-center items-center">
              <img
                src={recipe.gallery[activeGalleryIndex]}
                alt={galleryLabels[activeGalleryIndex]}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Labels overlay info */}
            <div className="mt-6 text-center text-white space-y-1">
              <span className="font-serif text-xl font-bold tracking-wide">
                {recipe.name}
              </span>
              <p className="font-mono text-brand-orange text-xs uppercase tracking-widest">
                {galleryLabels[activeGalleryIndex]} — Qualité 8K Ultra Photoréaliste
              </p>
              <p className="text-xs text-gray-400 font-light max-w-lg mx-auto">
                Rendu culinaire haut de gamme : vaisselle africaine élégante, éclairage naturel tamisé, légumes frais du terroir et profondeur de champ cinématographique.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-2xl relative"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl font-bold text-brand-dark mb-1">
                Partager cette Recette
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Inspirez vos proches en partageant cette merveille africaine
              </p>

              <div className="space-y-2.5">
                {[
                  { name: "WhatsApp", color: "bg-emerald-600 hover:bg-emerald-700", url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}` },
                  { name: "Facebook", color: "bg-blue-600 hover:bg-blue-700", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}` },
                  { name: "Messenger", color: "bg-sky-500 hover:bg-sky-600", url: `fb-messenger://share/?link=${encodeURIComponent(window.location.href)}` },
                  { name: "Telegram", color: "bg-cyan-500 hover:bg-cyan-600", url: `https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}` },
                  { name: "Email", color: "bg-gray-700 hover:bg-gray-800", url: `mailto:?subject=${encodeURIComponent(`Recette Ivoir'Cuisine Pro : ${recipe.name}`)}&body=${encodeURIComponent(shareText)}` }
                ].map((plat) => (
                  <button
                    key={plat.name}
                    onClick={() => {
                      onShare(plat.name);
                      window.open(plat.url, "_blank", "noopener,noreferrer");
                      setShowShareModal(false);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-white font-medium text-sm transition-all flex items-center justify-between ${plat.color}`}
                  >
                    <span>Partager sur {plat.name}</span>
                    <Share2 className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
