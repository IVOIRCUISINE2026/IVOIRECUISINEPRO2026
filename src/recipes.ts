import { Recipe } from "./types";

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Attiéké Poisson Braisé",
    country: "Côte d'Ivoire",
    image: "/src/assets/images/attieke_poisson_braise_1782757564393.jpg",
    preparationTime: 25,
    cookingTime: 45,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Attiéké (couscous de manioc)", quantity: "500g" },
      { name: "Poissons capitaine ou tilapia entiers", quantity: "2" },
      { name: "Tomates fraîches", quantity: "3" },
      { name: "Oignons rouges", quantity: "2" },
      { name: "Citron jaune", quantity: "1" },
      { name: "Huile de tournesol", quantity: "15 cl" },
      { name: "Gousses d'ail", quantity: "4" },
      { name: "Gingembre frais râpé", quantity: "1 c. à soupe" },
      { name: "Moutarde de Dijon", quantity: "2 c. à soupe" },
      { name: "Cube d'assaisonnement bio", quantity: "1" },
      { name: "Sel et poivre moulu", quantity: "Selon goût" },
      { name: "Piment antillais rouge", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Écailler, vider et nettoyer soigneusement les poissons. Faire des incisions obliques sur les flancs.", duration: "10 min" },
      { step: 2, text: "Préparer la marinade en mixant l'ail, le gingembre, le sel, le poivre, la moutarde, un filet d'huile et le cube d'assaisonnement.", duration: "5 min" },
      { step: 3, text: "Badigeonner généreusement les poissons avec cette marinade, y compris à l'intérieur. Laisser reposer au frais.", duration: "15 min" },
      { step: 4, text: "Préchauffer le barbecue à charbon ou le gril. Griller les poissons de chaque côté en les badigeonnant d'huile parfumée.", duration: "25 min" },
      { step: 5, text: "Pendant la cuisson, découper les tomates et les oignons en dés pour faire la salsa d'accompagnement (le piment rouge haché fin est facultatif).", duration: "10 min" },
      { step: 6, text: "Humidifier légèrement l'attiéké et le cuire à la vapeur pendant 10 minutes. Servir le poisson chaud sur l'attiéké parsemé de salsa.", duration: "10 min" }
    ],
    chefTips: [
      { title: "Astuce Poisson", text: "Séchez bien le poisson avec du papier absorbant avant d'appliquer la marinade pour que la chair reste ferme au gril." },
      { title: "Variante Légère", text: "Vous pouvez remplacer le piment fort par un filet de vinaigre de cidre dans la salsa d'oignons." },
      { title: "Erreur à éviter", text: "Ne mouillez pas trop l'attiéké avant la cuisson à la vapeur, sinon il deviendra collant au lieu de rester bien égrainé." }
    ],
    nutrition: {
      calories: 580,
      protein: "42g",
      fat: "18g",
      carbs: "62g",
      fiber: "4g",
      vitamins: ["Vitamine B12", "Sélénium", "Fer", "Calcium"]
    },
    presentation: "Dresser l'attiéké fumant en dôme au centre d'un grand plat en bois traditionnel. Poser le poisson braisé doré à côté. Couronner le poisson avec le mélange coloré de tomates et d'oignons émincés. Ajouter des quartiers de citron jaune frais, quelques feuilles de persil frisé et une pointe de piment rouge sur le côté pour le contraste visuel.",
    gallery: [
      "/src/assets/images/attieke_poisson_braise_1782757564393.jpg",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
    ]
  },
  {
    id: 2,
    name: "Thiéboudienne (Ceebu Jën)",
    country: "Sénégal",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    preparationTime: 30,
    cookingTime: 60,
    difficulty: "Difficile",
    ingredients: [
      { name: "Riz brisé parfumé (deux fois cassé)", quantity: "600g" },
      { name: "Poisson Mérou ou Thiof", quantity: "1 kg" },
      { name: "Concentré de tomate", quantity: "150g" },
      { name: "Manioc, carotte, aubergine, chou blanc", quantity: "1 morceau de chaque" },
      { name: "Gousse d'ail, persil frais", quantity: "1 bouquet" },
      { name: "Huile d'arachide", quantity: "20 cl" },
      { name: "Piment rouge frais et piment vert", quantity: "2" },
      { name: "Oignons", quantity: "2" },
      { name: "Yet (mollusque séché) et Guédj (poisson salé séché)", quantity: "1 petit morceau de chaque" },
      { name: "Sel, poivre, bouillon cube", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Préparer le ror (farce du poisson) en pilant le persil, la moitié de l'ail, du sel, du poivre et du piment vert. Faire un trou dans la chair du poisson et y insérer cette farce.", duration: "15 min" },
      { step: 2, text: "Faire dorer le poisson dans une grande marmite avec l'huile bien chaude. Retirer le poisson et le réserver.", duration: "10 min" },
      { step: 3, text: "Dans la même huile, faire revenir les oignons émincés, le reste d'ail pilé, le yet bien lavé et le concentré de tomate délayé dans un peu d'eau.", duration: "10 min" },
      { step: 4, text: "Ajouter 1,5 litre d'eau, le guédj, le cube d'assaisonnement et tous les légumes épluchés. Laisser mijoter à couvert.", duration: "30 min" },
      { step: 5, text: "Ajouter le poisson frit pour qu'il s'imprègne de la sauce pendant 10 minutes, puis retirer délicatement le poisson et les légumes cuits en laissant le bouillon.", duration: "10 min" },
      { step: 6, text: "Laver le riz brisé, le cuire d'abord à la vapeur puis le verser dans le bouillon frémissant. Réduire le feu au minimum et laisser le riz absorber tout le jus.", duration: "20 min" }
    ],
    chefTips: [
      { title: "Le Secret du Riz", text: "Le riz brisé sénégalais doit être précuit à la vapeur (au micro-ondes ou au couscoussier) pour qu'il absorbe le bouillon sans devenir pâteux." },
      { title: "Erreur à éviter", text: "Ne pas trop remuer le riz pendant sa cuisson dans le bouillon pour ne pas casser les grains." }
    ],
    nutrition: {
      calories: 680,
      protein: "38g",
      fat: "22g",
      carbs: "80g",
      fiber: "7g",
      vitamins: ["Vitamine A", "Vitamine C", "Oméga 3", "Potassium"]
    },
    presentation: "Servir le riz rouge-orangé uniforme dans un très grand plat rond. Disposer harmonieusement le poisson Thiof farci au centre, entouré de tous les légumes fondants. Ajouter une coupelle de tamarin ou de citron vert pressé à côté.",
    gallery: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 3,
    name: "Ghanaian Jollof Rice",
    country: "Ghana",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&q=80",
    preparationTime: 20,
    cookingTime: 40,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Riz parfumé au jasmin", quantity: "500g" },
      { name: "Morceaux de poulet", quantity: "4" },
      { name: "Tomates concassées en conserve", quantity: "400g" },
      { name: "Concentré de tomate", quantity: "70g" },
      { name: "Oignons jaunes", quantity: "3" },
      { name: "Gousse d'ail et gingembre frais", quantity: "Râpés" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Bouillon de volaille", quantity: "500 ml" },
      { name: "Huile de coco ou végétale", quantity: "10 cl" },
      { name: "Épices de curry et thym séché", quantity: "1 c. à café" }
    ],
    preparation: [
      { step: 1, text: "Assaisonner le poulet avec de l'ail, du gingembre, du sel et du poivre. Faire dorer les morceaux à la poêle avec l'huile.", duration: "10 min" },
      { step: 2, text: "Retirer le poulet. Dans la même huile, faire caraméliser les oignons hachés finement.", duration: "8 min" },
      { step: 3, text: "Ajouter le concentré de tomate et faire rissoler jusqu'à ce que la couleur fonce. Verser la purée de tomates et le Scotch Bonnet mixé.", duration: "12 min" },
      { step: 4, text: "Verser le bouillon de volaille, le curry, le thym et remettre le poulet. Laisser mijoter pour obtenir une sauce onctueuse.", duration: "15 min" },
      { step: 5, text: "Laver soigneusement le riz à l'eau froide pour enlever l'amidon. Retirer le poulet de la sauce et le faire dorer au four.", duration: "5 min" },
      { step: 6, text: "Verser le riz dans la sauce tomate frémissante. Couvrir hermétiquement avec du papier cuisson sous le couvercle et cuire à feu très doux.", duration: "25 min" }
    ],
    chefTips: [
      { title: "Le Secret de la Vapeur", text: "L'étanchéité du couvercle avec du papier d'aluminium ou de cuisson est primordiale pour cuire le riz grâce à sa propre vapeur." },
      { title: "Variante", text: "Ajoutez des légumes mélangés (petits pois, carottes en cubes) en fin de cuisson pour donner de la couleur." }
    ],
    nutrition: {
      calories: 610,
      protein: "32g",
      fat: "15g",
      carbs: "85g",
      fiber: "3g",
      vitamins: ["Vitamine A", "Fer", "Magnésium"]
    },
    presentation: "Servir le riz Jollof bien orange-rougeâtre chaud avec les cuisses de poulet rôties dorées posées dessus, accompagnées de bananes plantains frites (alloco) et d'un œuf dur.",
    gallery: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"
    ]
  },
  {
    id: 4,
    name: "Mafé de Bœuf (Tiguadege Na)",
    country: "Mali",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    preparationTime: 20,
    cookingTime: 50,
    difficulty: "Facile",
    ingredients: [
      { name: "Viande de bœuf coupée en dés", quantity: "600g" },
      { name: "Pâte de cacahuète (sans sucre)", quantity: "150g" },
      { name: "Concentré de tomate", quantity: "2 c. à soupe" },
      { name: "Patates douces", quantity: "2" },
      { name: "Carottes", quantity: "2" },
      { name: "Oignons hachés", quantity: "2" },
      { name: "Gousses d'ail", quantity: "3" },
      { name: "Huile végétale", quantity: "5 cl" },
      { name: "Eau chaude ou bouillon", quantity: "1 litre" },
      { name: "Piment frais entier", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Faire dorer les cubes de bœuf dans une cocotte avec l'huile chaude. Saler et poivrer.", duration: "10 min" },
      { step: 2, text: "Ajouter les oignons et l'ail hachés, puis laisser dorer doucement.", duration: "5 min" },
      { step: 3, text: "Ajouter le concentré de tomate et bien mélanger. Délayer la pâte de cacahuète dans un grand bol d'eau chaude avant de la verser dans la cocotte.", duration: "5 min" },
      { step: 4, text: "Ajouter les carottes et patates douces coupées en morceaux. Ajouter le piment entier sans le percer.", duration: "10 min" },
      { step: 5, text: "Laisser mijoter à feu moyen-doux. La sauce va épaissir et l'huile de cacahuète va remonter légèrement en surface.", duration: "30 min" },
      { step: 6, text: "Rectifier l'assaisonnement et servir bien chaud avec du riz blanc cassé.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Choix de la pâte", text: "Utilisez du beurre de cacahuète 100% naturel sans sucre ajouté ni arôme artificiel pour conserver le goût authentique du Mali." },
      { title: "Erreur à éviter", text: "Ne pas crever le piment en remuant, sinon la sauce deviendra immangeable pour ceux qui n'aiment pas le piment fort." }
    ],
    nutrition: {
      calories: 720,
      protein: "45g",
      fat: "35g",
      carbs: "50g",
      fiber: "8g",
      vitamins: ["Vitamine E", "Zinc", "Potassium", "Fer"]
    },
    presentation: "Présenter le riz blanc en couronne sur une assiette creuse et verser la sauce mafé onctueuse et ses morceaux fondants de viande au milieu. Décorer avec quelques cacahuètes grillées entières concassées.",
    gallery: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
    ]
  },
  {
    id: 5,
    name: "Konkoé Fumé",
    country: "Guinée",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    preparationTime: 15,
    cookingTime: 35,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Poisson mâchoiron fumé (Konkoé)", quantity: "400g" },
      { name: "Huile de palme rouge ou végétale", quantity: "5 cl" },
      { name: "Oignons rouges émincés", quantity: "2" },
      { name: "Tomates fraîches concassées", quantity: "4" },
      { name: "Aubergines africaines", quantity: "2" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Citron vert", quantity: "1" },
      { name: "Sel et poivre", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire tremper le poisson fumé dans de l'eau tiède pour le dessaler légèrement et enlever les impuretés.", duration: "10 min" },
      { step: 2, text: "Dans une casserole, faire chauffer l'huile de palme et y faire revenir les oignons rouges.", duration: "5 min" },
      { step: 3, text: "Ajouter les tomates concassées et laisser réduire pour former une sauce épaisse.", duration: "10 min" },
      { step: 4, text: "Ajouter les morceaux de poisson fumé égouttés et les aubergines coupées en quartiers.", duration: "15 min" },
      { step: 5, text: "Verser un petit verre d'eau, déposer le piment entier et laisser mijoter à feu doux jusqu'à ce que les légumes soient tendres.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Nettoyage du Poisson", text: "Frottez délicatement la peau du poisson fumé avec du citron pour retirer les traces de suie avant de le cuisiner." }
    ],
    nutrition: {
      calories: 450,
      protein: "35g",
      fat: "14g",
      carbs: "12g",
      fiber: "3g",
      vitamins: ["Vitamine D", "B6", "Sélénium"]
    },
    presentation: "Disposer les morceaux de poisson fumé nappés de leur sauce onctueuse dans un bol en argile, servis avec du riz ou du manioc cuit à la vapeur.",
    gallery: [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 6,
    name: "Babenda",
    country: "Burkina Faso",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    preparationTime: 20,
    cookingTime: 30,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Feuilles d'amarante ou épinards frais", quantity: "500g" },
      { name: "Soumbala (graines de néré fermentées)", quantity: "2 c. à soupe" },
      { name: "Poudre d'arachide grillée", quantity: "4 c. à soupe" },
      { name: "Riz cassé précuit", quantity: "150g" },
      { name: "Poisson séché émietté", quantity: "100g" },
      { name: "Piment en poudre", quantity: "1/2 c. à café" },
      { name: "Sel", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Laver soigneusement les feuilles vertes et les hacher grossièrement.", duration: "10 min" },
      { step: 2, text: "Faire bouillir les feuilles dans une grande marmite avec très peu d'eau salée.", duration: "8 min" },
      { step: 3, text: "Ajouter le riz précuit, le soumbala écrasé et le poisson séché émietté.", duration: "10 min" },
      { step: 4, text: "Incorporer la poudre d'arachide en remuant constamment pour lier la préparation.", duration: "10 min" },
      { step: 5, text: "Laisser mijoter jusqu'à ce que tout soit bien tendre et homogène.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Le Soumbala", text: "Le soumbala apporte la saveur umami indispensable à ce plat burkinabé traditionnel. Utilisez-le fraîchement écrasé." }
    ],
    nutrition: {
      calories: 380,
      protein: "22g",
      fat: "11g",
      carbs: "45g",
      fiber: "9g",
      vitamins: ["Vitamine K", "Vitamine A", "Fer", "Calcium"]
    },
    presentation: "Présenter le Babenda dans un bol en bois rustique. C'est un plat réconfortant à manger bien chaud.",
    gallery: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80"
    ]
  },
  {
    id: 7,
    name: "Ndolé aux Crevettes",
    country: "Cameroun",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    preparationTime: 40,
    cookingTime: 35,
    difficulty: "Difficile",
    ingredients: [
      { name: "Feuilles de Ndolé (bitterleaf) lavées", quantity: "400g" },
      { name: "Arachides blanches émondées", quantity: "300g" },
      { name: "Crevettes fraîches décortiquées", quantity: "250g" },
      { name: "Viande de bœuf cuite en cubes", quantity: "200g" },
      { name: "Oignons émincés", quantity: "3" },
      { name: "Gousses d'ail", quantity: "4" },
      { name: "Huile de palme raffinée ou tournesol", quantity: "15 cl" },
      { name: "Gingembre frais", quantity: "1 morceau" },
      { name: "Cube d'assaisonnement et sel", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir les arachides pendant 10 minutes, puis les mixer finement avec l'ail, le gingembre et un oignon.", duration: "15 min" },
      { step: 2, text: "Dans une grande casserole, faire chauffer l'huile et y faire suer un oignon émincé. Ajouter la viande de bœuf.", duration: "8 min" },
      { step: 3, text: "Ajouter la pâte d'arachide mixée. Faire cuire à feu doux pendant 15 minutes en remuant régulièrement pour que le fond ne colle pas.", duration: "15 min" },
      { step: 4, text: "Ajouter les feuilles de Ndolé hachées très finement et lavées plusieurs fois pour retirer l'amertume.", duration: "10 min" },
      { step: 5, text: "Dans une poêle à part, faire dorer le reste d'oignon émincé et les crevettes, puis verser le tout brûlant sur la préparation de Ndolé.", duration: "10 min" }
    ],
    chefTips: [
      { title: "Lavage du Ndolé", text: "Si vos feuilles de Ndolé sont fraîches, faites-les bouillir avec une pincée de bicarbonate de soude pour préserver la couleur verte et rincer plusieurs fois à l'eau froide." }
    ],
    nutrition: {
      calories: 640,
      protein: "39g",
      fat: "29g",
      carbs: "35g",
      fiber: "8g",
      vitamins: ["Vitamine C", "Fer", "Potassium", "Magnésium"]
    },
    presentation: "Servir le Ndolé dans un plat blanc moderne avec du riz blanc, des bâtons de manioc (bobolo) ou de la banane plantain frite (alloco).",
    gallery: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80"
    ]
  },
  {
    id: 8,
    name: "Egusi Soup",
    country: "Nigeria",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    preparationTime: 25,
    cookingTime: 35,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Graines de melon Egusi moulues", quantity: "200g" },
      { name: "Feuilles d'épinards frais hachées", quantity: "300g" },
      { name: "Viande de chèvre ou de bœuf", quantity: "400g" },
      { name: "Poisson fumé séché", quantity: "1" },
      { name: "Huile de palme rouge", quantity: "10 cl" },
      { name: "Graines de caroube (Iru)", quantity: "1 c. à soupe" },
      { name: "Piment rouge moulu (Crayfish)", quantity: "2 c. à soupe" },
      { name: "Oignon haché", quantity: "1" },
      { name: "Sel et cube de bouillon", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir la viande avec de l'oignon, du sel et du bouillon jusqu'à tendreté. Conserver le jus de cuisson.", duration: "20 min" },
      { step: 2, text: "Mélanger l'Egusi moulu avec un peu d'eau pour obtenir une pâte épaisse.", duration: "5 min" },
      { step: 3, text: "Chauffer l'huile de palme rouge dans une casserole, ajouter les oignons et l'iru. Verser la pâte d'Egusi en faisant des petits tas.", duration: "10 min" },
      { step: 4, text: "Laisser frire doucement pour que l'Egusi forme des petits grumeaux, puis ajouter le jus de viande, le poisson fumé et le crayfish.", duration: "15 min" },
      { step: 5, text: "Ajouter la viande et enfin les épinards. Laisser cuire 5 minutes de plus à feu doux.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Consistance", text: "L'Egusi doit cuire doucement dans l'huile de palme pour former de délicats grumeaux qui rappellent des œufs brouillés." }
    ],
    nutrition: {
      calories: 590,
      protein: "35g",
      fat: "31g",
      carbs: "18g",
      fiber: "5g",
      vitamins: ["Vitamine A", "Vitamine E", "Zinc"]
    },
    presentation: "Accompagner la soupe Egusi d'un beau dôme de Pounded Yam (foufou d'igname) blanc et lisse.",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80"
    ]
  },
  {
    id: 9,
    name: "Amiwo au Poulet",
    country: "Bénin",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    preparationTime: 20,
    cookingTime: 40,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Farine de maïs rouge ou blanc", quantity: "250g" },
      { name: "Poulet fermier en morceaux", quantity: "1" },
      { name: "Tomates fraîches concassées", quantity: "4" },
      { name: "Oignons émincés", quantity: "2" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Gousses d'ail", quantity: "2" },
      { name: "Huile de friture", quantity: "15 cl" },
      { name: "Sel, poivre et épices poulet", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir le poulet bien épicé avec de l'oignon, de l'ail et du sel pour obtenir un bouillon riche.", duration: "25 min" },
      { step: 2, text: "Retirer le poulet et le faire frire dans l'huile chaude jusqu'à ce qu'il soit bien croustillant.", duration: "10 min" },
      { step: 3, text: "Prendre le bouillon filtré, y incorporer progressivement la farine de maïs en remuant pour éviter les grumeaux.", duration: "12 min" },
      { step: 4, text: "Faire cuire cette pâte à feu très doux en remuant jusqu'à ce qu'elle devienne ferme et se détache de la casserole.", duration: "15 min" },
      { step: 5, text: "Servir la pâte façonnée en dômes avec les morceaux de poulet croustillants et une sauce tomate épicée.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Cuisson de la pâte", text: "La farine de maïs doit absorber tout le bouillon parfumé pour donner à l'Amiwo sa saveur inimitable et sa texture moelleuse." }
    ],
    nutrition: {
      calories: 540,
      protein: "30g",
      fat: "19g",
      carbs: "55g",
      fiber: "4g",
      vitamins: ["Vitamine B", "Fer", "Zinc"]
    },
    presentation: "Disposer les dômes d'amiwo rouge au centre de l'assiette, décorer avec le poulet doré et des tranches d'oignon frais.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80"
    ]
  },
  {
    id: 10,
    name: "Ablo avec Poisson Frit",
    country: "Togo",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    preparationTime: 30,
    cookingTime: 25,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Farine de riz", quantity: "200g" },
      { name: "Semoule de maïs fine", quantity: "100g" },
      { name: "Levure boulangère sèche", quantity: "1 c. à café" },
      { name: "Sucre en poudre", quantity: "3 c. à soupe" },
      { name: "Poisson rouge (Red Snapper) entier", quantity: "1" },
      { name: "Sauce piment rouge (moyoyo)", quantity: "Selon goût" },
      { name: "Sel et citron vert", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Mélanger les farines avec de l'eau tiède, du sucre et la levure. Laisser lever la pâte dans un endroit chaud pendant 1 heure.", duration: "10 min" },
      { step: 2, text: "Verser la pâte fermentée dans de petits moules et cuire à la vapeur pendant 15 minutes.", duration: "15 min" },
      { step: 3, text: "Nettoyer et entailler le poisson. L'assaisonner de sel et de jus de citron vert.", duration: "10 min" },
      { step: 4, text: "Frire le poisson dans une huile bien chaude jusqu'à obtenir une peau croustillante.", duration: "12 min" },
      { step: 5, text: "Servir les Ablo tièdes, moelleux et sucrés avec le poisson chaud et le piment.", duration: "5 min" }
    ],
    chefTips: [
      { title: "La fermentation", text: "Les petits pains Ablo doivent avoir de jolis petits trous à la surface, signe d'une fermentation réussie." }
    ],
    nutrition: {
      calories: 490,
      protein: "28g",
      fat: "12g",
      carbs: "68g",
      fiber: "2g",
      vitamins: ["Vitamine D", "Calcium", "Sélénium"]
    },
    presentation: "Poser les Ablo blancs nacrés sur une feuille de bananier, avec le poisson frit entier doré et une sauce tomate fraîche aux oignons crus.",
    gallery: [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 11,
    name: "Saka Saka (Pondu)",
    country: "Congo",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    preparationTime: 30,
    cookingTime: 90,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Feuilles de manioc pilées fraîches ou congelées", quantity: "500g" },
      { name: "Huile de palme rouge", quantity: "10 cl" },
      { name: "Poisson pilchard (en boîte de conserve de tomate)", quantity: "1 boîte" },
      { name: "Poireau haché et oignon", quantity: "1 de chaque" },
      { name: "Gousses d'ail pilées", quantity: "3" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Pâte d'arachide (optionnelle)", quantity: "2 c. à soupe" },
      { name: "Sel et bouillon cube", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir les feuilles de manioc pilées dans une grande quantité d'eau pendant 45 minutes pour éliminer l'acidité.", duration: "45 min" },
      { step: 2, text: "Ajouter les poireaux, les oignons, l'ail et le piment entier. Laisser cuire encore 15 minutes.", duration: "15 min" },
      { step: 3, text: "Ajouter la boîte de poisson pilchard à la tomate et remuer délicatement.", duration: "10 min" },
      { step: 4, text: "Verser l'huile de palme rouge et la pâte d'arachide délayée. Laisser mijoter à feu doux jusqu'à évaporation complète de l'eau.", duration: "20 min" }
    ],
    chefTips: [
      { title: "Cuisson longue", text: "Le Saka Saka doit cuire longtemps pour perdre toute sa toxicité naturelle et devenir doux et savoureux." }
    ],
    nutrition: {
      calories: 430,
      protein: "19g",
      fat: "25g",
      carbs: "30g",
      fiber: "11g",
      vitamins: ["Vitamine A", "Vitamine C", "Fer", "Magnésium"]
    },
    presentation: "Dresser le Saka Saka vert foncé et luisant dans un plat creux. Servir avec de la chicouangue (pain de manioc) ou de la banane vapeur.",
    gallery: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 12,
    name: "Poulet Nyembwe",
    country: "Gabon",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    preparationTime: 25,
    cookingTime: 45,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Poulet fumé découpé", quantity: "1" },
      { name: "Purée de noix de palme (Nyembwe)", quantity: "400g" },
      { name: "Oignons émincés", quantity: "2" },
      { name: "Gousses d'ail", quantity: "3" },
      { name: "Gingembre râpé", quantity: "1 c. à café" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Sel et poivre blanc", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire rissoler le poulet fumé dans une cocotte sans ajout de matière grasse pour en extraire les arômes.", duration: "10 min" },
      { step: 2, text: "Ajouter les oignons, l'ail et le gingembre. Faire revenir quelques minutes.", duration: "5 min" },
      { step: 3, text: "Ajouter la sauce de noix de palme (Nyembwe) et remuer pour napper le poulet.", duration: "5 min" },
      { step: 4, text: "Ajouter un petit verre d'eau et le piment entier. Laisser mijoter à feu doux à découvert pour que la sauce réduise et devienne onctueuse.", duration: "25 min" }
    ],
    chefTips: [
      { title: "Sauce d'origine", text: "La purée de noix de palme donne une onctuosité incroyable à la sauce. Elle doit napper le dos de la cuillère." }
    ],
    nutrition: {
      calories: 690,
      protein: "40g",
      fat: "42g",
      carbs: "15g",
      fiber: "4g",
      vitamins: ["Vitamine E", "Vitamine K", "Zinc"]
    },
    presentation: "Disposer les morceaux de poulet fumé bien enrobés de sauce rouge orangé dans un plat de service avec du riz blanc ou de la banane mûre cuite.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"
    ]
  },
  {
    id: 13,
    name: "Garba de Thon",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    preparationTime: 15,
    cookingTime: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Attiéké (couscous de manioc)", quantity: "400g" },
      { name: "Steak de thon rouge ou blanc", quantity: "300g" },
      { name: "Farine de blé", quantity: "100g" },
      { name: "Huile végétale (frire le thon)", quantity: "30 cl" },
      { name: "Oignons rouges finement hachés", quantity: "2" },
      { name: "Piment vert frais écrasé ou haché", quantity: "2" },
      { name: "Cube d'assaisonnement émietté", quantity: "1" },
      { name: "Sel et poivre", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Couper le thon en cubes de taille moyenne. Les saler et les enrober généreusement de farine.", duration: "5 min" },
      { step: 2, text: "Faire frire le thon dans l'huile bien chaude jusqu'à ce qu'il soit croustillant et bien brun à l'extérieur.", duration: "10 min" },
      { step: 3, text: "Humidifier l'attiéké et le passer au micro-ondes ou au cuiseur vapeur pendant 5 minutes.", duration: "5 min" },
      { step: 4, text: "Dans chaque assiette, étaler l'attiéké chaud, y ajouter un peu de l'huile de friture chaude du thon.", duration: "2 min" },
      { step: 5, text: "Disposer le thon frit dessus, parsemer d'oignons rouges crus, de piment vert et émietter un peu de bouillon cube.", duration: "3 min" }
    ],
    chefTips: [
      { title: "Le Secret de l'huile", text: "L'arrosage de l'attiéké avec un filet d'huile de friture de thon est la signature authentique du Garba des rues d'Abidjan." }
    ],
    nutrition: {
      calories: 620,
      protein: "36g",
      fat: "24g",
      carbs: "60g",
      fiber: "3g",
      vitamins: ["Vitamine D", "B12", "Sélénium"]
    },
    presentation: "Servir dans une assiette creuse ou un plat en émail vintage, façon street food authentique d'Abidjan, avec de grands éclats d'oignons rouges sur le dessus.",
    gallery: [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 14,
    name: "Poulet Yassa",
    country: "Sénégal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    preparationTime: 30,
    cookingTime: 40,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Poulet découpé en morceaux", quantity: "1.2 kg" },
      { name: "Oignons blancs", quantity: "1 kg" },
      { name: "Citrons jaunes (jus)", quantity: "5" },
      { name: "Moutarde forte", quantity: "4 c. à soupe" },
      { name: "Huile de tournesol", quantity: "10 cl" },
      { name: "Gousses d'ail pilées", quantity: "5" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Olives vertes dénoyautées", quantity: "100g" },
      { name: "Sel, poivre et bouillon de volaille", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire mariner le poulet avec le jus de citron, la moutarde, la moitié de l'ail, du sel, du poivre et 2 cuillères à soupe d'huile. Laisser au frais idéalement toute une nuit.", duration: "10 min" },
      { step: 2, text: "Émincer le kilo d'oignons et les ajouter à la marinade du poulet.", duration: "15 min" },
      { step: 3, text: "Retirer le poulet et faire griller les morceaux au barbecue ou au four sous le gril jusqu'à ce qu'ils soient bien dorés.", duration: "15 min" },
      { step: 4, text: "Égoutter les oignons de la marinade et les faire caraméliser lentement dans une cocotte avec de l'huile.", duration: "15 min" },
      { step: 5, text: "Ajouter le reste de jus de la marinade, le bouillon cube, les olives vertes, le poulet doré et le piment entier. Mijoter à couvert.", duration: "20 min" }
    ],
    chefTips: [
      { title: "La Marinade", text: "Plus le poulet et les oignons marinent longtemps dans le citron et la moutarde, plus le Yassa sera tendre et parfumé." }
    ],
    nutrition: {
      calories: 590,
      protein: "38g",
      fat: "19g",
      carbs: "22g",
      fiber: "4g",
      vitamins: ["Vitamine C", "Vitamine B6", "Fer"]
    },
    presentation: "Disposer les morceaux de poulet caramélisés sur un lit d'oignons fondants au citron. Servir avec du riz blanc cassé une ou deux fois.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"
    ]
  },
  {
    id: 15,
    name: "Kédjénou de Poulet",
    country: "Côte d'Ivoire",
    image: "/src/assets/images/poulet_kedjenou_1782757582434.jpg",
    preparationTime: 20,
    cookingTime: 50,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Poulet fermier découpé", quantity: "1" },
      { name: "Tomates mûres découpées", quantity: "4" },
      { name: "Oignons émincés", quantity: "3" },
      { name: "Gousses d'ail écrasées", quantity: "4" },
      { name: "Gingembre râpé", quantity: "1 c. à café" },
      { name: "Piment rouge frais", quantity: "2" },
      { name: "Feuilles de laurier", quantity: "2" },
      { name: "Citron (pour nettoyer le poulet)", quantity: "1" },
      { name: "Sel et poivre du moulin", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Laver les morceaux de poulet avec du jus de citron, puis les éponger.", duration: "5 min" },
      { step: 2, text: "Dans un faitout en terre cuite (ou une cocotte lourde), disposer le poulet, ajouter les tomates, les oignons, l'ail, le gingembre, le laurier, le sel et le poivre.", duration: "10 min" },
      { step: 3, text: "Fermer la cocotte hermétiquement avec du papier aluminium puis poser le couvercle lourd.", duration: "5 min" },
      { step: 4, text: "Cuire à feu moyen-doux sans jamais ajouter d'eau. Les légumes et le poulet vont rejeter leur propre jus.", duration: "45 min" },
      { step: 5, text: "Secouer vigoureusement la cocotte fermée toutes les 10 minutes pour éviter que les ingrédients ne collent au fond.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Zéro Eau", text: "Le secret absolu du Kédjénou réside dans l'absence totale d'eau ajoutée. Le jus savoureux est purement extrait des légumes et du poulet." },
      { title: "Secouer la Marmite", text: "Secouez vigoureusement par les poignées avec un torchon, sans jamais l'ouvrir pendant la cuisson." }
    ],
    nutrition: {
      calories: 490,
      protein: "38g",
      fat: "14g",
      carbs: "15g",
      fiber: "3g",
      vitamins: ["Vitamine A", "Vitamine C", "Fer", "Magnésium"]
    },
    presentation: "Servir directement dans le plat en terre cuite chaud posé au centre de la table, accompagné d'un attiéké moelleux servi à côté.",
    gallery: [
      "/src/assets/images/poulet_kedjenou_1782757582434.jpg",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 16,
    name: "Waakye",
    country: "Ghana",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    preparationTime: 15,
    cookingTime: 50,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Riz blanc parfumé", quantity: "300g" },
      { name: "Haricots rouges ou cornilles", quantity: "200g" },
      { name: "Feuilles de sorgho séchées (Waakye leaves)", quantity: "4" },
      { name: "Sel de mer", quantity: "1 c. à café" },
      { name: "Bicarbonate de soude (pour attendrir)", quantity: "1 pincée" },
      { name: "Shito (sauce pimentée noire ghanéenne)", quantity: "Pour accompagner" }
    ],
    preparation: [
      { step: 1, text: "Faire tremper les haricots toute une nuit dans de l'eau.", duration: "10 min" },
      { step: 2, text: "Faire bouillir les haricots avec les feuilles de sorgho séchées qui vont libérer une belle couleur pourpre foncé.", duration: "30 min" },
      { step: 3, text: "Retirer les feuilles de sorgho une fois que l'eau est bien colorée.", duration: "2 min" },
      { step: 4, text: "Ajouter le riz lavé, du sel et cuire à couvert à feu très doux jusqu'à ce que l'eau soit complètement absorbée.", duration: "20 min" }
    ],
    chefTips: [
      { title: "Feuilles de sorgho", text: "Ces feuilles séchées donnent au Waakye son goût terreux unique et sa couleur pourpre caractéristique. On en trouve dans les épiceries africaines." }
    ],
    nutrition: {
      calories: 520,
      protein: "18g",
      fat: "4g",
      carbs: "90g",
      fiber: "12g",
      vitamins: ["Fer", "Vitamine B9", "Fibres solubles"]
    },
    presentation: "Servir dans une feuille de bananier avec de la sauce Shito, du gari mouillé, un œuf dur et des plantains frits.",
    gallery: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
    ]
  },
  {
    id: 17,
    name: "Dibi d'Agneau",
    country: "Sénégal",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    preparationTime: 20,
    cookingTime: 30,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Côtelettes ou gigot d'agneau en morceaux", quantity: "800g" },
      { name: "Moutarde de Dijon", quantity: "2 c. à soupe" },
      { name: "Oignons blancs", quantity: "3" },
      { name: "Huile végétale", quantity: "5 cl" },
      { name: "Épices dibi (ail, oignon en poudre, piment, sel)", quantity: "2 c. à soupe" },
      { name: "Citron jaune", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Assaisonner la viande d'agneau avec les épices sèches de dibi, de la moutarde et un peu d'huile.", duration: "10 min" },
      { step: 2, text: "Griller la viande au feu de bois ou au gril électrique bien chaud jusqu'à ce qu'elle soit bien saisie à l'extérieur et tendre à l'intérieur.", duration: "20 min" },
      { step: 3, text: "Émincer les oignons et les faire revenir dans une poêle avec de la moutarde, du jus de citron et un peu d'huile.", duration: "10 min" }
    ],
    chefTips: [
      { title: "Cuisson grill", text: "Le secret d'un bon dibi est le parfum de fumée de bois. À défaut de barbecue, utilisez un gril en fonte bien chaud." }
    ],
    nutrition: {
      calories: 630,
      protein: "45g",
      fat: "32g",
      carbs: "12g",
      fiber: "2g",
      vitamins: ["Vitamine B12", "Zinc", "Fer"]
    },
    presentation: "Servir l'agneau coupé en morceaux sur du papier d'emballage sulfurisé, recouvert d'oignons caramélisés croustillants à la moutarde.",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
    ]
  },
  {
    id: 18,
    name: "Plakali Sauce Graine",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    preparationTime: 25,
    cookingTime: 55,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Plakali (pâte de manioc fermentée)", quantity: "500g" },
      { name: "Pulpe de fruits du palmier (sauce graine)", quantity: "400g" },
      { name: "Crabes de mer nettoyés", quantity: "3" },
      { name: "Poisson fumé ou viande séchée", quantity: "200g" },
      { name: "Piment Scotch Bonnet", quantity: "1" },
      { name: "Sel et bouillon cube", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir la sauce graine avec un peu d'eau, ajouter les crabes et le poisson fumé.", duration: "25 min" },
      { step: 2, text: "Laisser épaissir la sauce jusqu'à ce qu'une fine couche d'huile rouge apparaisse à la surface. Saler et poivrer.", duration: "20 min" },
      { step: 3, text: "Préparer le plakali : mélanger la pâte de manioc avec de l'eau, filtrer, puis cuire à feu doux en remuant de façon énergique jusqu'à ce que la pâte devienne translucide et élastique.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Remuer le Plakali", text: "Le plakali demande de la force physique pour être remué constamment avec une spatule en bois afin d'éviter tout grumeau." }
    ],
    nutrition: {
      calories: 580,
      protein: "24g",
      fat: "28g",
      carbs: "52g",
      fiber: "6g",
      vitamins: ["Vitamine E", "Calcium", "Zinc"]
    },
    presentation: "Former des boules de plakali bien lisses dans des assiettes individuelles creuses, puis napper généreusement de sauce graine onctueuse aux crabes.",
    gallery: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 19,
    name: "Beignets Koki",
    country: "Cameroun",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80",
    preparationTime: 35,
    cookingTime: 40,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Haricots blancs (cornilles) pelés", quantity: "400g" },
      { name: "Huile de palme rouge", quantity: "10 cl" },
      { name: "Sel de cuisine", quantity: "1 c. à café" },
      { name: "Piment Scotch Bonnet écrasé", quantity: "1/2" },
      { name: "Feuilles de bananier pour la cuisson", quantity: "Selon besoin" }
    ],
    preparation: [
      { step: 1, text: "Faire tremper et peler les haricots pour enlever la peau noire des germes.", duration: "20 min" },
      { step: 2, text: "Mixer finement les haricots avec un peu d'eau pour obtenir une pâte lisse.", duration: "10 min" },
      { step: 3, text: "Chauffer l'huile de palme très légèrement et l'ajouter à la pâte avec le sel et le piment.", duration: "5 min" },
      { step: 4, text: "Mettre la pâte dans les feuilles de bananier préalablement ramollies au feu, attacher avec du fil de cuisine et cuire à la vapeur.", duration: "40 min" }
    ],
    chefTips: [
      { title: "Texture", text: "La pâte doit être battue vigoureusement avant d'incorporer l'huile de palme pour la rendre légère et aérée." }
    ],
    nutrition: {
      calories: 410,
      protein: "16g",
      fat: "18g",
      carbs: "42g",
      fiber: "8g",
      vitamins: ["Vitamine A", "Vitamine B6", "Magnésium"]
    },
    presentation: "Servir les gâteaux de Koki jaunes-oranges directement déballés des feuilles de bananier fumantes, avec de la banane plantain cuite.",
    gallery: [
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 20,
    name: "Suya de Bœuf",
    country: "Nigeria",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    preparationTime: 20,
    cookingTime: 15,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Filet ou tende de bœuf en fines tranches", quantity: "600g" },
      { name: "Épice Kuli-Kuli (poudre d'arachide grillée)", quantity: "100g" },
      { name: "Piment de Cayenne et gingembre", quantity: "1 c. à café" },
      { name: "Ail en poudre et oignon en poudre", quantity: "1 c. à café" },
      { name: "Huile de tournesol", quantity: "3 c. à soupe" },
      { name: "Sel de mer", quantity: "1 c. à café" }
    ],
    preparation: [
      { step: 1, text: "Couper le bœuf en très fines lanières de viande et les enfiler en accordéon sur des brochettes en bois.", duration: "10 min" },
      { step: 2, text: "Mélanger la poudre d'arachide Kuli-Kuli avec le piment, l'ail, l'oignon, le gingembre et le sel pour faire l'épice Yaji.", duration: "5 min" },
      { step: 3, text: "Enrober complètement les brochettes de cette épice aromatique, vaporiser d'un filet d'huile.", duration: "5 min" },
      { step: 4, text: "Faire griller au barbecue à feu très vif pour obtenir une belle croûte épicée.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Finesse de coupe", text: "Placez la viande 30 minutes au congélateur avant de la couper, cela permettra de faire de très fines tranches plus facilement." }
    ],
    nutrition: {
      calories: 510,
      protein: "44g",
      fat: "22g",
      carbs: "10g",
      fiber: "2g",
      vitamins: ["Zinc", "Fer", "Vitamine B12"]
    },
    presentation: "Disposer les brochettes de Suya fumantes sur une planche en bois avec de gros anneaux d'oignons blancs crus et des tomates rouges émincées.",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
    ]
  },
  {
    id: 21,
    name: "Sauce Gombo Kopé",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    preparationTime: 25,
    cookingTime: 35,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Gombos frais hachés ou mixés", quantity: "300g" },
      { name: "Crabes de mer frais", quantity: "3" },
      { name: "Crevettes et poissons fumés", quantity: "150g" },
      { name: "Morceaux de peau de bœuf cuite (kanda)", quantity: "150g" },
      { name: "Huile de palme rouge", quantity: "5 cl" },
      { name: "Bicarbonate de soude (pour la glue)", quantity: "1 pincée" },
      { name: "Piment vert et bouillon cube", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir les crabes, les crevettes et la peau de bœuf dans une cocotte assaisonnée de bouillon.", duration: "15 min" },
      { step: 2, text: "Ajouter les gombos finement émincés ou râpés avec une pincée de bicarbonate pour activer la viscosité.", duration: "10 min" },
      { step: 3, text: "Verser un filet d'huile de palme pour donner une belle teinte rouge et lier les éléments.", duration: "5 min" },
      { step: 4, text: "Laisser mijoter sans couvercle à feu moyen pour garder la belle couleur verte et la texture gélatineuse.", duration: "10 min" }
    ],
    chefTips: [
      { title: "Garder la glue", text: "Ne couvrez jamais la marmite de gombo pendant sa cuisson, sinon le gombo perdra son élasticité et sa viscosité légendaires." }
    ],
    nutrition: {
      calories: 460,
      protein: "32g",
      fat: "18g",
      carbs: "18g",
      fiber: "6g",
      vitamins: ["Vitamine C", "Vitamine K", "Calcium", "Zinc"]
    },
    presentation: "Servir dans de grands bols avec du foutou banane ou du riz blanc chaud. Le dôme de foutou doit être nappé de cette sauce coulante.",
    gallery: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80"
    ]
  },
  {
    id: 22,
    name: "Sosso Sauce d'Arachide",
    country: "Guinée",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    preparationTime: 20,
    cookingTime: 30,
    difficulty: "Facile",
    ingredients: [
      { name: "Pavés de bar ou sosso frais", quantity: "4" },
      { name: "Pâte de cacahuète crémeuse", quantity: "120g" },
      { name: "Tomates mûres", quantity: "3" },
      { name: "Oignons émincés", quantity: "2" },
      { name: "Huile de friture", quantity: "10 cl" },
      { name: "Gousses d'ail", quantity: "2" },
      { name: "Citron vert", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Frire légèrement les pavés de poisson assaisonnés de citron et de sel dans une poêle.", duration: "8 min" },
      { step: 2, text: "Dans une casserole, mélanger la pâte de cacahuète à l'eau pour obtenir une sauce fluide. Ajouter les oignons, l'ail et la purée de tomates.", duration: "10 min" },
      { step: 3, text: "Ajouter les morceaux de poisson frit dans la sauce et laisser mijoter jusqu'à ce que la sauce épaississe.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Cuisson du poisson", text: "Le bar est un poisson délicat, ajoutez-le en toute fin de cuisson de la sauce d'arachide pour éviter qu'il ne se décompose." }
    ],
    nutrition: {
      calories: 590,
      protein: "38g",
      fat: "30g",
      carbs: "14g",
      fiber: "3g",
      vitamins: ["Vitamine E", "Sélénium", "Fer"]
    },
    presentation: "Disposer le pavé de poisson Sosso au milieu de l'assiette, napper de sauce brune onctueuse et accompagner de riz.",
    gallery: [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 23,
    name: "Foutou Banane Sauce Graine",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    preparationTime: 40,
    cookingTime: 50,
    difficulty: "Difficile",
    ingredients: [
      { name: "Bananes plantains mûres", quantity: "3" },
      { name: "Manioc doux", quantity: "1 racine" },
      { name: "Pulpe de graine de palme", quantity: "400g" },
      { name: "Morceaux de viande de bœuf ou cabri", quantity: "400g" },
      { name: "Crabe de mer et poisson fumé", quantity: "1 de chaque" },
      { name: "Sel, oignon et piment", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire bouillir les bananes et le manioc épluchés dans une eau salée jusqu'à tendreté complète.", duration: "25 min" },
      { step: 2, text: "Piler d'abord les bananes dans un mortier en bois traditionnel, puis ajouter progressivement le manioc jusqu'à obtenir une pâte jaune dorée, ferme, lisse et élastique. Former des boules.", duration: "20 min" },
      { step: 3, text: "Cuire la viande, les crabes et la sauce de graines de palme à feu moyen. Laisser épaissir jusqu'à ce que la sauce devienne parfumée et onctueuse.", duration: "45 min" }
    ],
    chefTips: [
      { title: "Le Secret du Foutou", text: "Le manioc apporte l'élasticité nécessaire pour que le foutou banane tienne parfaitement sa forme sphérique." }
    ],
    nutrition: {
      calories: 740,
      protein: "28g",
      fat: "24g",
      carbs: "95g",
      fiber: "8g",
      vitamins: ["Potassium", "Vitamine A", "Vitamine E", "Magnésium"]
    },
    presentation: "Disposer une boule de foutou banane brillante et bombée au centre de l'assiette creuse. Verser la sauce rouge foncé tout autour pour faire flotter la boule, garnie de crabe et de viandes.",
    gallery: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
    ]
  },
  {
    id: 24,
    name: "Ragoût de Sardines Fumées",
    country: "Gabon",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    preparationTime: 15,
    cookingTime: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Sardines fumées séchées", quantity: "200g" },
      { name: "Tomates fraîches concassées", quantity: "3" },
      { name: "Gombo émincé", quantity: "5" },
      { name: "Oignons et ail hachés", quantity: "1 de chaque" },
      { name: "Huile de palme rouge ou végétale", quantity: "3 c. à soupe" },
      { name: "Piment Scotch Bonnet", quantity: "1/2" }
    ],
    preparation: [
      { step: 1, text: "Nettoyer les sardines fumées en enlevant la tête et les arêtes centrales.", duration: "10 min" },
      { step: 2, text: "Faire revenir les oignons et l'ail dans l'huile, ajouter les tomates fraîches.", duration: "8 min" },
      { step: 3, text: "Ajouter les gombos coupés en rondelles et les sardines fumées. Laisser cuire à feu doux pendant 15 minutes en mélangeant doucement.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Fragilité des sardines", text: "Remuez délicatement à l'aide d'une cuillère en bois pour ne pas réduire les sardines fumées en bouillie." }
    ],
    nutrition: {
      calories: 390,
      protein: "26g",
      fat: "16g",
      carbs: "10g",
      fiber: "3g",
      vitamins: ["Calcium", "Oméga 3", "Fer"]
    },
    presentation: "Dresser ce ragoût d'un rouge brillant dans une assiette creuse, servi à côté de bâtons de manioc cuits à la vapeur.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80"
    ]
  },
  {
    id: 25,
    name: "Calalou de Crabe",
    country: "Bénin",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    preparationTime: 25,
    cookingTime: 30,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Feuilles de calalou ou épinards", quantity: "400g" },
      { name: "Crabes bleus nettoyés et coupés", quantity: "4" },
      { name: "Crevettes grises fraîches", quantity: "150g" },
      { name: "Graines de néré (soumbala)", quantity: "1 c. à soupe" },
      { name: "Huile de palme rouge", quantity: "5 cl" },
      { name: "Oignon, sel et piment", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Cuire les crabes dans un court-bouillon salé pendant 10 minutes.", duration: "10 min" },
      { step: 2, text: "Faire suer les oignons dans l'huile de palme, ajouter le soumbala et les crevettes.", duration: "5 min" },
      { step: 3, text: "Ajouter les épinards hachés et laisser réduire. Intégrer les crabes avec un peu de leur eau de cuisson et mijoter.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Crabes frais", text: "Utilisez de préférence des crabes frais bien pleins. Brossez-les soigneusement sous l'eau courante avant cuisson." }
    ],
    nutrition: {
      calories: 420,
      protein: "29g",
      fat: "14g",
      carbs: "12g",
      fiber: "5g",
      vitamins: ["Vitamine A", "Zinc", "Sélénium"]
    },
    presentation: "Disposer les crabes au centre d'un bol large en terre, recouverts du calalou vert tendre et aromatique.",
    gallery: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 26,
    name: "Djinkoumè au Poulet",
    country: "Togo",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    preparationTime: 20,
    cookingTime: 45,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Farine de maïs torréfiée", quantity: "200g" },
      { name: "Poulet fermier en morceaux", quantity: "1" },
      { name: "Tomates mûres concassées", quantity: "4" },
      { name: "Concentré de tomate", quantity: "1 c. à soupe" },
      { name: "Huile de palme rouge", quantity: "8 cl" },
      { name: "Oignons, ail et gingembre râpés", quantity: "Selon goût" }
    ],
    preparation: [
      { step: 1, text: "Faire rôtir à sec la farine de maïs dans une poêle pour la torréfier légèrement.", duration: "10 min" },
      { step: 2, text: "Cuire le poulet avec l'oignon, l'ail et le gingembre pour faire un bouillon de poulet parfumé.", duration: "25 min" },
      { step: 3, text: "Ajouter la sauce tomate à base de concentré et d'huile de palme rouge.", duration: "10 min" },
      { step: 4, text: "Verser la farine de maïs torréfiée dans le bouillon chaud en remuant continuellement pour cuire la pâte.", duration: "12 min" }
    ],
    chefTips: [
      { title: "Torréfaction", text: "La farine de maïs doit être légèrement dorée à sec, ce qui donne au Djinkoumè sa couleur marron clair et son petit goût fumé typique." }
    ],
    nutrition: {
      calories: 560,
      protein: "32g",
      fat: "18g",
      carbs: "58g",
      fiber: "4g",
      vitamins: ["Vitamine B12", "Fer", "Zinc"]
    },
    presentation: "Dresser le Djinkoumè ferme façon dômes, entouré de morceaux de poulet frits dorés et d'une sauce piquante aux oignons.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80"
    ]
  },
  {
    id: 27,
    name: "Riz au Gras de Poulet",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    preparationTime: 20,
    cookingTime: 35,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz parfumé cassé", quantity: "500g" },
      { name: "Cuisses de poulet", quantity: "4" },
      { name: "Tomates et carottes coupées", quantity: "3 de chaque" },
      { name: "Chou blanc coupé en quartiers", quantity: "1/4" },
      { name: "Huile de cuisson", quantity: "8 cl" },
      { name: "Oignons émincés", quantity: "2" },
      { name: "Bouillon cube d'assaisonnement", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Faire frire les cuisses de poulet assaisonnées dans l'huile.", duration: "10 min" },
      { step: 2, text: "Retirer le poulet, faire revenir les oignons, les carottes et le chou blanc dans la même casserole.", duration: "10 min" },
      { step: 3, text: "Ajouter la sauce tomate concentrée et 600 ml d'eau. Laisser bouillir.", duration: "10 min" },
      { step: 4, text: "Laver le riz et l'ajouter à la sauce. Baisser le feu et couvrir hermétiquement.", duration: "20 min" }
    ],
    chefTips: [
      { title: "Riz Ivoirien", text: "Le Riz au gras est le jollof ivoirien traditionnel. Il est souvent un peu plus gras et garni de légumes entiers comme du chou et des carottes." }
    ],
    nutrition: {
      calories: 590,
      protein: "28g",
      fat: "18g",
      carbs: "72g",
      fiber: "4g",
      vitamins: ["Vitamine A", "B6", "Magnésium"]
    },
    presentation: "Servir dans un grand plat familial avec les cuisses de poulet rôties dorées sur le dôme de riz au gras et les morceaux de chou cuits posés autour.",
    gallery: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"
    ]
  },
  {
    id: 28,
    name: "Gbofloto (Beignets Doux)",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80",
    preparationTime: 15,
    cookingTime: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Farine de blé type 45", quantity: "500g" },
      { name: "Levure boulangère fraîche ou déshydratée", quantity: "1 c. à café" },
      { name: "Sucre blanc en poudre", quantity: "150g" },
      { name: "Eau tiède", quantity: "35 cl" },
      { name: "Sel fin", quantity: "1 pincée" },
      { name: "Huile végétale (friture)", quantity: "1 litre" }
    ],
    preparation: [
      { step: 1, text: "Délayer la levure boulangère dans un peu d'eau tiède.", duration: "5 min" },
      { step: 2, text: "Mélanger la farine, le sucre, le sel, la levure diluée et verser le reste d'eau tiède pour former une pâte souple.", duration: "10 min" },
      { step: 3, text: "Laisser lever la pâte sous un linge propre dans un endroit tiède pendant environ 2 heures.", duration: "5 min" },
      { step: 4, text: "Chauffer l'huile de friture dans une casserole profonde. Prendre de petites portions de pâte avec la main et faire des boules avec les doigts.", duration: "5 min" },
      { step: 5, text: "Faire frire les Gbofloto jusqu'à ce qu'ils soient gonflés et bien dorés de tous les côtés.", duration: "15 min" }
    ],
    chefTips: [
      { title: "Température de l'huile", text: "L'huile ne doit pas être trop chaude, sinon les beignets doreront trop vite à l'extérieur mais resteront crus à l'intérieur." }
    ],
    nutrition: {
      calories: 320,
      protein: "6g",
      fat: "9g",
      carbs: "52g",
      fiber: "2g",
      vitamins: ["Glucides lents", "Sodium"]
    },
    presentation: "Disposer les gboflotos ronds et dorés dans un panier en paille traditionnelle avec du papier absorbant. Saupoudrer éventuellement d'une touche de sucre glace.",
    gallery: [
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  },
  {
    id: 29,
    name: "Choukouya de Mouton",
    country: "Côte d'Ivoire",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    preparationTime: 20,
    cookingTime: 40,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Gigot d'agneau ou épaule de mouton", quantity: "800g" },
      { name: "Gros sel et oignon en poudre", quantity: "1 c. à soupe" },
      { name: "Poudre d'ail et piment de Cayenne", quantity: "1 c. à café" },
      { name: "Oignons rouges coupés en lanières", quantity: "3" },
      { name: "Huile végétale", quantity: "5 cl" },
      { name: "Bouillon cube d'assaisonnement", quantity: "1" }
    ],
    preparation: [
      { step: 1, text: "Découper la viande de mouton en cubes de taille moyenne. Assaisonner copieusement d'épices sèches.", duration: "10 min" },
      { step: 2, text: "Disposer la viande dans du papier aluminium résistant avec les lanières d'oignons rouges, arroser d'un peu d'huile.", duration: "10 min" },
      { step: 3, text: "Refermer hermétiquement la papillote d'aluminium et cuire au barbecue à braise ou au four très chaud.", duration: "30 min" },
      { step: 4, text: "Ouvrir la papillote et laisser griller le dessus pour obtenir des bords croustillants sous le gril.", duration: "10 min" }
    ],
    chefTips: [
      { title: "Épices Choukouya", text: "Le choukouya authentique est parfumé d'une poudre d'épices appelée kansah ou d'épices à base d'arachide moulue et de piments secs." }
    ],
    nutrition: {
      calories: 610,
      protein: "42g",
      fat: "35g",
      carbs: "10g",
      fiber: "1g",
      vitamins: ["Zinc", "Fer", "Vitamine B12"]
    },
    presentation: "Servir la viande fumante directement dans son papier aluminium ouvert, parsemée d'oignons fondants doux, accompagnée d'alloco ou de bâtons d'attiéké.",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
    ]
  },
  {
    id: 30,
    name: "Efo Riro",
    country: "Nigeria",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    preparationTime: 25,
    cookingTime: 30,
    difficulty: "Moyenne",
    ingredients: [
      { name: "Feuilles d'épinards Shoko ou classiques", quantity: "500g" },
      { name: "Mélange de poivrons rouges et piments Scotch Bonnet mixés", quantity: "300g" },
      { name: "Viande de bœuf et tripes cuites (shaki)", quantity: "300g" },
      { name: "Poisson fumé séché nettoyé", quantity: "150g" },
      { name: "Huile de palme rouge", quantity: "10 cl" },
      { name: "Graines de caroube (Iru)", quantity: "2 c. à soupe" },
      { name: "Crayfish en poudre", quantity: "2 c. à soupe" },
      { name: "Oignons rouges hachés", quantity: "2" }
    ],
    preparation: [
      { step: 1, text: "Faire blanchir brièvement les épinards hachés dans une eau bouillante salée, puis égoutter vigoureusement pour retirer l'excès d'eau.", duration: "5 min" },
      { step: 2, text: "Faire chauffer l'huile de palme dans une grande cocotte, ajouter les oignons rouges hachés et l'Iru pour parfumer l'huile.", duration: "5 min" },
      { step: 3, text: "Ajouter la sauce de poivrons mixée grossièrement et laisser frire jusqu'à ce que l'eau s'évapore et que l'huile remonte.", duration: "12 min" },
      { step: 4, text: "Ajouter le poisson fumé, les crevettes sèches (crayfish), les tripes, la viande de bœuf et laisser s'imprégner de la sauce.", duration: "8 min" },
      { step: 5, text: "Incorporer les épinards égouttés, bien mélanger et laisser mijoter 5 minutes de plus à couvert à feu très doux.", duration: "5 min" }
    ],
    chefTips: [
      { title: "Zéro Eau", text: "Les épinards rejettent beaucoup d'eau. Pressez-les bien avant de les intégrer à la sauce friture pour conserver une sauce Efo Riro bien concentrée." }
    ],
    nutrition: {
      calories: 540,
      protein: "35g",
      fat: "22g",
      carbs: "14g",
      fiber: "6g",
      vitamins: ["Vitamine A", "Vitamine C", "Fer", "Calcium"]
    },
    presentation: "Servir l'Efo Riro d'un vert profond et garni de viandes juteuses avec de l'amala chaud ou du riz blanc parfumé.",
    gallery: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    ]
  }
];
