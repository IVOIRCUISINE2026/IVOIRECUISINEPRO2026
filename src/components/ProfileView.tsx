import React, { useState, useRef } from "react";
import { UserProfile, Recipe } from "../types";
import { Award, Heart, Check, Settings, ShieldAlert, Sparkles, User, Bell, Wifi, ChevronRight, Save, Camera, Upload, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface ProfileViewProps {
  profile: UserProfile;
  recipes: Recipe[];
  onUpdateProfile: (name: string, avatar: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  isLocked?: boolean;
}

// Client-side image compression and resizing utility to safely store in localStorage
const compressImage = (file: File, maxWidth = 320, maxHeight = 320, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(readerEvent.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error("Impossible de décoder l'image"));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erreur de lecture du fichier"));
    reader.readAsDataURL(file);
  });
};

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
  
  const avatarsList = [
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80", // Male Chef
    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=150&q=80", // Female Chef
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80", // Young female
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", // Young male
  ];

  // Track if current profile avatar is a custom imported photo
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    return avatarsList.includes(profile.avatar) ? null : profile.avatar;
  });
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real LocalStorage status switches
  const [offlineEnabled, setOfflineEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleStartEditing = () => {
    setEditedName(profile.name);
    setSelectedAvatar(profile.avatar);
    setUploadError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedName(profile.name);
    setSelectedAvatar(profile.avatar);
    setUploadError(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    onUpdateProfile(editedName, selectedAvatar);
    setIsEditing(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    try {
      setIsProcessingImage(true);
      setUploadError(null);
      const compressedDataUrl = await compressImage(file);
      setSelectedAvatar(compressedDataUrl);
      setCustomAvatar(compressedDataUrl);
    } catch (err) {
      console.error("Erreur lors du traitement de l'image:", err);
      setUploadError("Impossible de traiter cette image. Veuillez en essayer une autre.");
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveCustomAvatar = () => {
    setCustomAvatar(null);
    setSelectedAvatar(avatarsList[0]);
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
          <div className="relative mb-4 group">
            <img
              src={isEditing ? selectedAvatar : profile.avatar}
              alt={isEditing ? editedName : profile.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-brand-orange shadow-md transition-all"
              referrerPolicy="no-referrer"
              id="profile-avatar-display"
            />
            {isEditing ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Cliquez pour importer votre photo"
                className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white opacity-85 hover:opacity-100 transition-opacity cursor-pointer border-4 border-brand-orange shadow-inner"
              >
                <Camera className="w-6 h-6 mb-0.5 text-white drop-shadow" />
                <span className="text-[10px] font-bold uppercase tracking-wider drop-shadow">Changer</span>
              </button>
            ) : (
              <div className="absolute -bottom-2 -right-2 bg-brand-green text-white p-1.5 rounded-full text-xs font-bold shadow">
                {currentBadge.icon}
              </div>
            )}
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
                  onClick={handleStartEditing}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                  id="btn-edit-profile"
                >
                  <Camera className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Modifier le profil</span>
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

              {/* Photo Upload Section */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/70 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Importer ma photo</span>
                  </label>
                  {selectedAvatar.startsWith("data:") && (
                    <span className="text-[10px] text-green-700 bg-green-100 font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Importée
                    </span>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="input-avatar-file"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessingImage}
                    className="flex-1 py-2 px-3 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    id="btn-upload-profile-photo"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isProcessingImage ? "Traitement..." : "Choisir une photo"}</span>
                  </button>

                  {customAvatar && (
                    <button
                      type="button"
                      onClick={handleRemoveCustomAvatar}
                      title="Supprimer la photo importée"
                      className="px-2.5 py-2 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {uploadError && (
                  <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <p className="text-[10px] text-gray-400 leading-snug">
                  Format JPG, PNG ou WebP. Redimensionnée et optimisée automatiquement pour votre profil.
                </p>
              </div>

              {/* Avatar Selector Presets */}
              <div>
                <label className="block text-left text-[10px] font-bold text-gray-400 uppercase mb-2">
                  Ou choisir un avatar de chef
                </label>
                <div className="flex justify-center items-center gap-2">
                  {customAvatar && (
                    <button
                      type="button"
                      onClick={() => setSelectedAvatar(customAvatar)}
                      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedAvatar === customAvatar ? "border-brand-orange scale-110 shadow-md ring-2 ring-brand-orange/40" : "border-gray-300 opacity-60 hover:opacity-100"
                      }`}
                      title="Votre photo importée"
                    >
                      <img src={customAvatar} alt="Ma photo importée" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-brand-orange text-[7px] text-white font-bold leading-tight uppercase">Moi</span>
                    </button>
                  )}

                  {avatarsList.map((av, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedAvatar === av ? "border-brand-orange scale-110 shadow-md ring-2 ring-brand-orange/40" : "border-transparent opacity-60 hover:opacity-100"
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
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-1.5 bg-brand-green text-white rounded-lg text-xs font-semibold hover:bg-green-700 shadow-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
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
