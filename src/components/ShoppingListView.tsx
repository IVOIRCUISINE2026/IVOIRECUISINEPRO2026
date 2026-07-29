import React, { useState } from "react";
import { ShoppingItem } from "../types";
import { ShoppingBag, Check, Trash2, Plus, Calendar, RotateCcw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShoppingListViewProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearCompleted: () => void;
  onAddCustomItem: (name: string, quantity: string) => void;
}

export default function ShoppingListView({
  items,
  onToggleItem,
  onDeleteItem,
  onClearCompleted,
  onAddCustomItem,
}: ShoppingListViewProps) {
  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("");

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onAddCustomItem(customName, customQty || "1");
    setCustomName("");
    setCustomQty("");
  };

  // Group items by recipeName
  const groupedItems: Record<string, ShoppingItem[]> = {};
  items.forEach((item) => {
    const key = item.recipeName || "Ingrédients Divers";
    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }
    groupedItems[key].push(item);
  });

  const recipesInList = Object.keys(groupedItems);
  const totalItems = items.length;
  const completedItems = items.filter((i) => i.completed).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="shopping-list-view">
      {/* Header and Stats */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-brand-orange bg-orange-50 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ma Liste de Courses</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
            Panier d'Ingrédients
          </h2>
          <p className="text-xs text-gray-400">
            Achetez vos ingrédients l'esprit tranquille. Tout est regroupé par plat.
          </p>
        </div>

        {totalItems > 0 && (
          <div className="text-center md:text-right space-y-1.5">
            <div className="font-mono text-xl font-bold text-brand-dark">
              {completedItems} / {totalItems}
            </div>
            <p className="text-xs text-gray-400">Articles achetés</p>
            <button
              onClick={onClearCompleted}
              className="text-xs text-red-600 font-semibold hover:underline flex items-center justify-center md:justify-end space-x-1 cursor-pointer"
              id="btn-clear-completed-shopping"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider achetés</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Custom Item Form */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <h3 className="font-serif text-sm font-bold text-brand-dark mb-3">
          Ajouter un ingrédient ou accessoire sur mesure
        </h3>
        <form onSubmit={handleAddCustom} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Ex : Charbon de bois, huile de palme, sel..."
            className="flex-1 p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-brand-dark font-medium placeholder-gray-400"
            id="input-custom-item-name"
          />
          <input
            type="text"
            value={customQty}
            onChange={(e) => setCustomQty(e.target.value)}
            placeholder="Quantité (ex : 1 sac, 1 litre)"
            className="sm:w-48 p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-brand-dark font-medium placeholder-gray-400"
            id="input-custom-item-qty"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-light text-white rounded-xl text-sm font-semibold shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            id="btn-submit-custom-item"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </form>
      </div>

      {/* List content grouped by recipe */}
      <div className="space-y-6">
        {recipesInList.map((recipeName) => (
          <div
            key={recipeName}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            id={`shopping-group-${recipeName.replace(/\s+/g, "-")}`}
          >
            {/* Header category row */}
            <div className="bg-brand-cream px-5 py-3.5 border-b border-gray-100 flex justify-between items-center">
              <h4 className="font-serif text-sm font-bold text-brand-green flex items-center space-x-2">
                <span className="w-1.5 h-4 bg-brand-orange rounded-full"></span>
                <span>{recipeName}</span>
              </h4>
              <span className="font-mono text-[10px] font-bold text-brand-orange bg-white px-2 py-0.5 rounded border border-gray-100">
                {groupedItems[recipeName].length} article{groupedItems[recipeName].length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Group Items list */}
            <div className="divide-y divide-gray-50">
              <AnimatePresence initial={false}>
                {groupedItems[recipeName].map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                      item.completed ? "bg-emerald-50/10" : "bg-white"
                    }`}
                    id={`shopping-item-${item.id}`}
                  >
                    <label className="flex-1 flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleItem(item.id)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${
                            item.completed
                              ? "line-through text-gray-400 font-normal"
                              : "text-brand-dark"
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.quantity && (
                          <span className="inline-block ml-2 font-mono text-[11px] font-semibold text-brand-orange bg-orange-50/50 px-1.5 py-0.2 rounded">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                    </label>

                    {/* Delete single item */}
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      title="Supprimer de la liste"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {totalItems === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold text-brand-dark mb-1">Votre liste est vide</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto mb-4">
            Rendez-vous sur les fiches recettes de votre programme et cliquez sur "Ajouter à la liste de courses" pour garnir votre panier automatiquement !
          </p>
        </div>
      )}
    </div>
  );
}
