import React, { useState } from "react";
import { Recipe } from "../types";
import { Search, MapPin, Sparkles, Filter, SlidersHorizontal, Clock, Award } from "lucide-react";
import { motion } from "motion/react";

interface SearchViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export default function SearchView({ recipes, onSelectRecipe }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<number>(120); // max minutes
  const [selectedMealType, setSelectedMealType] = useState<string>("all");

  // Get list of unique countries
  const countries = ["all", ...new Set(recipes.map((r) => r.country))];

  const mealTypes = [
    { id: "all", label: "Toutes les catégories" },
    { id: "poisson", label: "Poisson & Mer" },
    { id: "viande", label: "Viandes & Grillades" },
    { id: "soupe", label: "Soupes & Ragoûts" },
    { id: "snack", label: "Beignets & Snacks" },
  ];

  const getMealTypeClass = (recipe: Recipe) => {
    const nameLower = recipe.name.toLowerCase();
    const ingredientsLower = recipe.ingredients.map(i => i.name.toLowerCase()).join(" ");
    
    if (nameLower.includes("beignet") || nameLower.includes("gbofloto") || nameLower.includes("ablo")) return "snack";
    if (nameLower.includes("soupe") || nameLower.includes("sauce") || nameLower.includes("ndolé") || nameLower.includes("kédjénou") || nameLower.includes("mafé") || nameLower.includes("saka") || nameLower.includes("efo") || nameLower.includes("calalou")) return "soupe";
    if (nameLower.includes("poisson") || nameLower.includes("thon") || nameLower.includes("crabe") || nameLower.includes("crevette") || nameLower.includes("sardine") || nameLower.includes("konkoé") || nameLower.includes("capitaine")) return "poisson";
    return "viande"; // default fallback for rice, kebabs, etc.
  };

  const filteredRecipes = recipes.filter((recipe) => {
    // 1. Search text (name or ingredients)
    const matchesQuery =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      recipe.country.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Country
    const matchesCountry = selectedCountry === "all" || recipe.country === selectedCountry;

    // 3. Difficulty
    const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;

    // 4. Duration
    const totalTime = recipe.preparationTime + recipe.cookingTime;
    const matchesDuration = totalTime <= selectedDuration;

    // 5. Category (Meal Type)
    const matchesMealType = selectedMealType === "all" || getMealTypeClass(recipe) === selectedMealType;

    return matchesQuery && matchesCountry && matchesDifficulty && matchesDuration && matchesMealType;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="search-view-container">
      {/* Title */}
      <div className="mb-8 text-center md:text-left space-y-2">
        <h2 className="font-serif text-3xl font-bold text-brand-dark">
          Recherche & Inspirations
        </h2>
        <p className="text-sm text-gray-400">
          Trouvez instantanément la recette parfaite selon vos ingrédients, le pays d'origine ou la difficulté.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par plat, ingrédient (ex: manioc, arachide, capitaine)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-brand-dark placeholder-gray-400 font-medium transition-all"
          id="input-search-query"
        />
      </div>

      {/* Grid of filters */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Country Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-brand-green" />
            <span>Pays d'Afrique</span>
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-medium text-brand-dark focus:ring-brand-green bg-white"
            id="select-filter-country"
          >
            <option value="all">Tous les pays ({countries.length - 1})</option>
            {countries
              .filter((c) => c !== "all")
              .map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-brand-orange" />
            <span>Difficulté</span>
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-medium text-brand-dark focus:ring-brand-orange bg-white"
            id="select-filter-difficulty"
          >
            <option value="all">Toutes difficultés</option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        {/* Duration Slider */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>Temps de préparation max</span>
            </label>
            <span className="font-mono text-xs font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded">
              {selectedDuration === 120 ? "Pas de limite" : `${selectedDuration} minutes`}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="120"
            step="10"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
            className="w-full accent-brand-orange bg-gray-150 h-2 rounded-lg cursor-pointer"
            id="slider-filter-duration"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
            <span>20 min</span>
            <span>60 min</span>
            <span>120 min+</span>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {mealTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedMealType(type.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedMealType === type.id
                ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-brand-dark"
            }`}
            id={`category-pill-${type.id}`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-semibold text-brand-dark">
          {filteredRecipes.length} recette{filteredRecipes.length > 1 ? "s" : ""} trouvée{filteredRecipes.length > 1 ? "s" : ""}
        </div>
        {(searchQuery || selectedCountry !== "all" || selectedDifficulty !== "all" || selectedDuration !== 120 || selectedMealType !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCountry("all");
              setSelectedDifficulty("all");
              setSelectedDuration(120);
              setSelectedMealType("all");
            }}
            className="text-xs text-brand-green font-bold hover:underline flex items-center space-x-1"
            id="btn-clear-filters"
          >
            <span>Réinitialiser les filtres</span>
          </button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const totalTime = recipe.preparationTime + recipe.cookingTime;
          return (
            <motion.div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between transition-all"
              whileHover={{ y: -4 }}
              id={`search-item-${recipe.id}`}
            >
              <div>
                {/* Photo */}
                <div className="relative h-48 bg-gray-150 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-brand-orange text-white px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    JOUR {recipe.id}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-gray-100">
                    {recipe.country}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-1 mb-2">
                    {recipe.name}
                  </h3>
                  
                  {/* Ingredients sneak-peek */}
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4 font-light">
                    Ingrédients : {recipe.ingredients.map(i => i.name).join(", ")}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500 font-mono font-medium">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-brand-green" />
                  <span>{totalTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold text-brand-dark mb-1">Aucune recette trouvée</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">
            Essayez d'ajuster vos filtres, de chercher d'autres mots-clés ou d'élargir le temps de préparation.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCountry("all");
              setSelectedDifficulty("all");
              setSelectedDuration(120);
              setSelectedMealType("all");
            }}
            className="px-6 py-2.5 bg-brand-orange text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Effacer tous les filtres
          </button>
        </div>
      )}
    </div>
  );
}
