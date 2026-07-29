import React, { useState } from "react";
import { UserProfile, Recipe } from "../types";
import { Award, Heart, Check, Settings, ShieldAlert, Sparkles, User, Bell, Wifi, ChevronRight, Save } from "lucide-react";
import { motion } from "motion/react";

interface ProfileViewProps {
  profile: UserProfile;
  recipes: Recipe[];
  onUpdateProfile: (name: string, avatar: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  isLocked?: boolean;
}

export default function ProfileView({
  profile,
  recipes,
  onUpdateProfile,
  onSelectRecipe,
  isLocked = false,
}: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  
  // Real LocalStorage status switches
  const [offlineEnabled, setOfflineEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const avatarsList = [
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80", // Male Chef
    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=150&q=80", // Female Chef
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80", // Young female
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", // Young male
  ];

  const handleSave = () => {
    onUpdateProfile(editedName, selectedAvatar);
    setIsEditing(false);
  };

  const favoriteRecipes = recipes.filter((r) => profile.favorites.includes(r.id));
  const completedCount = profile.completedDays.length;

  // Badge unlock calculation
  const getBadge = () => {
    if (completedCount >= 30) return { title: "Légende Culinaire d'Afrique", desc: "A cuisiné les 30 recettes sans faute !", icon: "👑" };
    if (completedCount >= 15) return { title: "Grand Chef Ivoirien", desc: "A complété plus de la moitié du programme.", icon: "🧑‍🍳" };
    if (completedCount >= 5) return { title: "Cordon Bleu du Terroir", desc: "A réalisé au moins 5 plats traditionnels.", icon: "⭐" };
    if (completedCount >= 1) return { title: "Apprenti Marmiton", desc: "A débuté le challenge de 30 jours.", icon: "🌱" };
    return { title: "Cuisinier Curieux", desc: "Prêt à commencer l'aventure culinaire.", icon: "🍳" };
  };

  const currentBadge = getBadge();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="profile-view-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar, Profile info and Edit */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-brand-orange shadow-md"
              referrerPolicy="no-referrer"
              id="profile-avatar-display"
            />
            <div className="absolute -bottom-2 -right-2 bg-brand-green text-white p-1.5 rounded-full text-xs font-bold shadow">
              {currentBadge.icon}
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-brand-dark" id="profile-name-display">
                {profile.name}
              </h3>
              <p className="text-xs text-brand-orange font-mono font-bold uppercase tracking-wider">
                {currentBadge.title}
              </p>
              <p className="text-[11px] text-gray-400 max-w-[200px]">
                "{currentBadge.desc}"
              </p>
              {isLocked ? (
                <div className="mt-4 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border border-gray-100 cursor-not-allowed select-none">
                  <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                  <span>Profil verrouillé par l'admin</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  id="btn-edit-profile"
                >
                  Modifier le profil
                </button>
              )}
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Name Edit Input */}
              <div>
                <label className="block text-left text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full p-2 border border-gray-250 rounded-lg text-sm text-brand-dark font-medium focus:ring-brand-orange focus:border-brand-orange"
                  id="input-edit-profile-name"
                />
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-left text-[10px] font-bold text-gray-400 uppercase mb-2">
                  Choisir un Avatar / Chef Badge
                </label>
                <div className="flex justify-center space-x-2">
                  {avatarsList.map((av, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                        selectedAvatar === av ? "border-brand-orange scale-110 shadow" : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={av} alt="Avatar option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Save actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-1.5 bg-brand-orange text-white rounded-lg text-xs font-semibold hover:bg-brand-orange-dark shadow-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  id="btn-save-profile"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          )}

          {/* Cooking Statistics summary metrics */}
          <div className="w-full mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="p-3 bg-brand-cream/60 rounded-xl text-center border border-gray-50">
              <span className="block text-lg font-mono font-bold text-brand-green">{completedCount}</span>
              <span className="text-[10px] text-gray-400 font-medium">Plats cuisinés</span>
            </div>
            <div className="p-3 bg-brand-cream/60 rounded-xl text-center border border-gray-50">
              <span className="block text-lg font-mono font-bold text-brand-orange">{profile.favorites.length}</span>
              <span className="text-[10px] text-gray-400 font-medium">Favoris enregistrés</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Preferences and favorites */}
        <div className="md:col-span-2 space-y-8">
          
          {/* User Preferences switches (Simulated Local settings) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-5 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-brand-orange" />
              <span>Paramètres de l'application</span>
            </h3>

            {isLocked && (
              <div className="mb-5 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="font-bold mb-0.5">Mode Sécurisé Activé</p>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Les configurations globales de cette session ont été pré-configurées et verrouillées par l'administrateur de l'application.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Offline Support Switch */}
              <div className="flex items-center justify-between p-3.5 bg-brand-cream/40 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-start space-x-3">
                  <Wifi className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-brand-dark">Mode hors connexion</h4>
                    <p className="text-xs text-gray-400">Les fiches et étapes restent accessibles sans réseau internet</p>
                  </div>
                </div>
                <button
                  disabled={isLocked}
                  onClick={() => !isLocked && setOfflineEnabled(!offlineEnabled)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    isLocked 
                      ? "bg-gray-100 cursor-not-allowed opacity-60" 
                      : (offlineEnabled ? "bg-brand-green cursor-pointer" : "bg-gray-200 cursor-pointer")
                  }`}
                  id="toggle-offline-mode"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      offlineEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Morning reminders Switch */}
              <div className="flex items-center justify-between p-3.5 bg-brand-cream/40 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-brand-dark">Notification quotidienne</h4>
                    <p className="text-xs text-gray-400">Recevoir un rappel le matin : "Le repas du jour est prêt !"</p>
                  </div>
                </div>
                <button
                  disabled={isLocked}
                  onClick={() => !isLocked && setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    isLocked 
                      ? "bg-gray-100 cursor-not-allowed opacity-60" 
                      : (notificationsEnabled ? "bg-brand-orange cursor-pointer" : "bg-gray-200 cursor-pointer")
                  }`}
                  id="toggle-daily-notifications"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      notificationsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Favorites shortcut carousel */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span>Mes Plats Favoris ({favoriteRecipes.length})</span>
            </h3>

            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe)}
                    className="flex items-center space-x-3 p-3 rounded-2xl border border-gray-50 hover:border-brand-orange/30 bg-brand-cream/10 cursor-pointer transition-all group"
                    id={`fav-shortcut-${recipe.id}`}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-brand-dark truncate group-hover:text-brand-orange transition-colors">
                        {recipe.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Jour {recipe.id} — {recipe.country}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-brand-cream/30 border border-dashed border-gray-200 rounded-2xl p-4">
                <Heart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Vous n'avez pas encore de favoris.</p>
                <p className="text-[10px] text-gray-400">Cliquez sur le cœur d'une recette pour l'ajouter ici.</p>
              </div>
            )}
          </div>

          {/* Cooking history/log */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 flex items-center space-x-2">
              <Check className="w-5 h-5 text-brand-green" />
              <span>Historique d'activité</span>
            </h3>

            {profile.history.length > 0 ? (
              <div className="space-y-3.5">
                {profile.history.map((log, idx) => {
                  const r = recipes.find((recipe) => recipe.id === log.recipeId);
                  if (!r) return null;
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs p-3.5 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="font-serif text-brand-green font-bold text-sm">#{r.id}</span>
                        <div>
                          <p className="font-semibold text-brand-dark hover:text-brand-orange cursor-pointer" onClick={() => onSelectRecipe(r)}>
                            {r.name}
                          </p>
                          <p className="text-[10px] text-gray-400">{r.country}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 font-semibold bg-white border border-gray-150 px-2.5 py-0.5 rounded-lg shadow-sm">
                        Cuisiné le {log.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-brand-cream/30 border border-dashed border-gray-200 rounded-2xl p-4">
                <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Aucun historique d'activité disponible.</p>
                <p className="text-[10px] text-gray-400">Cochez une recette comme complétée pour enregistrer votre historique.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
