import React, { useState, useEffect } from "react";
import { RECIPES } from "./recipes";
import { Recipe, UserProfile, ShoppingItem } from "./types";
import CookingPotLoader from "./components/CookingPotLoader";
import RecipeDetail from "./components/RecipeDetail";
import CalendarView from "./components/CalendarView";
import SearchView from "./components/SearchView";
import ShoppingListView from "./components/ShoppingListView";
import ProfileView from "./components/ProfileView";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Search, 
  User, 
  Heart, 
  Sparkles, 
  BookOpen,
  UtensilsCrossed,
  ArrowRight,
  ChefHat,
  Home,
  Leaf
} from "lucide-react";

// Faithful SVG Icon for Africa continent outline matching reference image
function AfricaOutlineIcon({ className = "w-5 h-5 text-[#FF5A00]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3.5c2-1 4.5-.5 6 .5 1.8 1.2 2.5 3 2 5-.4 1.5-1.5 2.5-2 4-.6 1.8.2 3.5-.5 5-1 2-3 3-4.5 3-1.5 0-2.5-1-3-2.5C4 16 3 13 4 10.5 4.8 8.5 5.5 5 7 3.5z" />
    </svg>
  );
}

// Faithful SVG Icon for Cloche / Covered Dish matching reference image
function ClocheCoverIcon({ className = "w-5 h-5 text-[#FF5A00]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a7.5 7.5 0 0 0-7.5 7.5V13h15v-1.5A7.5 7.5 0 0 0 12 4z" />
      <path d="M3.5 16h17" />
      <path d="M12 2v2" />
    </svg>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"home" | "calendar" | "search" | "shopping" | "profile">("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // States synchronized with LocalStorage
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([1]); // Default Day 1 as completed for visual demo
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Chef Amadou",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80",
    completedDays: [1],
    favorites: [],
    history: [{ recipeId: 1, date: "29 Juin 2026" }],
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParts = window.location.hash.split("?");
      const hashParams = new URLSearchParams(hashParts.length > 1 ? hashParts[1] : "");
      
      if (searchParams.get("locked") === "true" || hashParams.get("locked") === "true") {
        setIsLocked(true);
      }
    } catch (e) {
      console.error("Erreur de lecture des query params:", e);
    }

    try {
      const storedFavs = localStorage.getItem("ic_favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedCompleted = localStorage.getItem("ic_completed");
      if (storedCompleted) setCompletedDays(JSON.parse(storedCompleted));

      const storedShopping = localStorage.getItem("ic_shopping");
      if (storedShopping) setShoppingList(JSON.parse(storedShopping));

      const storedProfile = localStorage.getItem("ic_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (e) {
      console.error("Erreur de chargement LocalStorage:", e);
    }

    // Simulate cooking pot boiling loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Save to LocalStorage helpers
  const saveFavorites = (newFavs: number[]) => {
    setFavorites(newFavs);
    localStorage.setItem("ic_favorites", JSON.stringify(newFavs));
    
    const updatedProfile = { ...profile, favorites: newFavs };
    setProfile(updatedProfile);
    localStorage.setItem("ic_profile", JSON.stringify(updatedProfile));
  };

  const saveCompleted = (newCompleted: number[]) => {
    setCompletedDays(newCompleted);
    localStorage.setItem("ic_completed", JSON.stringify(newCompleted));

    const historyEntry = newCompleted.length > completedDays.length
      ? [
          { 
            recipeId: newCompleted[newCompleted.length - 1], 
            date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) 
          },
          ...profile.history
        ].slice(0, 10)
      : profile.history;

    const updatedProfile = { ...profile, completedDays: newCompleted, history: historyEntry };
    setProfile(updatedProfile);
    localStorage.setItem("ic_profile", JSON.stringify(updatedProfile));
  };

  const saveShoppingList = (newList: ShoppingItem[]) => {
    setShoppingList(newList);
    localStorage.setItem("ic_shopping", JSON.stringify(newList));
  };

  // Recipe action handlings
  const handleToggleFavorite = (id: number) => {
    const isFav = favorites.includes(id);
    const newFavs = isFav ? favorites.filter((favId) => favId !== id) : [...favorites, id];
    saveFavorites(newFavs);
  };

  const handleToggleComplete = (id: number) => {
    const isDone = completedDays.includes(id);
    const newCompleted = isDone ? completedDays.filter((dId) => dId !== id) : [...completedDays, id];
    saveCompleted(newCompleted);
  };

  const handleAddToShoppingList = (newItems: Omit<ShoppingItem, "id" | "completed">[]) => {
    const listToAdd: ShoppingItem[] = newItems.map((item) => ({
      ...item,
      id: `${item.recipeId}-${item.name}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      completed: false,
    }));
    
    const filteredCurrent = shoppingList.filter(
      (curr) => !listToAdd.some((add) => add.name.toLowerCase() === curr.name.toLowerCase() && add.recipeId === curr.recipeId)
    );
    saveShoppingList([...filteredCurrent, ...listToAdd]);
  };

  // Direct Shopping List interactions
  const handleToggleShoppingItem = (id: string) => {
    const updated = shoppingList.map((item) => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveShoppingList(updated);
  };

  const handleDeleteShoppingItem = (id: string) => {
    const filtered = shoppingList.filter((item) => item.id !== id);
    saveShoppingList(filtered);
  };

  const handleClearCompletedShopping = () => {
    const filtered = shoppingList.filter((item) => !item.completed);
    saveShoppingList(filtered);
  };

  const handleAddCustomShoppingItem = (name: string, quantity: string) => {
    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      recipeId: 0,
      recipeName: "Ingrédients Hors Challenge",
      name,
      quantity,
      completed: false,
    };
    saveShoppingList([newItem, ...shoppingList]);
  };

  // Profile update handlings
  const handleUpdateProfile = (name: string, avatar: string) => {
    const updated = { ...profile, name, avatar };
    setProfile(updated);
    localStorage.setItem("ic_profile", JSON.stringify(updated));
  };

  const navigateToRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  if (loading) {
    return <CookingPotLoader />;
  }

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col text-brand-dark overflow-x-hidden relative selection:bg-[#FF5A00] selection:text-white">
      
      {/* Main navigation header matching exact reference image */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand title */}
          <div 
            onClick={() => {
              setSelectedRecipe(null);
              setActiveTab("home");
            }} 
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            id="app-header-logo"
          >
            {/* Custom orange rounded emblem with crossed utensils */}
            <div className="w-10 h-10 rounded-2xl bg-[#FF5A00] flex items-center justify-center shadow-xs">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center">
                <span>Ivoir'</span>
                <span className="text-[#FF5A00]">Cuisine</span>
                <span className="text-[#2E7D32] ml-0.5">Pro</span>
              </h1>
            </div>
          </div>

          {/* Right Action Icons from Reference Image */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
            {/* Open book icon inside cream container */}
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab("calendar");
              }}
              title="Recettes"
              className="p-2 sm:p-2.5 rounded-2xl bg-[#FFF8ED] border border-[#FFE8CC] text-[#FF5A00] hover:bg-[#FFEDD5] transition-colors cursor-pointer"
            >
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Calendar icon */}
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab("calendar");
              }}
              title="Calendrier 30 jours"
              className="p-2 sm:p-2.5 rounded-2xl text-gray-800 hover:text-[#FF5A00] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Calendar className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Search icon */}
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab("search");
              }}
              title="Rechercher"
              className="p-2 sm:p-2.5 rounded-2xl text-gray-800 hover:text-[#FF5A00] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* User Profile icon */}
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab("profile");
              }}
              title="Mon Profil"
              className="p-2 sm:p-2.5 rounded-2xl text-gray-800 hover:text-[#FF5A00] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

        </div>
      </header>

      {/* Main app routing switch */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {selectedRecipe !== null ? (
            <motion.div
              key={`recipe-detail-wrapper-${selectedRecipe.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-cream min-h-screen"
            >
              <RecipeDetail
                recipe={selectedRecipe}
                isFavorite={favorites.includes(selectedRecipe.id)}
                isCompleted={completedDays.includes(selectedRecipe.id)}
                onToggleFavorite={() => handleToggleFavorite(selectedRecipe.id)}
                onToggleComplete={() => handleToggleComplete(selectedRecipe.id)}
                onAddToShoppingList={handleAddToShoppingList}
                onBack={() => setSelectedRecipe(null)}
                onShare={(platform) => console.log(`Shared recipe via ${platform}`)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              {/* EXACT HOMEPAGE FROM USER REFERENCE IMAGE */}
              {activeTab === "home" && (
                <div id="home-welcome-section" className="relative flex-1 min-h-[calc(100vh-125px)] flex flex-col justify-between overflow-hidden bg-stone-900 text-white select-none">
                  
                  {/* Portrait authentic African culinary background matching reference image */}
                  <img
                    src="/src/assets/images/authentic_african_banquet_table_1791149581016.jpg"
                    alt="Table culinaire africaine authentique"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle dark vignette to enhance text contrast matching reference image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85 pointer-events-none" />

                  {/* Top and Center Content from Reference Image */}
                  <div className="relative z-10 max-w-xl mx-auto px-4 pt-10 sm:pt-14 pb-4 text-center flex flex-col items-center flex-1 justify-center">
                    
                    {/* Pill Badge */}
                    <div className="bg-black/50 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 mb-6 sm:mb-8 inline-flex items-center space-x-2.5 shadow-xl">
                      <Sparkles className="w-4 h-4 text-[#FF9E2C]" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/95">
                        Application Officielle Premium
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl mb-4">
                      Ivoir’Cuisine Pro
                    </h1>

                    {/* Subtitle */}
                    <p className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl text-white drop-shadow-xl max-w-md mx-auto mb-8 sm:mb-10 leading-snug">
                      "30 jours de saveurs africaines dans votre cuisine."
                    </p>

                    {/* The 2 CTA buttons side-by-side */}
                    <div className="flex flex-row items-center justify-center gap-3.5 w-full max-w-md">
                      <button
                        onClick={() => setSelectedRecipe(RECIPES[0])}
                        className="flex-1 py-4 px-6 bg-[#FF5A00] hover:bg-[#E04F00] active:scale-95 text-white font-bold text-base sm:text-lg rounded-full shadow-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        id="hero-btn-start"
                      >
                        <span>Commencer</span>
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </button>

                      <button
                        onClick={() => setActiveTab("calendar")}
                        className="flex-1 py-4 px-6 bg-white hover:bg-gray-100 active:scale-95 text-gray-950 font-bold text-base sm:text-lg rounded-full shadow-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer border border-gray-100"
                        id="hero-btn-program"
                      >
                        <span>Les 30 jours</span>
                        <Calendar className="w-5 h-5 text-gray-900 shrink-0" />
                      </button>
                    </div>

                  </div>

                  {/* Bottom Floating Stats Bar from Reference Image */}
                  <div className="relative z-10 max-w-lg mx-auto w-full px-4 mb-6 sm:mb-8">
                    <div className="bg-black/75 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 grid grid-cols-3 text-center shadow-2xl">
                      {/* 12 Pays d'Afrique */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <span className="font-mono text-2xl md:text-3xl font-black text-[#FF5A00]">12</span>
                          <AfricaOutlineIcon className="w-5 h-5 text-[#FF5A00]" />
                        </div>
                        <span className="text-xs text-white/95 font-medium mt-1">Pays d'Afrique</span>
                      </div>

                      {/* 30 Plats distincts */}
                      <div className="flex flex-col items-center justify-center border-x border-white/20">
                        <div className="flex items-center justify-center space-x-1.5">
                          <span className="font-mono text-2xl md:text-3xl font-black text-[#FF5A00]">30</span>
                          <ClocheCoverIcon className="w-5 h-5 text-[#FF5A00]" />
                        </div>
                        <span className="text-xs text-white/95 font-medium mt-1">Plats distincts</span>
                      </div>

                      {/* 100% Hors-ligne */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <span className="font-mono text-2xl md:text-3xl font-black text-[#FF5A00]">100%</span>
                          <Leaf className="w-5 h-5 text-[#FF5A00]" />
                        </div>
                        <span className="text-xs text-white/95 font-medium mt-1">Hors-ligne</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === "calendar" && (
                <div className="bg-brand-cream min-h-screen pb-16">
                  <CalendarView
                    recipes={RECIPES}
                    completedDays={completedDays}
                    onSelectRecipe={navigateToRecipe}
                  />
                </div>
              )}

              {activeTab === "search" && (
                <div className="bg-brand-cream min-h-screen pb-16">
                  <SearchView
                    recipes={RECIPES}
                    onSelectRecipe={navigateToRecipe}
                  />
                </div>
              )}

              {activeTab === "shopping" && (
                <div className="bg-brand-cream min-h-screen pb-16">
                  <ShoppingListView
                    items={shoppingList}
                    onToggleItem={handleToggleShoppingItem}
                    onDeleteItem={handleDeleteShoppingItem}
                    onClearCompleted={handleClearCompletedShopping}
                    onAddCustomItem={handleAddCustomShoppingItem}
                  />
                </div>
              )}

              {activeTab === "profile" && (
                <div className="bg-brand-cream min-h-screen pb-16">
                  <ProfileView
                    profile={profile}
                    recipes={RECIPES}
                    onUpdateProfile={handleUpdateProfile}
                    onSelectRecipe={navigateToRecipe}
                    isLocked={isLocked}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar exactly matching Accueil / Recettes / Favoris / Profil from reference image */}
      <nav className="bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-around shadow-lg sticky bottom-0 z-40 select-none">
        {/* Accueil */}
        <button
          onClick={() => {
            setSelectedRecipe(null);
            setActiveTab("home");
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "home" && selectedRecipe === null
              ? "text-[#FF5A00]"
              : "text-gray-400 hover:text-gray-600"
          }`}
          id="nav-tab-home"
        >
          <Home className="w-5 h-5 mb-0.5 fill-current" />
          <span>Accueil</span>
        </button>

        {/* Recettes */}
        <button
          onClick={() => {
            setSelectedRecipe(null);
            setActiveTab("calendar");
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "calendar" && selectedRecipe === null
              ? "text-[#FF5A00]"
              : "text-gray-400 hover:text-gray-600"
          }`}
          id="nav-tab-recipes"
        >
          <ChefHat className="w-5 h-5 mb-0.5" />
          <span>Recettes</span>
        </button>

        {/* Favoris */}
        <button
          onClick={() => {
            setSelectedRecipe(null);
            setActiveTab("profile");
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "profile" && selectedRecipe === null
              ? "text-[#FF5A00]"
              : "text-gray-400 hover:text-gray-600"
          }`}
          id="nav-tab-favorites"
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>Favoris</span>
        </button>

        {/* Profil */}
        <button
          onClick={() => {
            setSelectedRecipe(null);
            setActiveTab("profile");
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "profile" && selectedRecipe === null
              ? "text-[#FF5A00]"
              : "text-gray-400 hover:text-gray-600"
          }`}
          id="nav-tab-profile"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profil</span>
        </button>
      </nav>

      {/* Developer signature footer */}
      <footer className="bg-white border-t border-gray-50 py-2.5 text-center text-[10px] text-gray-400 font-sans tracking-wider">
        Conçu et développé par Jean Cyrille Ahoret _ 00225 0103697499
      </footer>
    </div>
  );
}
