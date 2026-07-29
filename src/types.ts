export interface Ingredient {
  name: string;
  quantity: string;
}

export interface PrepStep {
  step: number;
  text: string;
  duration: string;
}

export interface ChefTip {
  title: string;
  text: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string; // e.g. "25g"
  fat: string;     // e.g. "12g"
  carbs: string;   // e.g. "45g"
  fiber: string;   // e.g. "6g"
  vitamins: string[]; // e.g. ["Vitamine C", "Fer", "Calcium"]
}

export interface Recipe {
  id: number; // Represents Day (1-30)
  name: string;
  country: string;
  image: string;
  preparationTime: number; // in minutes
  cookingTime: number;    // in minutes
  difficulty: "Facile" | "Moyenne" | "Difficile";
  ingredients: Ingredient[];
  preparation: PrepStep[];
  chefTips: ChefTip[];
  nutrition: NutritionInfo;
  presentation: string;
  gallery: string[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  completedDays: number[]; // Day IDs (1-30)
  favorites: number[];     // Day IDs (1-30)
  history: { recipeId: number; date: string }[];
}

export interface ShoppingItem {
  id: string;
  recipeId: number;
  recipeName: string;
  name: string;
  quantity: string;
  completed: boolean;
}
