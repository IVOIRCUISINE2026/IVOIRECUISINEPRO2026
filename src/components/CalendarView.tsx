import React, { useState } from "react";
import { Recipe } from "../types";
import { motion } from "motion/react";
import { Check, Calendar, Flame, Award, Filter, RefreshCw } from "lucide-react";

interface CalendarViewProps {
  recipes: Recipe[];
  completedDays: number[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export default function CalendarView({
  recipes,
  completedDays,
  onSelectRecipe,
}: CalendarViewProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const filteredRecipes = recipes.filter((recipe) => {
    const isDone = completedDays.includes(recipe.id);
    if (filter === "completed") return isDone;
    if (filter === "pending") return !isDone;
    return true; // "all"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="calendar-view-container">
      {/* Header and Program Progress Panel */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-brand-orange bg-orange-50 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Challenge Culinaire</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
            Programme de 30 Jours de Saveurs
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            Un voyage gastronomique complet de 30 jours à travers 12 pays africains. Sans aucune répétition de repas.
          </p>
        </div>

        {/* Circular or linear progress meter */}
        <div className="bg-brand-cream border border-brand-green/10 rounded-2xl p-4 flex items-center space-x-4 w-full md:w-auto shrink-0 shadow-sm">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            {/* SVG circular progress indicator */}
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-gray-200"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-brand-green"
                strokeWidth="5"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-mono text-sm font-bold text-brand-dark">
              {progressPercent}%
            </span>
          </div>
          <div>
            <div className="font-mono text-xl font-bold text-brand-dark">
              {completedCount} / 30
            </div>
            <p className="text-xs text-gray-500 font-medium">Jours cuisinés complétés</p>
            <div className="flex space-x-1 mt-1">
              {[...Array(5)].map((_, idx) => {
                const filled = completedCount >= (idx + 1) * 6;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-1.5 rounded-full ${filled ? "bg-brand-orange" : "bg-gray-200"}`}
                    title={`Étape ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
          <Filter className="w-4 h-4 text-brand-orange" />
          <span>Filtrer les journées :</span>
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-150">
          {[
            { id: "all", label: "Tous les 30 Jours" },
            { id: "completed", label: "Déjà cuisinés" },
            { id: "pending", label: "À réaliser" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filter === opt.id
                  ? "bg-brand-green text-white shadow-sm"
                  : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
              }`}
              id={`filter-btn-${opt.id}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" id="calendar-grid">
        {filteredRecipes.map((recipe) => {
          const isDone = completedDays.includes(recipe.id);
          return (
            <motion.div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group relative cursor-pointer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              id={`calendar-cell-${recipe.id}`}
            >
              {/* Outer Card structure */}
              <div className={`h-full rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all flex flex-col ${
                isDone ? "border-brand-green/30 bg-emerald-50/5" : "border-gray-100"
              }`}>
                {/* Thumbnail Container */}
                <div className="relative h-28 bg-gray-100 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassmorphism check overlay */}
                  {isDone && (
                    <div className="absolute inset-0 bg-brand-green/40 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-white text-brand-green p-1.5 rounded-full shadow">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    </div>
                  )}

                  {/* Day Number badge */}
                  <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                    JOUR {recipe.id}
                  </div>

                  {/* Country Flag or name bubble */}
                  <div className="absolute bottom-2 right-2 bg-brand-cream/90 text-[10px] font-semibold text-brand-dark px-2 py-0.5 rounded border border-gray-200">
                    {recipe.country}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-2">
                      {recipe.name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono font-medium mt-2 pt-2 border-t border-gray-50">
                    <span>{recipe.preparationTime + recipe.cookingTime} mins</span>
                    <span className="capitalize">{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">Aucun plat ne correspond à ce filtre.</p>
        </div>
      )}
    </div>
  );
}
