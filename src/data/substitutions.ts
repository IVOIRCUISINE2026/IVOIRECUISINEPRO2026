export interface Substitution {
  originalIngredient: string;
  replacement: string;
  explanation: string;
}

export const INGREDIENT_SUBSTITUTIONS: Record<number, Substitution[]> = {
  1: [
    {
      originalIngredient: "Attiéké (couscous de manioc)",
      replacement: "Couscous de blé moyen ou semoule de manioc classique cuite à la vapeur",
      explanation: "Le couscous de blé reproduit l'aspect grainé et léger de l'attiéké en bouche, bien que la légère acidité fermentée du manioc d'origine soit absente."
    },
    {
      originalIngredient: "Poissons capitaine ou tilapia entiers",
      replacement: "Bar (loup de mer), Dorade royale ou Colin",
      explanation: "Ces poissons blancs possèdent une chair ferme et savoureuse qui supporte excellemment la grillade au barbecue ou sous le gril du four."
    },
    {
      originalIngredient: "Piment antillais rouge",
      replacement: "Piment Habanero ou sauce piquante de type Sriracha (dosée au goût)",
      explanation: "Le Scotch Bonnet ou piment antillais est très parfumé mais extrêmement fort. Le Habanero offre la même intensité aromatique piquante."
    }
  ],
  2: [
    {
      originalIngredient: "Yet (mollusque séché) & Guédj (poisson séché salé)",
      replacement: "Filets d'anchois au sel, sauce de poisson asiatique (Nuoc-mâm) ou morue salée séchée",
      explanation: "Le yet et le guédj apportent la signature 'umami' sauvage et iodée du Sénégal. Les anchois écrasés ou la sauce Nuoc-mâm imitent à la perfection cette profondeur fermentée."
    },
    {
      originalIngredient: "Poisson Mérou ou Thiof",
      replacement: "Cabillaud (morue fraîche), Bar de ligne ou Colin noir",
      explanation: "Le Thiof est le poisson noble du Sénégal. Un beau pavé de cabillaud ou de bar offre une texture charnue similaire qui ne s'émiette pas dans le bouillon."
    },
    {
      originalIngredient: "Riz brisé parfumé (deux fois cassé)",
      replacement: "Riz Jasmin classique rincé vigoureusement à l'eau froide pour enlever l'amidon",
      explanation: "Le riz brisé retient mieux le bouillon concentré en sauce sans devenir collant. Rincer le riz Jasmin permet d'éviter l'aspect pâteux."
    }
  ],
  3: [
    {
      originalIngredient: "Piment Scotch Bonnet",
      replacement: "Piment de Cayenne moulu ou poivron rouge mixé avec une pointe de Tabasco",
      explanation: "Permet d'ajuster la puissance de cuisson sans perdre la couleur rouge caractéristique de la sauce de base (tomato stew) du riz Jollof ghanéen."
    },
    {
      originalIngredient: "Huile de coco",
      replacement: "Huile de tournesol, de pépins de raisin ou de colza",
      explanation: "Idéal si vous préférez un goût de riz plus neutre, sans les notes tropicales prononcées de la noix de coco fraîche."
    }
  ],
  4: [
    {
      originalIngredient: "Pâte d'arachide",
      replacement: "Beurre de cacahuète crémeux classique (100% cacahuètes, sans sucre ajouté)",
      explanation: "Le beurre de cacahuète bio ou naturel non sucré est le substitut idéal. Évitez les marques industrielles trop sucrées qui dénatureraient le plat salé."
    },
    {
      originalIngredient: "Viande de bœuf",
      replacement: "Poulet fermier, gigot d'agneau ou courge Butternut / patates douces (version végétarienne)",
      explanation: "Le mafé s'accorde merveilleusement avec toutes les protéines. Les patates douces et la courge absorbent divinement la sauce onctueuse."
    }
  ],
  5: [
    {
      originalIngredient: "Konkoé (mâchoiron fumé)",
      replacement: "Maquereau fumé, Truite fumée entière ou Hareng fumé",
      explanation: "Le konkoé guinéen a un parfum de fumée de bois extrêmement prononcé. Le maquereau fumé disponible en poissonnerie offre un goût boisé très proche."
    }
  ],
  6: [
    {
      originalIngredient: "Feuilles d'oseille sauvage acidulées",
      replacement: "Jeunes pousses d'épinards frais combinées avec un filet de jus de citron vert",
      explanation: "L'oseille sauvage apporte une acidité végétale unique au Babenda burkinabè. L'association d'épinards pour la texture et de citron pour l'acidité est idéale."
    },
    {
      originalIngredient: "Soumbala (néré fermenté)",
      replacement: "Pâte de miso brun japonais, pâte de soja fermentée coréenne (Doenjang) ou sauce soja foncée",
      explanation: "Le soumbala offre une note terreuse, fermentée et corsée. Le miso brun partage ce même profil de fermentation riche en acides aminés."
    }
  ],
  7: [
    {
      originalIngredient: "Feuilles de Ndolé (amères)",
      replacement: "Feuilles d'épinards frais hachées mélangées à de la scarole ou de l'endive émincée cuite",
      explanation: "Le Ndolé est réputé pour sa délicate amertume. Les endives ou la scarole imitent ce caractère amer, tandis que les épinards recréent l'onctuosité verte."
    },
    {
      originalIngredient: "Arachides fraîches épluchées",
      replacement: "Amandes mondées crues (réduites en pâte) ou cacahuètes blanches mondées non salées",
      explanation: "La pâte obtenue en mixant les amandes mondées après cuisson à l'eau est douce et onctueuse, parfaite pour lier la sauce sans altérer le Ndolé."
    }
  ],
  8: [
    {
      originalIngredient: "Graines de courge Egusi",
      replacement: "Graines de courge vertes européennes (moulues très finement après avoir été séchées à sec)",
      explanation: "Bien que d'une variété différente, les graines de courge européennes broyées offrent la texture crémeuse et le liant caractéristique recherchés dans cette soupe."
    },
    {
      originalIngredient: "Crayfish (crevettes séchées moulues)",
      replacement: "Poudre de crevettes asiatique (utilisée en cuisine thaï) ou sauce de poisson concentrée",
      explanation: "La poudre de crevettes apporte cette touche d'arôme grillé marin salé, pilier du goût de la soupe Egusi."
    }
  ],
  9: [
    {
      originalIngredient: "Farine de maïs rouge",
      replacement: "Farine de maïs jaune ou polenta fine, mélangée à 1 c. à café de concentré de tomate",
      explanation: "La farine de maïs rouge béninoise tire sa couleur de la variété locale de maïs. La tomate apporte la couleur et une légère touche acidulée."
    }
  ],
  10: [
    {
      originalIngredient: "Farine de riz et maïs fermentée",
      replacement: "Farine de riz blanc classique mélangée à une pincée de levure boulangère déshydratée",
      explanation: "Le secret de l'Ablo togolais réside dans la fermentation. Ajouter une pointe de levure boulangère et laisser reposer la pâte au chaud 2 heures recrée ce moelleux alvéolé."
    }
  ],
  11: [
    {
      originalIngredient: "Feuilles de manioc (Pondu)",
      replacement: "Épinards hachés surgelés (longuement mijotés avec des poireaux)",
      explanation: "Les feuilles de manioc demandent 1 à 2 heures de cuisson. Les épinards mijotés longuement avec du poireau émincé s'en rapprochent sur le plan visuel et de la texture."
    },
    {
      originalIngredient: "Huile de palme rouge",
      replacement: "Huile de tournesol ou d'olive infusée à feu doux avec du paprika doux et une pointe de curcuma",
      explanation: "Permet d'imiter la belle teinte orangée chaleureuse caractéristique de la cuisine congolaise sans utiliser d'huile de palme brute."
    }
  ],
  12: [
    {
      originalIngredient: "Purée de noix de palme (Nyembwe)",
      replacement: "Crème de noix de coco mélangée à de la crème de sésame (Tahini) et une pointe d'huile d'olive",
      explanation: "La sauce Nyembwe gabonaise est extrêmement riche, veloutée et grasse. Ce mélange recrée un velouté onctueux d'une densité équivalente."
    }
  ],
  13: [
    {
      originalIngredient: "Garba d'attiéké et thon frais frit",
      replacement: "Couscous de blé et pavé de thon rouge cuit à cœur ou maquereau frit à l'huile",
      explanation: "Le Garba est le street-food ivoirien par excellence. Le maquereau offre ce caractère gras et puissant du thon frit abidjanais."
    }
  ],
  14: [
    {
      originalIngredient: "Piment Scotch Bonnet",
      replacement: "Piment d'Espelette doux en poudre ou piment jalapeño émincé",
      explanation: "Pour les palais sensibles, ces alternatives réduisent grandement le piquant volcanique tout en conservant une note fruitée subtile."
    }
  ],
  15: [
    {
      originalIngredient: "Poulet fermier pour Kédjénou",
      replacement: "Pintade, canette ou morceaux de dinde grasse",
      explanation: "Le kédjénou se cuit à l'étouffée sans eau. Une viande ferme comme la pintade rejette son propre jus parfumé sans se désagréger à la cuisson lente."
    }
  ],
  16: [
    {
      originalIngredient: "Feuilles de sorgho séchées (Waakye leaves)",
      replacement: "Une pincée de bicarbonate de soude cuite avec du riz noir/sauvage pour teinter l'eau",
      explanation: "Les feuilles de sorgho libèrent un pigment bordeaux naturel qui colore le riz waakye. Le bicarbonate modifie le pH pour accentuer les couleurs foncées des haricots."
    }
  ],
  17: [
    {
      originalIngredient: "Épices Dibi traditionnelles",
      replacement: "Mélange maison de poudre d'oignon, ail semoule, gingembre moulu, poivre blanc et sel fin",
      explanation: "Ce mélange simple mais efficace recrée la signature aromatique du grilladin de rue de Dakar (le Dibiterie)."
    }
  ],
  18: [
    {
      originalIngredient: "Plakali (pâte de manioc fermentée)",
      replacement: "Fufu de manioc instantané en sachet ou polenta blanche cuite de façon très élastique",
      explanation: "Le plakali possède une texture translucide, gélatineuse et légèrement élastique. Le fufu instantané préparé à la spatule permet de retrouver cette consistance."
    },
    {
      originalIngredient: "Pulpe de fruits du palmier",
      replacement: "Pâte de cacahuète fluide diluée dans un bouillon de bœuf corsé avec une touche de concentré de tomate",
      explanation: "Permet d'obtenir une sauce onctueuse de couleur ocre avec un liant similaire pour accompagner la pâte de manioc."
    }
  ],
  19: [
    {
      originalIngredient: "Haricots blancs (cornilles) pelés",
      replacement: "Farine de pois chiche délayée à l'eau tiède ou haricots blancs classiques cuits et mixés",
      explanation: "Le koki camerounais est une terrine de haricots cuite à la vapeur. La farine de pois chiche donne une texture dense et aérée similaire une fois cuite à la vapeur."
    }
  ],
  20: [
    {
      originalIngredient: "Poudre d'épice Kuli-Kuli",
      replacement: "Cacahuètes grillées non salées, pilées finement au mortier et dégraissées en les pressant dans un linge propre",
      explanation: "Le kuli-kuli est obtenu à partir du tourteau d'arachide dégraissé. Presser les cacahuètes écrasées permet d'obtenir cette poudre sèche idéale pour la croûte du Suya."
    }
  ],
  21: [
    {
      originalIngredient: "Peau de bœuf cuite (kanda / ponpon)",
      replacement: "Champignons shiitake frais ou séchés réhydratés, ou oreilles de juda (champignons noirs)",
      explanation: "Ces champignons offrent une texture croquante et gélatineuse sous la dent qui rappelle celle de la kanda cuite dans la sauce gombo."
    }
  ],
  22: [
    {
      originalIngredient: "Poisson Sosso (Bar)",
      replacement: "Pavé de cabillaud, lieu jaune, églefin ou julienne",
      explanation: "Le Sosso guinéen est un poisson blanc délicat. Le cabillaud ou le lieu jaune offre une chair tendre qui absorbe magnifiquement la sauce onctueuse à la cacahuète."
    }
  ],
  23: [
    {
      originalIngredient: "Foutou Banane (bananes plantains mûres et manioc doux)",
      replacement: "Flocons de pommes de terre (purée instantanée) travaillés à chaud avec de la fécule de tapioca (manioc)",
      explanation: "La fécule de tapioca apporte l'élasticité et le collant indispensables au foutou traditionnel ivoirien, qu'une purée de pomme de terre seule ne possède pas."
    }
  ],
  24: [
    {
      originalIngredient: "Sardines fumées séchées",
      replacement: "Sardines fumées en boîte (conservées dans l'huile) ou sprats fumés",
      explanation: "Les sardines fumées en boîte sont prêtes à l'emploi et confèrent immédiatement ce parfum fumé rustique et réconfortant à la sauce."
    }
  ],
  25: [
    {
      originalIngredient: "Feuilles de calalou",
      replacement: "Feuilles d'épinards frais, de blettes (sans les côtes) ou feuilles de chou vert très tendres",
      explanation: "Ces feuilles vertes s'affaissent magnifiquement à la cuisson pour donner ce ragoût d'herbes onctueux entourant les crabes."
    },
    {
      originalIngredient: "Graines de néré (soumbala)",
      replacement: "Une pincée de bouillon de miso noir déshydraté ou de la levure nutritionnelle en paillettes",
      explanation: "Le soumbala apporte un goût de terroir fermenté très profond, le miso noir ou brun partage ces mêmes notes terreuses."
    }
  ],
  26: [
    {
      originalIngredient: "Farine de maïs torréfiée",
      replacement: "Semoule de maïs jaune classique passée à sec dans une poêle chaude pendant 5 minutes en remuant",
      explanation: "Torréfier légèrement la semoule de maïs libère un arôme de noisette grillée incomparable, mimant la préparation traditionnelle du Djinkoumè togolais."
    }
  ],
  27: [
    {
      originalIngredient: "Chou blanc en quartiers",
      replacement: "Chou vert frisé ou chou de Milan",
      explanation: "Ces variétés de choux conservent un excellent croquant et une belle tenue même après avoir mijoté dans le gras du poulet et la sauce tomate."
    }
  ],
  28: [
    {
      originalIngredient: "Levure boulangère fraîche",
      replacement: "Levure boulangère sèche instantanée (diviser la quantité par 3, soit environ 1 cuillère à café)",
      explanation: "La levure sèche instantanée est plus stable et s'active directement dans la farine tiède sans nécessiter de réhydratation préalable."
    }
  ],
  29: [
    {
      originalIngredient: "Mouton (épaule ou gigot)",
      replacement: "Épaule d'agneau ou de bœuf persillé (comme la basse-côte)",
      explanation: "Pour le Choukouya, une viande contenant un peu de gras est indispensable afin de rester juteuse et caramélisée lors de la cuisson enveloppée dans du papier."
    }
  ],
  30: [
    {
      originalIngredient: "Feuilles d'épinards Shoko (nigérianes)",
      replacement: "Feuilles d'épinards classiques mélangées à quelques feuilles de roquette",
      explanation: "Les épinards Shoko sont légèrement plus fermes et poivrés. La roquette apporte cette subtile touche poivrée et rehausse le goût du ragoût Efo Riro."
    },
    {
      originalIngredient: "Crayfish en poudre",
      replacement: "Poudre de crevettes séchées ou sauce d'huître asiatique",
      explanation: "Indispensable pour donner cette signature de saveur marine grillée très prisée dans la cuisine yoruba."
    }
  ]
};
