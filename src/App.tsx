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
  Flame, 
  Calendar, 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  Wifi, 
  Sparkles, 
  Bell, 
  X, 
  BookOpen,
  UtensilsCrossed,
  Info
} from "lucide-react";

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

  // Morning daily recipe popup state
  const [showDailyReminder, setShowDailyReminder] = useState(false);
  const todayRecipe = RECIPES[0]; // Day 1 as the current recipe of the morning

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
      // Trigger daily reminder banner 2.5 seconds after welcome
      setTimeout(() => {
        setShowDailyReminder(true);
      }, 2500);
    }, 3000);

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

    // Update profile completed & cooking history
    const historyEntry = newCompleted.length > completedDays.length
      ? [
          { 
            recipeId: newCompleted[newCompleted.length - 1], 
            date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) 
          },
          ...profile.history
        ].slice(0, 10) // keep last 10 entries
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
    
    // Merge or append to current shopping list
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
    setActiveTab("calendar"); // Keep tab on calendar context
  };

  if (loading) {
    return <CookingPotLoader />;
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col text-brand-dark overflow-x-hidden relative selection:bg-brand-orange selection:text-white pb-16">
      {/* Repeating diagonal line backdrop pattern (Professional Polish theme) */}
      <div className="motif-bg" />
      
      {/* Dynamic top reminder banner (Daily morning notification mockup) */}
      <AnimatePresence>
        {showDailyReminder && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-brand-orange text-white py-3 px-4 shadow-md sticky top-0 z-40 flex items-center justify-between gap-4"
            id="daily-reminder-banner"
          >
            <div className="flex items-center space-x-2.5 mx-auto">
              <Bell className="w-5 h-5 animate-bounce shrink-0" />
              <p className="text-xs md:text-sm font-semibold tracking-wide text-center">
                <span className="font-mono">Chaque matin :</span> Le repas du jour est prêt ! Découvrez le délicieux <span className="underline">{todayRecipe.name}</span> de Côte d'Ivoire.
              </p>
              <button
                onClick={() => {
                  setSelectedRecipe(todayRecipe);
                  setShowDailyReminder(false);
                }}
                className="bg-white text-brand-orange text-[11px] font-bold px-3 py-1 rounded-full hover:bg-gray-100 transition-colors shrink-0"
              >
                Cuisiner
              </button>
            </div>
            <button
              onClick={() => setShowDailyReminder(false)}
              className="text-white/80 hover:text-white shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Slogan Title */}
          <div 
            onClick={() => {
              setSelectedRecipe(null);
              setActiveTab("home");
            }} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            id="app-header-logo"
          >
            {/* Custom high-contrast brand emblem */}
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shadow-md border-b-2 border-brand-orange-dark">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-black tracking-tight text-brand-dark flex items-center">
                <span>Ivoir'</span>
                <span className="text-brand-orange">Cuisine</span>
                <span className="text-brand-green ml-0.5">Pro</span>
              </h1>
              <p className="text-[9px] text-gray-400 font-medium font-mono uppercase tracking-widest hidden sm:block">
                30 Jours de Saveurs Africaines
              </p>
            </div>
          </div>

          {/* Desktop navigation links */}
          <nav className="flex items-center space-x-1">
            {[
              { id: "home", label: "Accueil", icon: BookOpen },
              { id: "calendar", label: "30 Jours", icon: Calendar },
              { id: "search", label: "Rechercher", icon: Search },
              { id: "shopping", label: "Courses", icon: ShoppingBag, count: shoppingList.length },
              { id: "profile", label: "Mon Profil", icon: User },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id && selectedRecipe === null;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedRecipe(null);
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer relative ${
                    isActive
                      ? "bg-orange-50 text-brand-orange border border-orange-100"
                      : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                  }`}
                  id={`nav-tab-${tab.id}`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span className="hidden md:inline">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[9px] font-mono font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Offline Mode indicator badge */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Wifi className="w-3.5 h-3.5 text-brand-green" />
            <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider font-mono">Hors Connexion OK</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          </div>

        </div>
      </header>

      {/* Main app routing switch */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {selectedRecipe !== null ? (
            <motion.div
              key={`recipe-detail-wrapper-${selectedRecipe.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "home" && (
                <div id="home-welcome-section">
                  {/* Hero welcome block */}
                  <div className="relative w-full overflow-hidden bg-brand-dark text-white shadow-2xl">
                    
                    {/* Generated photorealistic culinary background cover image */}
                    <img
                      src="/src/assets/images/african_food_table_1782757547687.jpg"
                      alt="African culinary table"
                      className="absolute inset-0 w-full h-full object-cover opacity-35"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />

                    {/* Content overlays */}
                    <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 mb-6 flex items-center space-x-2"
                      >
                        <Sparkles className="w-4 h-4 text-brand-orange" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cream">
                          Application Officielle Premium
                        </span>
                      </motion.div>

                      <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                        Ivoir'Cuisine Pro
                      </h2>
                      
                      <p className="font-serif text-lg md:text-2xl text-brand-orange italic font-light max-w-xl leading-relaxed mb-8">
                        "30 jours de saveurs africaines dans votre cuisine."
                      </p>

                      <div className="flex flex-wrap justify-center gap-4 max-w-lg w-full">
                        <button
                          onClick={() => setActiveTab("calendar")}
                          className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex-1 min-w-[150px]"
                          id="hero-btn-start"
                        >
                          Commencer
                        </button>
                        <button
                          onClick={() => setActiveTab("calendar")}
                          className="px-8 py-3.5 bg-white text-brand-dark hover:bg-gray-100 font-bold text-sm rounded-2xl shadow transition-all cursor-pointer flex-1 min-w-[150px]"
                          id="hero-btn-program"
                        >
                          Les 30 jours
                        </button>
                      </div>

                      {/* Small visual items shortcut bar */}
                      <div className="grid grid-cols-3 gap-6 max-w-md w-full mt-12 pt-12 border-t border-white/10 text-center">
                        <div>
                          <span className="block font-mono text-xl font-black text-brand-orange">12</span>
                          <span className="text-[10px] text-gray-300 font-medium">Pays d'Afrique</span>
                        </div>
                        <div>
                          <span className="block font-mono text-xl font-black text-brand-orange">30</span>
                          <span className="text-[10px] text-gray-300 font-medium">Plats distincts</span>
                        </div>
                        <div>
                          <span className="block font-mono text-xl font-black text-brand-orange">100%</span>
                          <span className="text-[10px] text-gray-300 font-medium">Hors-ligne</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Curated quick shortcuts / bento showcase */}
                  <div className="max-w-6xl mx-auto px-4 py-12">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6 text-center md:text-left">
                      Parcourez votre Expérience Culinaire
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Search box bento */}
                      <div 
                        onClick={() => setActiveTab("search")}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                          <Search className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-brand-dark mb-2">Rechercher une Recette</h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">
                          Trouvez un plat selon un ingrédient précis (alloco, manioc) ou le pays d'origine de votre choix.
                        </p>
                      </div>

                      {/* Favorites shortcut bento */}
                      <div 
                        onClick={() => setActiveTab("profile")}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                          <Heart className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-brand-dark mb-2">Mes Favoris</h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">
                          Conservez vos recettes préférées pour pouvoir les cuisiner à nouveau à tout moment.
                        </p>
                      </div>

                      {/* Profile box bento */}
                      <div 
                        onClick={() => setActiveTab("profile")}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4 group-hover:bg-brand-green group-hover:text-white transition-all">
                          <User className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-brand-dark mb-2">Mon Profil & Succès</h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">
                          Suivez votre progression, découvrez vos badges de Chef et gérez les alertes matinales du challenge.
                        </p>
                      </div>

                    </div>

                    {/* Featured recipe block of the day */}
                    <div className="mt-12 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-2">
                      <div className="h-64 md:h-auto bg-gray-150 relative">
                        <img
                          src="/src/assets/images/attieke_poisson_braise_1782757564393.jpg"
                          alt="Attiéké poisson braisé"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
                          Jour 1 - Recommandé
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-brand-green uppercase tracking-wider">Spécialité Ivoirienne</span>
                          <h4 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mt-1 mb-3">
                            Attiéké Poisson Braisé
                          </h4>
                          <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                            L'incontournable classique des tablées d'Abidjan : une chair de poisson capitaine parfaitement grillée au charbon, garnie d'une salsa d'oignons rouges croustillants, le tout servi sur un attiéké (manioc) à la texture exceptionnellement légère.
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedRecipe(RECIPES[0])}
                          className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer self-start"
                        >
                          Découvrir la Recette
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "calendar" && (
                <CalendarView
                  recipes={RECIPES}
                  completedDays={completedDays}
                  onSelectRecipe={navigateToRecipe}
                />
              )}

              {activeTab === "search" && (
                <SearchView
                  recipes={RECIPES}
                  onSelectRecipe={navigateToRecipe}
                />
              )}

              {activeTab === "shopping" && (
                <ShoppingListView
                  items={shoppingList}
                  onToggleItem={handleToggleShoppingItem}
                  onDeleteItem={handleDeleteShoppingItem}
                  onClearCompleted={handleClearCompletedShopping}
                  onAddCustomItem={handleAddCustomShoppingItem}
                />
              )}

              {activeTab === "profile" && (
                <ProfileView
                  profile={profile}
                  recipes={RECIPES}
                  onUpdateProfile={handleUpdateProfile}
                  onSelectRecipe={navigateToRecipe}
                  isLocked={isLocked}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Elegant Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400 font-medium">
        <p>© 2026 Ivoir'Cuisine Pro. Tous droits réservés.</p>
        <p className="text-[10px] text-gray-400 font-sans mt-1 tracking-wider">
          Conçu et développé par Jean Cyrille Ahoret _ 00225 0103697499
        </p>
      </footer>
    </div>
  );
}
