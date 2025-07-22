export interface Plant {
  id: string;
  name: string;
  latinName: string;
  emoji: string;
  shortDescription: string;
  fullDescription: string;
  mainBenefits: string[];
  usage: string;
  contraindications: string;
  products: {
    name: string;
    price: string;
    description: string;
    composition: string;
  }[];
}

export const plantsData: { [key: string]: Plant[] } = {
  tete: [
    {
      id: 'ginkgo',
      name: 'Ginkgo Biloba',
      latinName: 'Ginkgo biloba',
      emoji: '🍃',
      shortDescription: 'Améliore la circulation cérébrale et la concentration.',
      fullDescription: 'Le Ginkgo biloba est un arbre millénaire dont les feuilles sont utilisées en phytothérapie pour leurs propriétés circulatoires exceptionnelles. Cette plante favorise la microcirculation cérébrale, améliore la mémoire et la concentration.',
      mainBenefits: [
        'Améliore la circulation sanguine cérébrale',
        'Favorise la concentration et la mémoire',
        'Propriétés antioxydantes',
        'Aide contre les vertiges'
      ],
      usage: 'Prendre 120-240mg d\'extrait standardisé par jour, de préférence pendant les repas. Cure de 2-3 mois recommandée.',
      contraindications: 'Déconseillé aux personnes sous anticoagulants. Éviter avant une intervention chirurgicale.',
      products: [
        {
          name: 'Ginkgo Bio - Gélules',
          price: '24,90€',
          description: 'Extrait de feuilles de Ginkgo biloba bio, standardisé à 24% de flavonoïdes',
          composition: 'Extrait sec de feuilles de Ginkgo biloba bio (120mg), gélule végétale'
        },
        {
          name: 'Teinture Mère Ginkgo',
          price: '18,50€',
          description: 'Teinture mère de Ginkgo biloba, extraction traditionnelle',
          composition: 'Teinture mère de Ginkgo biloba (Ginkgo biloba) 1:10, alcool 45%'
        }
      ]
    },
    {
      id: 'rhodiola',
      name: 'Rhodiola',
      latinName: 'Rhodiola rosea',
      emoji: '🌸',
      shortDescription: 'Plante adaptogène contre le stress et la fatigue mentale.',
      fullDescription: 'La Rhodiola rosea est une plante adaptogène qui pousse dans les régions froides. Elle aide l\'organisme à s\'adapter au stress et améliore les performances cognitives en période de fatigue.',
      mainBenefits: [
        'Réduit le stress et l\'anxiété',
        'Améliore les performances cognitives',
        'Combat la fatigue mentale',
        'Favorise l\'adaptation au stress'
      ],
      usage: 'Prendre 200-400mg d\'extrait standardisé le matin à jeun. Éviter la prise le soir.',
      contraindications: 'Déconseillé aux femmes enceintes et allaitantes. Éviter en cas de troubles bipolaires.',
      products: [
        {
          name: 'Rhodiola Premium',
          price: '32,90€',
          description: 'Extrait de racine de Rhodiola rosea, standardisé à 3% de rosavines',
          composition: 'Extrait sec de racine de Rhodiola rosea (300mg), gélule végétale'
        }
      ]
    }
  ],
  gorge: [
    {
      id: 'thym',
      name: 'Thym',
      latinName: 'Thymus vulgaris',
      emoji: '🌿',
      shortDescription: 'Antiseptique naturel pour les voies respiratoires.',
      fullDescription: 'Le thym est une plante aromatique aux propriétés antiseptiques et expectorantes remarquables. Il est traditionnellement utilisé pour soulager les affections des voies respiratoires.',
      mainBenefits: [
        'Propriétés antiseptiques et antibactériennes',
        'Soulage la toux et les maux de gorge',
        'Action expectorante',
        'Aide à dégager les voies respiratoires'
      ],
      usage: 'Infusion : 1 cuillère à café de thym séché dans 250ml d\'eau bouillante, 3 fois par jour. Ou en inhalation.',
      contraindications: 'Éviter les doses élevées chez la femme enceinte. Peut irriter les muqueuses sensibles.',
      products: [
        {
          name: 'Thym Bio - Tisane',
          price: '12,90€',
          description: 'Feuilles de thym bio séchées pour infusion',
          composition: 'Feuilles de Thymus vulgaris bio 100%'
        },
        {
          name: 'Sirop de Thym',
          price: '16,50€',
          description: 'Sirop traditionnel au thym pour la gorge',
          composition: 'Extrait aqueux de thym, miel, sucre de canne'
        }
      ]
    }
  ],
  ventre: [
    {
      id: 'menthe',
      name: 'Menthe Poivrée',
      latinName: 'Mentha piperita',
      emoji: '🌱',
      shortDescription: 'Facilite la digestion et soulage les troubles intestinaux.',
      fullDescription: 'La menthe poivrée est reconnue pour ses propriétés digestives et antispasmodiques. Elle soulage efficacement les troubles digestifs et les douleurs abdominales.',
      mainBenefits: [
        'Facilite la digestion',
        'Soulage les ballonnements',
        'Action antispasmodique',
        'Rafraîchit l\'haleine'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, après les repas. Ou 1-2 gouttes d\'huile essentielle sur un sucre.',
      contraindications: 'Éviter chez les enfants de moins de 3 ans. Déconseillé en cas de reflux gastro-œsophagien sévère.',
      products: [
        {
          name: 'Menthe Poivrée Bio',
          price: '9,90€',
          description: 'Feuilles de menthe poivrée bio pour tisane digestive',
          composition: 'Feuilles de Mentha piperita bio 100%'
        },
        {
          name: 'Huile Essentielle Menthe',
          price: '14,90€',
          description: 'Huile essentielle pure de menthe poivrée bio',
          composition: 'Huile essentielle de Mentha piperita bio 100%'
        }
      ]
    }
  ],
  articulations: [
    {
      id: 'curcuma',
      name: 'Curcuma',
      latinName: 'Curcuma longa',
      emoji: '🟡',
      shortDescription: 'Anti-inflammatoire naturel pour les articulations.',
      fullDescription: 'Le curcuma est une épice aux propriétés anti-inflammatoires puissantes grâce à la curcumine. Il aide à soulager les douleurs articulaires et musculaires.',
      mainBenefits: [
        'Puissant anti-inflammatoire naturel',
        'Soulage les douleurs articulaires',
        'Propriétés antioxydantes',
        'Favorise la mobilité'
      ],
      usage: 'Prendre 500-1000mg d\'extrait standardisé par jour avec de la pipérine pour améliorer l\'absorption.',
      contraindications: 'Éviter en cas de calculs biliaires. Déconseillé avant une intervention chirurgicale.',
      products: [
        {
          name: 'Curcuma + Pipérine',
          price: '28,90€',
          description: 'Extrait de curcuma avec pipérine pour une meilleure absorption',
          composition: 'Extrait de Curcuma longa (500mg), extrait de poivre noir (5mg pipérine)'
        }
      ]
    }
  ],
  peau: [
    {
      id: 'aloe',
      name: 'Aloe Vera',
      latinName: 'Aloe barbadensis',
      emoji: '🌵',
      shortDescription: 'Hydrate, apaise et répare la peau naturellement.',
      fullDescription: 'L\'Aloe vera est une plante succulente aux propriétés hydratantes, apaisantes et cicatrisantes exceptionnelles. Son gel est riche en vitamines, minéraux et acides aminés.',
      mainBenefits: [
        'Hydrate intensément la peau',
        'Apaise les irritations et inflammations',
        'Favorise la cicatrisation',
        'Propriétés anti-âge'
      ],
      usage: 'Appliquer le gel pur sur la peau 2-3 fois par jour. Peut être utilisé en masque facial 1-2 fois par semaine.',
      contraindications: 'Éviter l\'ingestion du latex d\'aloe. Test cutané recommandé avant première utilisation.',
      products: [
        {
          name: 'Gel Aloe Vera Pur',
          price: '19,90€',
          description: 'Gel d\'Aloe vera pur à 99%, sans parfum ni colorant',
          composition: 'Gel d\'Aloe barbadensis 99%, conservateurs naturels'
        }
      ]
    }
  ],
  sommeil: [
    {
      id: 'valerian',
      name: 'Valériane',
      latinName: 'Valeriana officinalis',
      emoji: '💜',
      shortDescription: 'Favorise l\'endormissement et améliore la qualité du sommeil.',
      fullDescription: 'La valériane est une plante traditionnellement utilisée pour ses propriétés sédatives douces. Elle aide à réduire le temps d\'endormissement et améliore la qualité du sommeil.',
      mainBenefits: [
        'Favorise l\'endormissement naturel',
        'Améliore la qualité du sommeil',
        'Réduit l\'anxiété légère',
        'Effet relaxant sans accoutumance'
      ],
      usage: 'Prendre 300-600mg d\'extrait sec 30 minutes avant le coucher. Ou en tisane : 2-3g de racine séchée.',
      contraindications: 'Éviter avec l\'alcool et les sédatifs. Déconseillé aux enfants de moins de 12 ans.',
      products: [
        {
          name: 'Valériane Bio - Gélules',
          price: '21,90€',
          description: 'Extrait de racine de valériane bio pour un sommeil naturel',
          composition: 'Extrait sec de racine de Valeriana officinalis bio (400mg)'
        }
      ]
    }
  ],
  immunite: [
    {
      id: 'echinacea',
      name: 'Échinacée',
      latinName: 'Echinacea purpurea',
      emoji: '🌺',
      shortDescription: 'Stimule les défenses naturelles de l\'organisme.',
      fullDescription: 'L\'échinacée est une plante immunostimulante qui aide à renforcer les défenses naturelles de l\'organisme. Elle est particulièrement utile en période hivernale.',
      mainBenefits: [
        'Stimule le système immunitaire',
        'Aide à prévenir les infections',
        'Réduit la durée des refroidissements',
        'Propriétés anti-inflammatoires'
      ],
      usage: 'Prendre 300-500mg d\'extrait standardisé 3 fois par jour en cure de 10 jours maximum.',
      contraindications: 'Éviter en cas de maladies auto-immunes. Déconseillé aux personnes allergiques aux Astéracées.',
      products: [
        {
          name: 'Échinacée Bio - Extrait',
          price: '26,90€',
          description: 'Extrait d\'échinacée bio pour renforcer l\'immunité',
          composition: 'Extrait sec d\'Echinacea purpurea bio (400mg), gélule végétale'
        }
      ]
    }
  ]
};