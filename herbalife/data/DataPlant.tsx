export interface Product {
  id?: string;
  name: string;
  price: string;
  description: string;
  composition: string;
}

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
  products: Product[];
}

export const plantsData: { [key: string]: Plant[] } = {
  tete: [
    {
      id: 'ginkgo',
      name: 'Ginkgo Biloba',
      latinName: 'Ginkgo biloba',
      emoji: '🍃',
      shortDescription: 'L\'arbre millénaire qui favorise la circulation cérébrale.',
      fullDescription: 'Cultivé depuis des millénaires en Chine, le Ginkgo biloba offre ses feuilles en éventail aux reflets dorés. Reconnu en phytothérapie pour ses propriétés circulatoires, il soutient naturellement la microcirculation cérébrale et accompagne la concentration. Ses feuilles concentrent des flavonoïdes et des lactones terpéniques, molécules actives qui favorisent l\'irrigation du cerveau et protègent les cellules nerveuses.',
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
          id: 'ginkgo-capsules',
          name: 'Ginkgo Bio - Gélules',
          price: '24,90€',
          description: 'Extrait de feuilles de Ginkgo biloba bio, standardisé à 24% de flavonoïdes',
          composition: 'Extrait sec de feuilles de Ginkgo biloba bio (120mg), gélule végétale'
        },
        {
          id: 'ginkgo-tincture',
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
      shortDescription: 'Plante adaptogène des terres nordiques, alliée anti-stress.',
      fullDescription: 'Originaire des régions froides de Sibérie, la Rhodiola rosea développe ses fleurs dorées sur les sols rocailleux. Utilisée traditionnellement par les peuples nordiques, cette racine au parfum rosé aide l\'organisme à s\'adapter naturellement aux périodes de stress. Ses principes actifs, les rosavines et salidrosides, soutiennent l\'équilibre nerveux et accompagnent les performances mentales en période de fatigue.',
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
          id: 'rhodiola-premium',
          name: 'Rhodiola Premium',
          price: '32,90€',
          description: 'Extrait de racine de Rhodiola rosea, standardisé à 3% de rosavines',
          composition: 'Extrait sec de racine de Rhodiola rosea (300mg), gélule végétale'
        }
      ]
    },
    {
      id: 'romarin',
      name: 'Romarin',
      latinName: 'Rosmarinus officinalis',
      emoji: '🌿',
      shortDescription: 'Stimulant circulatoire qui favorise la mémoire et la concentration.',
      fullDescription: 'Cultivé sur les coteaux méditerranéens, le romarin développe ses feuilles persistantes aux reflets argentés et son parfum camphré intense. Utilisé depuis l\'Antiquité pour ses vertus tonifiantes, il stimule la circulation cérébrale et soutient les fonctions cognitives. Ses feuilles concentrent des antioxydants naturels qui protègent les cellules nerveuses et favorisent la clarté mentale.',
      mainBenefits: [
        'Stimule la circulation cérébrale',
        'Améliore la mémoire et la concentration',
        'Propriétés antioxydantes',
        'Tonifie le système nerveux'
      ],
      usage: 'Infusion : 1 cuillère à café de feuilles séchées dans 250ml d\'eau bouillante, 2-3 fois par jour.',
      contraindications: 'Éviter les doses élevées chez la femme enceinte. Déconseillé en cas d\'hypertension sévère.',
      products: [
        {
          id: 'romarin-tisane-bio',
          name: 'Romarin Bio - Tisane',
          price: '11,90€',
          description: 'Feuilles de romarin bio séchées pour infusion tonifiante',
          composition: 'Feuilles de Rosmarinus officinalis bio 100%'
        }
      ]
    },
    {
      id: 'lions_mane',
      name: 'Crinière de Lion',
      latinName: 'Hericium erinaceus',
      emoji: '🍄',
      shortDescription: 'Champignon médicinal qui soutient les fonctions cognitives.',
      fullDescription: 'Ce champignon aux filaments blancs ressemblant à une crinière pousse sur les troncs de feuillus. Utilisé traditionnellement en Asie, il contient des compounds uniques qui soutiennent la santé nerveuse. Riche en bêta-glucanes et en hericénones, il accompagne naturellement les fonctions cognitives et la régénération nerveuse.',
      mainBenefits: [
        'Soutient la santé du système nerveux',
        'Favorise les fonctions cognitives',
        'Propriétés neuroprotectrices',
        'Aide à la concentration'
      ],
      usage: 'Décoction : 5-10g de champignon séché dans 500ml d\'eau, mijoter 20 minutes.',
      contraindications: 'Aucune contre-indication majeure connue. Test d\'allergie recommandé.',
      products: [
        {
          name: 'Crinière de Lion Bio - Séché',
          price: '45,90€',
          description: 'Champignon Hericium erinaceus bio séché pour décoction',
          composition: 'Hericium erinaceus bio 100%'
        }
      ]
    },
    {
      id: 'cacao_cru',
      name: 'Cacao Cru',
      latinName: 'Theobroma cacao',
      emoji: '🍫',
      shortDescription: 'Fèves de cacao crues riches en magnésium pour l\'humeur.',
      fullDescription: 'Originaire des forêts tropicales d\'Amérique, le cacaoyer développe ses cabosses colorées renfermant les précieuses fèves de cacao. Non torréfiées, ces fèves conservent tous leurs nutriments naturels, particulièrement le magnésium et la théobromine. Utilisées traditionnellement par les peuples mayas, elles soutiennent naturellement l\'humeur et la vitalité mentale.',
      mainBenefits: [
        'Riche en magnésium naturel',
        'Soutient l\'humeur et la vitalité',
        'Antioxydants puissants',
        'Stimule doucement l\'énergie'
      ],
      usage: 'Consommer 10-20g de fèves crues ou éclats par jour, de préférence le matin.',
      contraindications: 'Modération conseillée en cas de sensibilité à la caféine. Éviter le soir.',
      products: [
        {
          name: 'Éclats de Cacao Cru Bio',
          price: '16,90€',
          description: 'Éclats de fèves de cacao cru bio, riches en magnésium',
          composition: 'Éclats de Theobroma cacao bio 100%'
        }
      ]
    },
    {
      id: 'millepertuis',
      name: 'Millepertuis',
      latinName: 'Hypericum perforatum',
      emoji: '🌻',
      shortDescription: 'Régulateur naturel de l\'humeur et anti-fatigue mentale.',
      fullDescription: 'Plante vivace des prairies ensoleillées, le millepertuis développe ses fleurs jaunes parsemées de petits points noirs. Utilisé traditionnellement pour ses propriétés régulatrices de l\'humeur, il contient de l\'hypéricine et de l\'hyperforine qui soutiennent l\'équilibre émotionnel. Particulièrement apprécié pour accompagner les baisses de moral saisonnières.',
      mainBenefits: [
        'Régule naturellement l\'humeur',
        'Combat la fatigue mentale',
        'Soutient l\'équilibre émotionnel',
        'Aide contre les baisses de moral'
      ],
      usage: 'Infusion : 1-2 cuillères à café de sommités fleuries dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Nombreuses interactions médicamenteuses. Photosensibilisant. Consulter un professionnel de santé.',
      products: [
        {
          name: 'Millepertuis Bio - Sommités',
          price: '17,90€',
          description: 'Sommités fleuries de millepertuis bio pour tisane régulatrice',
          composition: 'Sommités fleuries d\'Hypericum perforatum bio 100%'
        }
      ]
    },
    {
      id: 'basilic_sacre',
      name: 'Basilic Sacré - Tulsi',
      latinName: 'Ocimum tenuiflorum',
      emoji: '🌿',
      shortDescription: 'Plante adaptogène sacrée pour l\'équilibre mental et le stress.',
      fullDescription: 'Vénéré en Inde sous le nom de Tulsi, le basilic sacré développe ses feuilles parfumées aux notes épicées et cloutées. Considéré comme une plante sacrée dans la tradition ayurvédique, il possède des propriétés adaptogènes remarquables. Riche en composés phénoliques, il aide l\'organisme à s\'adapter au stress et favorise la clarté mentale.',
      mainBenefits: [
        'Plante adaptogène puissante',
        'Équilibre mental et émotionnel',
        'Antioxydant cérébral naturel',
        'Réduit les effets du stress'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles fraîches ou séchées dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Prudence en cas de troubles de la coagulation. Éviter pendant la grossesse.',
      products: [
        {
          name: 'Basilic Sacré Bio - Feuilles',
          price: '19,90€',
          description: 'Feuilles de basilic sacré (Tulsi) bio pour tisane adaptogène',
          composition: 'Feuilles d\'Ocimum tenuiflorum bio 100%'
        }
      ]
    },
    {
      id: 'cordyceps',
      name: 'Cordyceps Militaris',
      latinName: 'Cordyceps militaris',
      emoji: '🍄',
      shortDescription: 'Champignon énergisant qui améliore l\'oxygénation cérébrale.',
      fullDescription: 'Champignon parasite aux propriétés énergétiques exceptionnelles, le cordyceps développe ses corps fructifères orange vif sur les larves d\'insectes. Utilisé traditionnellement dans la médecine tibétaine et chinoise, il améliore l\'oxygénation des tissus et soutient l\'endurance mentale. Riche en cordycépine et polysaccharides, il favorise la clarté d\'esprit.',
      mainBenefits: [
        'Améliore l\'oxygénation cérébrale',
        'Stimulant mental doux',
        'Favorise l\'endurance cognitive',
        'Soutient la clarté d\'esprit'
      ],
      usage: 'Décoction : 3-5g de champignon séché dans 500ml d\'eau, mijoter 15-20 minutes.',
      contraindications: 'Éviter en cas de maladies auto-immunes. Interactions possibles avec immunosuppresseurs.',
      products: [
        {
          name: 'Cordyceps Militaris Bio',
          price: '52,90€',
          description: 'Champignon Cordyceps militaris bio séché pour décoction',
          composition: 'Cordyceps militaris bio 100%'
        }
      ]
    },
    {
      id: 'melisse',
      name: 'Mélisse',
      latinName: 'Melissa officinalis',
      emoji: '🌱',
      shortDescription: 'Plante calmante pour l\'anxiété et l\'agitation mentale.',
      fullDescription: 'Plante vivace au parfum citronné caractéristique, la mélisse développe ses feuilles dentelées et ses petites fleurs blanches dans les jardins monastiques. Utilisée depuis l\'Antiquité pour ses vertus apaisantes, elle calme naturellement l\'agitation mentale et favorise la détente. Ses feuilles concentrent des huiles essentielles aux propriétés relaxantes.',
      mainBenefits: [
        'Calme l\'anxiété et le stress',
        'Favorise la concentration',
        'Propriétés antispasmodiques',
        'Améliore l\'humeur'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de feuilles fraîches ou séchées dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Peut potentialiser les effets des sédatifs. Éviter avec les médicaments thyroïdiens.',
      products: [
        {
          name: 'Mélisse Bio - Feuilles',
          price: '13,90€',
          description: 'Feuilles de mélisse bio séchées pour tisane apaisante',
          composition: 'Feuilles de Melissa officinalis bio 100%'
        }
      ]
    },
    {
      id: 'lavande',
      name: 'Lavande Vraie',
      latinName: 'Lavandula angustifolia',
      emoji: '💜',
      shortDescription: 'Fleurs apaisantes pour le stress et l\'anxiété.',
      fullDescription: 'Arbuste vivace aux épis violets parfumés, la lavande vraie pousse sur les sols calcaires de Provence. Utilisée depuis des siècles pour ses vertus calmantes, elle apaise naturellement le stress et favorise la relaxation mentale. Ses fleurs concentrent une huile essentielle riche en linalol et acétate de linalyle.',
      mainBenefits: [
        'Apaise le stress et l\'anxiété',
        'Favorise la relaxation',
        'Améliore la qualité du sommeil',
        'Propriétés antispasmodiques'
      ],
      usage: 'Infusion : 1 cuillère à café de fleurs séchées dans 250ml d\'eau chaude, le soir.',
      contraindications: 'Éviter en cas d\'allergie aux Lamiacées. Prudence pendant la grossesse.',
      products: [
        {
          name: 'Lavande Vraie Bio - Fleurs',
          price: '15,90€',
          description: 'Fleurs de lavande vraie bio de Provence pour tisane',
          composition: 'Fleurs de Lavandula angustifolia bio 100%'
        }
      ]
    },
    {
      id: 'verveine_odorante',
      name: 'Verveine Odorante',
      latinName: 'Aloysia citrodora',
      emoji: '🌿',
      shortDescription: 'Feuilles citronnées relaxantes pour apaiser le mental.',
      fullDescription: 'Arbuste aux feuilles lancéolées et au parfum citronné intense, la verveine odorante développe ses petites fleurs blanches en épis. Originaire d\'Amérique du Sud, elle est cultivée pour ses vertus apaisantes et digestives. Ses feuilles concentrent des huiles essentielles relaxantes qui calment l\'agitation mentale.',
      mainBenefits: [
        'Apaise l\'agitation mentale',
        'Favorise la digestion nerveuse',
        'Propriétés relaxantes',
        'Parfum agréable et rafraîchissant'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles séchées dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Aucune contre-indication majeure connue. Éviter les doses excessives.',
      products: [
        {
          name: 'Verveine Odorante Bio',
          price: '14,90€',
          description: 'Feuilles de verveine odorante bio pour tisane digestive',
          composition: 'Feuilles d\'Aloysia citrodora bio 100%'
        }
      ]
    },
    {
      id: 'gotu-kola',
      name: 'Gotu Kola',
      latinName: 'Centella asiatica',
      emoji: '🌿',
      shortDescription: 'Plante ayurvédique pour la mémoire et la concentration.',
      fullDescription: 'Petite plante rampante des zones humides tropicales aux feuilles rondes caractéristiques, le Gotu Kola est vénéré en médecine ayurvédique comme "aliment du cerveau". Riche en triterpènes, il soutient la circulation cérébrale, améliore la mémoire et favorise la régénération des tissus nerveux.',
      mainBenefits: [
        'Améliore la mémoire et concentration',
        'Soutient la circulation cérébrale',
        'Propriétés neuroprotectrices',
        'Aide à la régénération nerveuse'
      ],
      usage: 'Infusion : 1 cuillère à café de feuilles séchées dans 250ml d\'eau chaude, 2 fois par jour.',
      contraindications: 'Éviter pendant la grossesse. Interactions possibles avec sédatifs.',
      products: [
        {
          name: 'Gotu Kola Bio - Feuilles',
          price: '22,90€',
          description: 'Feuilles de Centella asiatica bio pour la mémoire',
          composition: 'Feuilles de Centella asiatica bio 100%'
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
      shortDescription: 'Plante aromatique méditerranéenne aux vertus respiratoires.',
      fullDescription: 'Cultivé sur les collines ensoleillées du bassin méditerranéen, le thym exhale un parfum intense aux notes camphrées et épicées. Utilisé depuis l\'Antiquité pour ses propriétés purifiantes, il accompagne naturellement le confort des voies respiratoires. Ses petites feuilles argentées concentrent du thymol et du carvacrol, composés antiseptiques qui apaisent la gorge et favorisent l\'expectoration.',
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
    },
    {
      id: 'sureau_noir',
      name: 'Sureau Noir',
      latinName: 'Sambucus nigra',
      emoji: '🌺',
      shortDescription: 'Fleurs antivirales et fortifiantes pour l\'immunité respiratoire.',
      fullDescription: 'Arbuste commun des haies et lisières, le sureau noir offre ses ombelles de fleurs blanches au parfum délicat et musqué. Utilisées traditionnellement en Europe, ces fleurs possèdent des propriétés antivirales reconnues. Riches en flavonoïdes et en mucilages, elles accompagnent naturellement le confort des voies respiratoires et renforcent les défenses immunitaires.',
      mainBenefits: [
        'Propriétés antivirales naturelles',
        'Soutient l\'immunité respiratoire',
        'Apaise les inflammations de la gorge',
        'Action expectorante douce'
      ],
      usage: 'Infusion : 2 cuillères à soupe de fleurs séchées dans 250ml d\'eau bouillante, 3 fois par jour.',
      contraindications: 'Utiliser uniquement les fleurs. Éviter l\'écorce et les feuilles qui sont toxiques.',
      products: [
        {
          name: 'Fleurs de Sureau Bio',
          price: '14,90€',
          description: 'Fleurs de sureau noir bio séchées pour infusion',
          composition: 'Fleurs de Sambucus nigra bio 100%'
        }
      ]
    },
    {
      id: 'mauve_sylvestre',
      name: 'Mauve Sylvestre',
      latinName: 'Malva sylvestris',
      emoji: '🌸',
      shortDescription: 'Plante adoucissante pour les voies respiratoires irritées.',
      fullDescription: 'Commune dans les jardins et chemins, la mauve sylvestre développe ses fleurs violettes veinées et ses feuilles rondes veloutées. Riche en mucilages naturels, elle forme un film protecteur sur les muqueuses irritées. Ses propriétés adoucissantes en font un remède traditionnel pour apaiser la toux et les maux de gorge.',
      mainBenefits: [
        'Adoucit les voies respiratoires',
        'Calme la toux irritative',
        'Protège les muqueuses',
        'Anti-inflammatoire doux'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles et fleurs dans 250ml d\'eau chaude, 3-4 fois par jour.',
      contraindications: 'Aucune contre-indication majeure. Peut réduire l\'absorption de médicaments pris simultanément.',
      products: [
        {
          name: 'Mauve Sylvestre Bio',
          price: '13,50€',
          description: 'Mélange de feuilles et fleurs de mauve bio pour tisane adoucissante',
          composition: 'Feuilles et fleurs de Malva sylvestris bio 100%'
        }
      ]
    },
    {
      id: 'coquelicot',
      name: 'Coquelicot',
      latinName: 'Papaver rhoeas',
      emoji: '🌺',
      shortDescription: 'Pétales apaisants pour calmer la toux et favoriser le repos.',
      fullDescription: 'Fleur emblématique des champs de blé, le coquelicot déploie ses pétales rouge vif comme des soies froissées. Utilisés traditionnellement en herboristerie, ses pétales délicats possèdent des propriétés adoucissantes et légèrement sédatives. Riches en mucilages et alcaloïdes doux, ils apaisent la toux irritative et accompagnent la détente respiratoire.',
      mainBenefits: [
        'Calme la toux sèche',
        'Adoucit les voies respiratoires',
        'Favorise la détente',
        'Propriétés émollientes'
      ],
      usage: 'Infusion : 1 cuillère à soupe de pétales séchés dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Usage modéré recommandé. Éviter chez les enfants de moins de 6 ans.',
      products: [
        {
          name: 'Pétales de Coquelicot Bio',
          price: '18,90€',
          description: 'Pétales de coquelicot bio séchés pour tisane apaisante',
          composition: 'Pétales de Papaver rhoeas bio 100%'
        }
      ]
    },
    {
      id: 'lierre_terrestre',
      name: 'Lierre Terrestre',
      latinName: 'Glechoma hederacea',
      emoji: '🌿',
      shortDescription: 'Plante expectorante traditionnelle pour les voies respiratoires.',
      fullDescription: 'Plante rampante aux feuilles crénelées et aux petites fleurs violettes, le lierre terrestre tapisse les sous-bois humides. Utilisé traditionnellement par les herboristes, il possède des propriétés expectorantes et anti-inflammatoires pour les voies respiratoires. Ses feuilles aromatiques dégagent un parfum balsamique caractéristique.',
      mainBenefits: [
        'Expectorant naturel',
        'Dégage les voies respiratoires',
        'Anti-inflammatoire respiratoire',
        'Propriétés balsamiques'
      ],
      usage: 'Infusion : 1 cuillère à soupe de plante séchée dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Usage modéré recommandé. Éviter l\'usage prolongé.',
      products: [
        {
          name: 'Lierre Terrestre Bio',
          price: '14,90€',
          description: 'Parties aériennes de lierre terrestre bio pour tisane respiratoire',
          composition: 'Parties aériennes de Glechoma hederacea bio 100%'
        }
      ]
    },
    {
      id: 'capucine',
      name: 'Capucine',
      latinName: 'Tropaeolum majus',
      emoji: '🌺',
      shortDescription: 'Fleurs et feuilles antibiotiques naturelles comestibles.',
      fullDescription: 'Plante grimpante aux fleurs éclatantes orange et jaunes, la capucine développe ses feuilles rondes au goût piquant caractéristique. Ses fleurs et feuilles sont riches en glucosinolates, lui conférant des propriétés antibiotiques naturelles. Utilisée traditionnellement contre les infections respiratoires, elle est également appréciée en cuisine pour sa saveur piquante.',
      mainBenefits: [
        'Antibiotique naturel',
        'Combat les infections respiratoires',
        'Riche en vitamine C',
        'Fleurs et feuilles comestibles'
      ],
      usage: 'Consommer les feuilles et fleurs fraîches en salade. Infusion : 1 cuillère à soupe de parties aériennes fraîches dans 250ml d\'eau chaude.',
      contraindications: 'Éviter en cas d\'ulcères gastriques. Modération pendant la grossesse.',
      products: [
        {
          name: 'Capucine Bio - Parties Aériennes',
          price: '15,90€',
          description: 'Feuilles et fleurs de capucine bio séchées',
          composition: 'Parties aériennes de Tropaeolum majus bio 100%'
        }
      ]
    },
    {
      id: 'eucalyptus',
      name: 'Eucalyptus',
      latinName: 'Eucalyptus globulus',
      emoji: '🌿',
      shortDescription: 'Feuilles expectorantes pour dégager les voies respiratoires.',
      fullDescription: 'Grand arbre aux feuilles persistantes bleu-vert, l\'eucalyptus développe son parfum camphré caractéristique. Originaire d\'Australie, ses feuilles concentrent une huile essentielle riche en eucalyptol qui dégage naturellement les voies respiratoires. Traditionnellement utilisé pour soulager les troubles respiratoires.',
      mainBenefits: [
        'Dégage les voies respiratoires',
        'Expectorant naturel',
        'Propriétés antiseptiques',
        'Rafraîchit l\'haleine'
      ],
      usage: 'Infusion : 1 cuillère à café de feuilles séchées dans 250ml d\'eau chaude, 2-3 fois par jour. Inhalation possible.',
      contraindications: 'Éviter chez les enfants de moins de 6 ans. Prudence en cas d\'asthme.',
      products: [
        {
          name: 'Eucalyptus Bio - Feuilles',
          price: '11,90€',
          description: 'Feuilles d\'eucalyptus bio pour tisane respiratoire',
          composition: 'Feuilles d\'Eucalyptus globulus bio 100%'
        }
      ]
    },
    {
      id: 'verge_or',
      name: 'Verge d\'Or',
      latinName: 'Solidago virgaurea',
      emoji: '🌾',
      shortDescription: 'Plante anti-inflammatoire pour les voies respiratoires.',
      fullDescription: 'Plante vivace aux épis dorés de petites fleurs, la verge d\'or pousse dans les clairières et landes. Utilisée traditionnellement pour ses propriétés anti-inflammatoires et astringentes, elle soutient la santé des voies respiratoires et urinaires. Ses sommités fleuries concentrent des flavonoïdes et saponines.',
      mainBenefits: [
        'Anti-inflammatoire respiratoire',
        'Propriétés astringentes',
        'Soutient les voies urinaires',
        'Aide contre les allergies saisonnières'
      ],
      usage: 'Infusion : 1 cuillère à soupe de sommités fleuries dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter en cas d\'allergie aux Astéracées. Prudence pendant la grossesse.',
      products: [
        {
          name: 'Verge d\'Or Bio - Sommités',
          price: '16,90€',
          description: 'Sommités fleuries de verge d\'or bio pour tisane',
          composition: 'Sommités fleuries de Solidago virgaurea bio 100%'
        }
      ]
    },
    {
      id: 'mauve',
      name: 'Mauve',
      latinName: 'Malva sylvestris',
      emoji: '🌸',
      shortDescription: 'Fleurs et feuilles émollientes pour la gorge.',
      fullDescription: 'Plante bisannuelle aux fleurs roses veinées de violet, la mauve développe ses feuilles rondes palmées dans les décombres et chemins. Riche en mucilages, elle adoucit et protège les muqueuses irritées de la gorge et des voies respiratoires. Ses propriétés émollientes en font un remède de choix pour les toux sèches.',
      mainBenefits: [
        'Adoucit la gorge irritée',
        'Émollient des voies respiratoires',
        'Calme la toux sèche',
        'Protège les muqueuses'
      ],
      usage: 'Infusion : 1 cuillère à soupe de fleurs et feuilles dans 250ml d\'eau chaude, 3-4 fois par jour.',
      contraindications: 'Aucune connue aux doses recommandées.',
      products: [
        {
          name: 'Mauve Bio - Fleurs et Feuilles',
          price: '14,90€',
          description: 'Fleurs et feuilles de mauve bio pour tisane adoucissante',
          composition: 'Fleurs et feuilles de Malva sylvestris bio 100%'
        }
      ]
    },
    {
      id: 'guimauve',
      name: 'Guimauve',
      latinName: 'Althaea officinalis',
      emoji: '🌸',
      shortDescription: 'Racine ultra-émolliente pour la gorge et les bronches.',
      fullDescription: 'Plante des terrains humides aux fleurs blanc rosé, la guimauve développe ses racines charnues exceptionnellement riches en mucilages. Ces substances forment un gel protecteur qui enveloppe et apaise les muqueuses irritées. Utilisée depuis l\'Antiquité, elle constitue l\'un des meilleurs émollients naturels.',
      mainBenefits: [
        'Émollient exceptionnel',
        'Protège les muqueuses',
        'Calme la toux irritative',
        'Très riche en mucilages'
      ],
      usage: 'Décoction : 1 cuillère à soupe de racine dans 250ml d\'eau froide, macérer 2h puis porter à ébullition.',
      contraindications: 'Peut retarder l\'absorption d\'autres médicaments. Espacer les prises.',
      products: [
        {
          name: 'Guimauve Bio - Racine',
          price: '19,90€',
          description: 'Racine de guimauve bio en fragments',
          composition: 'Racine d\'Althaea officinalis bio 100%'
        }
      ]
    },
    {
      id: 'pin-sylvestre',
      name: 'Pin Sylvestre',
      latinName: 'Pinus sylvestris',
      emoji: '🌲',
      shortDescription: 'Bourgeons balsamiques pour les voies respiratoires.',
      fullDescription: 'Grand conifère des forêts nordiques, le pin sylvestre développe ses jeunes pousses et bourgeons riches en résines balsamiques. Ces substances aromatiques aux propriétés expectorantes aident à dégager les voies respiratoires encombrées. L\'inhalation de leur vapeur est particulièrement efficace.',
      mainBenefits: [
        'Expectorant naturel',
        'Dégage les voies respiratoires',
        'Propriétés balsamiques',
        'Antiseptique respiratoire'
      ],
      usage: 'Inhalation : 1 cuillère à soupe de bourgeons dans 500ml d\'eau chaude. Infusion : 1 cuillère à café dans 250ml d\'eau.',
      contraindications: 'Éviter en cas d\'allergie aux résineux. Prudence chez l\'asthmatique.',
      products: [
        {
          name: 'Pin Sylvestre Bio - Bourgeons',
          price: '18,90€',
          description: 'Bourgeons de pin sylvestre bio pour inhalation',
          composition: 'Bourgeons de Pinus sylvestris bio 100%'
        }
      ]
    },
    {
      id: 'serpolet',
      name: 'Serpolet',
      latinName: 'Thymus serpyllum',
      emoji: '🌿',
      shortDescription: 'Thym sauvage expectorant pour les voies respiratoires.',
      fullDescription: 'Petit thym sauvage des pelouses sèches et rocailles, le serpolet forme des tapis aromatiques aux fleurs roses ou blanches. Plus doux que le thym cultivé, il possède des propriétés expectorantes et antiseptiques remarquables. Ses sommités fleuries concentrent des huiles essentielles qui dégagent les voies respiratoires.',
      mainBenefits: [
        'Expectorant naturel',
        'Antiseptique respiratoire',
        'Dégage les bronches',
        'Plus doux que le thym'
      ],
      usage: 'Infusion : 1 cuillère à soupe de sommités fleuries dans 250ml d\'eau chaude, 3 fois par jour.',
      contraindications: 'Aucune connue aux doses recommandées.',
      products: [
        {
          name: 'Serpolet Bio - Sommités',
          price: '13,90€',
          description: 'Sommités fleuries de serpolet bio pour tisane respiratoire',
          composition: 'Sommités fleuries de Thymus serpyllum bio 100%'
        }
      ]
    },
    {
      id: 'origan',
      name: 'Origan',
      latinName: 'Origanum vulgare',
      emoji: '🌿',
      shortDescription: 'Plante aromatique antiseptique pour les voies respiratoires.',
      fullDescription: 'Plante vivace des coteaux ensoleillés aux fleurs roses en épis, l\'origan développe ses feuilles aromatiques riches en huiles essentielles. Traditionnellement utilisé pour ses propriétés antiseptiques et expectorantes, il aide à dégager les voies respiratoires et soutient les défenses naturelles.',
      mainBenefits: [
        'Antiseptique naturel puissant',
        'Expectorant pour les bronches',
        'Stimule les défenses naturelles',
        'Propriétés antioxydantes'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter pendant la grossesse. Modération en cas d\'hypertension.',
      products: [
        {
          name: 'Origan Bio - Feuilles',
          price: '11,90€',
          description: 'Feuilles d\'origan bio pour tisane antiseptique',
          composition: 'Feuilles d\'Origanum vulgare bio 100%'
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
      shortDescription: 'Plante rafraîchissante qui favorise la digestion.',
      fullDescription: 'Hybride naturel entre menthe aquatique et menthe verte, la menthe poivrée développe ses feuilles dentelées d\'un vert profond. Cultivée depuis des siècles dans les jardins monastiques, elle déploie un parfum mentholé intense et rafraîchissant. Ses feuilles concentrent du menthol naturel, principe actif qui apaise les spasmes digestifs et rafraîchit l\'haleine. En infusion après les repas, elle accompagne naturellement le confort digestif.',
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
    },
    {
      id: 'fenouil',
      name: 'Fenouil Doux',
      latinName: 'Foeniculum vulgare',
      emoji: '🌾',
      shortDescription: 'Graines carminatives qui soulagent les ballonnements.',
      fullDescription: 'Originaire du bassin méditerranéen, le fenouil développe ses ombelles dorées et ses graines striées au parfum anisé caractéristique. Utilisées traditionnellement pour leurs vertus digestives, ces graines riches en anéthol apaisent les spasmes intestinaux et favorisent l\'élimination des gaz. Leur saveur douce et sucrée en fait un remède apprécié pour toute la famille.',
      mainBenefits: [
        'Soulage les ballonnements',
        'Action carminative naturelle',
        'Apaise les spasmes digestifs',
        'Favorise la digestion'
      ],
      usage: 'Infusion : 1 cuillère à café de graines écrasées dans 250ml d\'eau bouillante, après les repas.',
      contraindications: 'Éviter les doses élevées chez la femme enceinte. Déconseillé en cas d\'allergie aux Apiacées.',
      products: [
        {
          name: 'Graines de Fenouil Bio',
          price: '8,90€',
          description: 'Graines de fenouil doux bio pour tisane digestive',
          composition: 'Graines de Foeniculum vulgare bio 100%'
        }
      ]
    },
    {
      id: 'camomille',
      name: 'Camomille Matricaire',
      latinName: 'Matricaria chamomilla',
      emoji: '🌼',
      shortDescription: 'Fleurs apaisantes pour la digestion et l\'inflammation.',
      fullDescription: 'Petite plante annuelle aux capitules blancs et jaunes, la camomille matricaire exhale un parfum fruité et miellé. Utilisée depuis l\'Antiquité, elle contient des flavonoïdes et de l\'azulène qui lui confèrent ses propriétés anti-inflammatoires. Douce et bien tolérée, elle apaise les troubles digestifs et calme les irritations.',
      mainBenefits: [
        'Anti-inflammatoire digestif',
        'Apaise les crampes d\'estomac',
        'Favorise la détente',
        'Calme les irritations'
      ],
      usage: 'Infusion : 1 cuillère à soupe de fleurs dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter en cas d\'allergie aux Astéracées. Prudence chez les personnes allergiques aux pollens.',
      products: [
        {
          name: 'Camomille Matricaire Bio',
          price: '12,50€',
          description: 'Fleurs de camomille matricaire bio pour tisane digestive',
          composition: 'Fleurs de Matricaria chamomilla bio 100%'
        }
      ]
    },
    {
      id: 'aigremoine',
      name: 'Aigremoine',
      latinName: 'Agrimonia eupatoria',
      emoji: '🌾',
      shortDescription: 'Plante astringente pour les troubles digestifs et inflammations.',
      fullDescription: 'Plante vivace aux épis dorés de petites fleurs jaunes, l\'aigremoine développe ses feuilles pennées le long des chemins ensoleillés. Utilisée depuis l\'Antiquité pour ses propriétés astringentes et anti-inflammatoires, elle apaise naturellement les muqueuses digestives irritées. Ses tanins lui confèrent une action régulatrice sur le transit.',
      mainBenefits: [
        'Apaise les muqueuses digestives',
        'Propriétés astringentes douces',
        'Anti-inflammatoire intestinal',
        'Régule le transit'
      ],
      usage: 'Infusion : 1-2 cuillères à café de sommités fleuries dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter en cas de constipation chronique. Usage modéré recommandé.',
      products: [
        {
          name: 'Aigremoine Bio - Sommités',
          price: '13,90€',
          description: 'Sommités fleuries d\'aigremoine bio pour tisane digestive',
          composition: 'Sommités fleuries d\'Agrimonia eupatoria bio 100%'
        }
      ]
    },
    {
      id: 'graines_lin',
      name: 'Graines de Lin',
      latinName: 'Linum usitatissimum',
      emoji: '🌰',
      shortDescription: 'Graines riches en oméga-3 et fibres pour la digestion.',
      fullDescription: 'Cultivé depuis des millénaires, le lin développe ses graines brunes luisantes riches en acides gras essentiels. Particulièrement riches en oméga-3 végétaux et en lignanes, ces graines soutiennent naturellement la santé cardiovasculaire et intestinale. Leurs mucilages favorisent le confort digestif et l\'élimination.',
      mainBenefits: [
        'Très riches en oméga-3 végétaux',
        'Favorisent le transit intestinal',
        'Propriétés anti-inflammatoires',
        'Soutiennent la santé cardiaque'
      ],
      usage: 'Consommer 1-2 cuillères à soupe de graines moulues par jour, avec beaucoup d\'eau.',
      contraindications: 'Boire suffisamment d\'eau. Éviter en cas d\'obstruction intestinale.',
      products: [
        {
          name: 'Graines de Lin Bio',
          price: '8,90€',
          description: 'Graines de lin bio brunes, source d\'oméga-3',
          composition: 'Graines de Linum usitatissimum bio 100%'
        }
      ]
    },
    {
      id: 'graines_chia',
      name: 'Graines de Chia',
      latinName: 'Salvia hispanica',
      emoji: '⚫',
      shortDescription: 'Supergraines aztèques riches en protéines et oméga-3.',
      fullDescription: 'Cultivées par les Aztèques comme "graine de force", les graines de chia concentrent une richesse nutritionnelle exceptionnelle. Riches en protéines complètes, oméga-3, calcium et fibres, elles forment un gel naturel au contact de l\'eau. Leur capacité d\'hydratation et leur profil nutritionnel en font un superaliment de référence.',
      mainBenefits: [
        'Protéines complètes végétales',
        'Très riches en oméga-3',
        'Effet satiétogène naturel',
        'Régulent la glycémie'
      ],
      usage: 'Laisser gonfler 1-2 cuillères à soupe dans un liquide 15 minutes avant consommation.',
      contraindications: 'Commencer par de petites quantités. Boire suffisamment.',
      products: [
        {
          name: 'Graines de Chia Bio',
          price: '12,90€',
          description: 'Graines de chia bio du Mexique, superaliment complet',
          composition: 'Graines de Salvia hispanica bio 100%'
        }
      ]
    },
    {
      id: 'fenugrec',
      name: 'Fenugrec',
      latinName: 'Trigonella foenum-graecum',
      emoji: '🌾',
      shortDescription: 'Graines amères tonifiantes pour la digestion et la lactation.',
      fullDescription: 'Légumineuse méditerranéenne aux gousses renfermant des graines anguleuses d\'un brun doré, le fenugrec exhale un parfum caractéristique légèrement épicé. Utilisé depuis l\'Antiquité, il soutient naturellement la digestion et favorise la lactation. Ses graines riches en saponines et mucilages apaisent les inflammations digestives.',
      mainBenefits: [
        'Stimule l\'appétit et la digestion',
        'Favorise la lactation naturelle',
        'Anti-inflammatoire digestif',
        'Régule la glycémie'
      ],
      usage: 'Décoction : 1 cuillère à café de graines dans 250ml d\'eau, faire bouillir 5 minutes, 2-3 fois par jour.',
      contraindications: 'Éviter pendant la grossesse (sauf fin d\'allaitement). Prudence en cas de diabète.',
      products: [
        {
          name: 'Fenugrec Bio - Graines',
          price: '9,90€',
          description: 'Graines de fenugrec bio pour décoction tonifiante',
          composition: 'Graines de Trigonella foenum-graecum bio 100%'
        }
      ]
    },
    {
      id: 'livèche',
      name: 'Livèche',
      latinName: 'Levisticum officinale',
      emoji: '🌿',
      shortDescription: 'Plante digestive au goût de céleri pour stimuler l\'appétit.',
      fullDescription: 'Grande ombellifère aux feuilles découpées et au parfum intense de céleri, la livèche développe ses ombelles jaunâtres dans les jardins monastiques. Utilisée traditionnellement pour stimuler l\'appétit et favoriser la digestion, elle concentre des huiles essentielles carminatives dans ses feuilles et graines.',
      mainBenefits: [
        'Stimule l\'appétit',
        'Favorise la digestion',
        'Propriétés carminatives',
        'Diurétique doux'
      ],
      usage: 'Infusion : 1 cuillère à café de feuilles séchées dans 250ml d\'eau chaude, avant les repas.',
      contraindications: 'Éviter pendant la grossesse. Prudence en cas de problèmes rénaux.',
      products: [
        {
          name: 'Livèche Bio - Feuilles',
          price: '14,90€',
          description: 'Feuilles de livèche bio pour tisane digestive',
          composition: 'Feuilles de Levisticum officinale bio 100%'
        }
      ]
    },
    {
      id: 'anis_vert',
      name: 'Anis Vert',
      latinName: 'Pimpinella anisum',
      emoji: '⭐',
      shortDescription: 'Graines parfumées pour les troubles digestifs et l\'allaitement.',
      fullDescription: 'Plante annuelle aux ombelles délicates et aux graines striées au parfum anisé, l\'anis vert développe ses propriétés carminatives dans le bassin méditerranéen. Utilisé depuis l\'Antiquité pour ses vertus digestives, il apaise les spasmes intestinaux et favorise l\'allaitement.',
      mainBenefits: [
        'Soulage les ballonnements',
        'Propriétés antispasmodiques',
        'Favorise l\'allaitement',
        'Rafraîchit l\'haleine'
      ],
      usage: 'Infusion : 1 cuillère à café de graines dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Éviter en cas d\'allergie aux Apiacées. Prudence chez les enfants.',
      products: [
        {
          name: 'Anis Vert Bio - Graines',
          price: '12,90€',
          description: 'Graines d\'anis vert bio pour tisane digestive',
          composition: 'Graines de Pimpinella anisum bio 100%'
        }
      ]
    },
    {
      id: 'kombu',
      name: 'Kombu',
      latinName: 'Saccharina japonica',
      emoji: '🟤',
      shortDescription: 'Algue brune pour la digestion et la reminéralisation.',
      fullDescription: 'Grande algue brune des mers froides aux longues lamelles, le Kombu forme de véritables forêts sous-marines. Utilisé traditionnellement en cuisine asiatique, il facilite la digestion des légumineuses grâce à ses enzymes naturelles. Très riche en iode et minéraux marins.',
      mainBenefits: [
        'Facilite la digestion des légumineuses',
        'Très riche en iode et minéraux',
        'Propriétés détoxifiantes',
        'Soutient le métabolisme'
      ],
      usage: 'Ajouter un morceau lors de la cuisson des légumineuses, ou en bouillon.',
      contraindications: 'Éviter en cas d\'hyperthyroïdie. Surveiller l\'apport en iode.',
      products: [
        {
          name: 'Kombu Bio - Lanières',
          price: '18,90€',
          description: 'Algue kombu bio des mers du Japon en lanières',
          composition: 'Saccharina japonica bio 100%'
        }
      ]
    },
    {
      id: 'cresson',
      name: 'Cresson',
      latinName: 'Nasturtium officinale',
      emoji: '🌿',
      shortDescription: 'Plante aquatique piquante riche en vitamines.',
      fullDescription: 'Plante aquatique aux feuilles composées et au goût piquant caractéristique, le cresson pousse dans les sources d\'eau pure. Très riche en vitamines C, K et minéraux, il stimule l\'appétit et favorise la digestion. Ses propriétés dépuratives en font un excellent détoxifiant de printemps.',
      mainBenefits: [
        'Très riche en vitamines et minéraux',
        'Stimule l\'appétit',
        'Propriétés détoxifiantes',
        'Aide la digestion'
      ],
      usage: 'Consommer frais en salade ou en jus, 50-100g par jour.',
      contraindications: 'Éviter en cas d\'ulcères gastriques. Bien laver avant consommation.',
      products: [
        {
          name: 'Cresson Bio - Feuilles',
          price: '11,90€',
          description: 'Feuilles de cresson bio séchées',
          composition: 'Feuilles de Nasturtium officinale bio 100%'
        }
      ]
    },
    {
      id: 'pourpier',
      name: 'Pourpier',
      latinName: 'Portulaca oleracea',
      emoji: '🌱',
      shortDescription: 'Plante grasse comestible riche en oméga-3.',
      fullDescription: 'Plante grasse annuelle aux feuilles charnues et brillantes, le pourpier pousse spontanément dans les jardins et terrains cultivés. Exceptionnellement riche en oméga-3 végétaux, vitamines et minéraux, il constitue un légume-feuille nutritif. Sa saveur légèrement acidulée rafraîchit les salades.',
      mainBenefits: [
        'Très riche en oméga-3 végétaux',
        'Source de vitamines A, C, E',
        'Rafraîchissant et digestible',
        'Propriétés antioxydantes'
      ],
      usage: 'Consommer frais en salade, 50-100g par jour.',
      contraindications: 'Éviter en cas de calculs rénaux (riche en oxalates).',
      products: [
        {
          name: 'Pourpier Bio - Graines',
          price: '8,90€',
          description: 'Graines de pourpier bio pour culture et consommation',
          composition: 'Graines de Portulaca oleracea bio 100%'
        }
      ]
    },
    {
      id: 'cumin',
      name: 'Cumin',
      latinName: 'Cuminum cyminum',
      emoji: '🌾',
      shortDescription: 'Graines épicées qui facilitent la digestion.',
      fullDescription: 'Plante aromatique aux graines striées et au parfum épicé caractéristique, le cumin développe ses ombelles dans les régions chaudes. Utilisé depuis l\'Antiquité pour ses vertus digestives, il stimule la sécrétion des sucs gastriques et soulage les ballonnements. Ses graines concentrent des huiles essentielles carminatives.',
      mainBenefits: [
        'Stimule la digestion',
        'Soulage les ballonnements',
        'Propriétés carminatives',
        'Antispasmodique digestif'
      ],
      usage: 'Infusion : 1 cuillère à café de graines dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Éviter en cas d\'allergie aux Apiacées. Prudence pendant la grossesse.',
      products: [
        {
          name: 'Cumin Bio - Graines',
          price: '9,90€',
          description: 'Graines de cumin bio pour tisane digestive',
          composition: 'Graines de Cuminum cyminum bio 100%'
        }
      ]
    },
    {
      id: 'fumeterre',
      name: 'Fumeterre',
      latinName: 'Fumaria officinalis',
      emoji: '🌿',
      shortDescription: 'Plante dépurative pour le foie et la digestion.',
      fullDescription: 'Plante annuelle aux feuilles finement découpées et aux fleurs roses en épis, la fumeterre pousse dans les terres cultivées. Traditionnellement utilisée pour ses propriétés dépuratives, elle soutient la fonction hépatique et facilite la digestion. Ses parties aériennes concentrent des alcaloïdes qui stimulent la bile.',
      mainBenefits: [
        'Dépurative hépatique',
        'Stimule la production de bile',
        'Facilite la digestion des graisses',
        'Propriétés détoxifiantes'
      ],
      usage: 'Infusion : 1 cuillère à soupe de parties aériennes dans 250ml d\'eau chaude, 2 fois par jour.',
      contraindications: 'Éviter pendant la grossesse. Ne pas utiliser en continu plus de 6 semaines.',
      products: [
        {
          name: 'Fumeterre Bio - Parties Aériennes',
          price: '14,90€',
          description: 'Parties aériennes de fumeterre bio pour tisane dépurative',
          composition: 'Parties aériennes de Fumaria officinalis bio 100%'
        }
      ]
    },
    {
      id: 'gingembre',
      name: 'Gingembre',
      latinName: 'Zingiber officinale',
      emoji: '🫚',
      shortDescription: 'Rhizome réchauffant qui stimule la digestion.',
      fullDescription: 'Originaire d\'Asie tropicale, le gingembre développe son rhizome charnu sous ses hautes tiges aux feuilles lancéolées. Utilisé depuis des millénaires en médecine traditionnelle, il réchauffe l\'organisme et stimule puissamment la digestion. Ses composés piquants, les gingérols, lui confèrent ses propriétés digestives, anti-nauséeuses et réchauffantes.',
      mainBenefits: [
        'Stimule puissamment la digestion',
        'Anti-nauséeux naturel',
        'Réchauffe l\'organisme',
        'Soulage les ballonnements'
      ],
      usage: 'Infusion : 1 cuillère à café de rhizome râpé frais ou séché dans 250ml d\'eau chaude.',
      contraindications: 'Éviter en cas d\'ulcères gastriques. Prudence avec les anticoagulants.',
      products: [
        {
          name: 'Gingembre Bio - Rhizome',
          price: '11,90€',
          description: 'Rhizome de gingembre bio séché pour infusion',
          composition: 'Rhizome de Zingiber officinale bio 100%'
        }
      ]
    },
    {
      id: 'artichaut',
      name: 'Artichaut',
      latinName: 'Cynara scolymus',
      emoji: '🌿',
      shortDescription: 'Feuilles cholérétiques pour la digestion des graisses.',
      fullDescription: 'Plante méditerranéenne aux grandes feuilles découpées et aux capitules charnus, l\'artichaut développe des feuilles riches en cynarine. Cette substance amère stimule la production de bile et facilite la digestion des graisses. Ses propriétés hépatiques et digestives en font un allié précieux après les repas copieux.',
      mainBenefits: [
        'Stimule la production de bile',
        'Facilite la digestion des graisses',
        'Protège le foie',
        'Propriétés détoxifiantes'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Éviter en cas d\'obstruction des voies biliaires.',
      products: [
        {
          name: 'Artichaut Bio - Feuilles',
          price: '16,90€',
          description: 'Feuilles d\'artichaut bio pour tisane digestive',
          composition: 'Feuilles de Cynara scolymus bio 100%'
        }
      ]
    },
    {
      id: 'cannelle',
      name: 'Cannelle',
      latinName: 'Cinnamomum verum',
      emoji: '🟤',
      shortDescription: 'Écorce réchauffante qui stimule la digestion.',
      fullDescription: 'Écorce du cannelier de Ceylan, la vraie cannelle développe son parfum délicat et sa saveur chaude caractéristique. Récoltée sur les jeunes pousses, elle se roule naturellement en tubes dorés. Ses propriétés réchauffantes et carminatives en font une épice digestive précieuse, particulièrement après les repas riches.',
      mainBenefits: [
        'Réchauffe l\'organisme',
        'Stimule la digestion',
        'Propriétés carminatives',
        'Régule la glycémie'
      ],
      usage: 'Infusion : 1 bâton de cannelle dans 250ml d\'eau chaude, 10 minutes. Ou 1/2 cuillère à café de poudre.',
      contraindications: 'Éviter en cas d\'ulcères. Modération pendant la grossesse.',
      products: [
        {
          name: 'Cannelle Bio - Bâtons',
          price: '12,90€',
          description: 'Bâtons de cannelle de Ceylan bio',
          composition: 'Écorce de Cinnamomum verum bio 100%'
        }
      ]
    },
    {
      id: 'cardamome',
      name: 'Cardamome',
      latinName: 'Elettaria cardamomum',
      emoji: '🟢',
      shortDescription: 'Épice aromatique qui facilite la digestion.',
      fullDescription: 'Originaire des forêts tropicales d\'Inde, la cardamome développe ses gousses vertes renfermant des graines noires aromatiques. Surnommée "reine des épices", elle possède un parfum complexe citronné et camphré. Ses propriétés carminatives et digestives en font un remède traditionnel contre les troubles digestifs.',
      mainBenefits: [
        'Facilite la digestion',
        'Propriétés carminatives',
        'Rafraîchit l\'haleine',
        'Stimule l\'appétit'
      ],
      usage: 'Infusion : 3-4 gousses écrasées dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Éviter en cas de calculs biliaires.',
      products: [
        {
          name: 'Cardamome Bio - Gousses',
          price: '24,90€',
          description: 'Gousses de cardamome verte bio',
          composition: 'Gousses d\'Elettaria cardamomum bio 100%'
        }
      ]
    },
    {
      id: 'graines-tournesol',
      name: 'Graines de Tournesol',
      latinName: 'Helianthus annuus',
      emoji: '🌻',
      shortDescription: 'Graines riches en vitamine E et magnésium.',
      fullDescription: 'Graines du tournesol aux capitules géants qui suivent la course du soleil, elles concentrent des nutriments essentiels. Riches en vitamine E, magnésium et acides gras insaturés, elles soutiennent le système nerveux et favorisent la récupération. Leur goût doux et leur croquant en font un en-cas nutritif apprécié.',
      mainBenefits: [
        'Riches en vitamine E antioxydante',
        'Source de magnésium',
        'Bonnes graisses insaturées',
        'Soutiennent le système nerveux'
      ],
      usage: 'Consommer 30g par jour (2 cuillères à soupe), nature ou dans les salades.',
      contraindications: 'Modération en cas d\'allergie aux graines.',
      products: [
        {
          name: 'Graines de Tournesol Bio',
          price: '8,90€',
          description: 'Graines de tournesol bio décortiquées',
          composition: 'Graines d\'Helianthus annuus bio 100%'
        }
      ]
    },
    {
      id: 'graines-citrouille',
      name: 'Graines de Citrouille',
      latinName: 'Cucurbita pepo',
      emoji: '🎃',
      shortDescription: 'Graines riches en zinc et magnésium.',
      fullDescription: 'Graines plates et vertes extraites des courges et citrouilles, elles concentrent des minéraux essentiels. Particulièrement riches en zinc, magnésium et fer, elles soutiennent l\'immunité et l\'équilibre hormonal masculin. Traditionnellement utilisées pour leurs propriétés vermifuges douces.',
      mainBenefits: [
        'Très riches en zinc',
        'Soutiennent l\'immunité',
        'Équilibre hormonal masculin',
        'Propriétés vermifuges douces'
      ],
      usage: 'Consommer 30g par jour (2 cuillères à soupe), nature ou légèrement grillées.',
      contraindications: 'Aucune connue aux doses alimentaires.',
      products: [
        {
          name: 'Graines de Citrouille Bio',
          price: '12,90€',
          description: 'Graines de citrouille bio décortiquées',
          composition: 'Graines de Cucurbita pepo bio 100%'
        }
      ]
    },
    {
      id: 'graines-sesame',
      name: 'Graines de Sésame',
      latinName: 'Sesamum indicum',
      emoji: '🌰',
      shortDescription: 'Graines riches en calcium et bonnes graisses.',
      fullDescription: 'Petites graines oléagineuses issues des capsules du sésame, elles concentrent une richesse nutritionnelle remarquable. Exceptionnellement riches en calcium biodisponible, magnésium et lignanes, elles soutiennent la santé osseuse et l\'équilibre hormonal. Leur saveur de noisette enrichit de nombreux plats.',
      mainBenefits: [
        'Très riches en calcium',
        'Soutiennent la santé osseuse',
        'Riches en bonnes graisses',
        'Contiennent des lignanes'
      ],
      usage: 'Consommer 20g par jour (1 cuillère à soupe), de préférence légèrement grillées.',
      contraindications: 'Éviter en cas d\'allergie aux graines oléagineuses.',
      products: [
        {
          name: 'Graines de Sésame Bio',
          price: '9,90€',
          description: 'Graines de sésame bio complet',
          composition: 'Graines de Sesamum indicum bio 100%'
        }
      ]
    },
    {
      id: 'coriandre',
      name: 'Coriandre',
      latinName: 'Coriandrum sativum',
      emoji: '🌿',
      shortDescription: 'Graines aromatiques qui facilitent la digestion.',
      fullDescription: 'Plante annuelle aux feuilles découpées et aux ombelles blanches, la coriandre développe ses graines rondes au parfum citronné et épicé. Utilisée dans les cuisines du monde entier, elle possède des propriétés carminatives et digestives remarquables. Ses graines aident à éliminer les gaz et stimulent l\'appétit.',
      mainBenefits: [
        'Facilite la digestion',
        'Propriétés carminatives',
        'Stimule l\'appétit',
        'Rafraîchit l\'haleine'
      ],
      usage: 'Infusion : 1 cuillère à café de graines dans 250ml d\'eau chaude, après les repas.',
      contraindications: 'Éviter en cas d\'allergie aux Apiacées.',
      products: [
        {
          name: 'Coriandre Bio - Graines',
          price: '8,90€',
          description: 'Graines de coriandre bio pour tisane digestive',
          composition: 'Graines de Coriandrum sativum bio 100%'
        }
      ]
    },
    {
      id: 'clou-girofle',
      name: 'Clou de Girofle',
      latinName: 'Syzygium aromaticum',
      emoji: '🌸',
      shortDescription: 'Boutons floraux antiseptiques et digestifs.',
      fullDescription: 'Boutons floraux du giroflier tropical récoltés avant éclosion, les clous de girofle concentrent une puissante huile essentielle. Riches en eugénol, ils possèdent des propriétés antiseptiques, anesthésiantes et digestives remarquables. Traditionnellement utilisés pour soulager les maux de dents et stimuler la digestion.',
      mainBenefits: [
        'Antiseptique puissant',
        'Stimule la digestion',
        'Propriétés anesthésiantes',
        'Réchauffe l\'organisme'
      ],
      usage: 'Infusion : 2-3 clous dans 250ml d\'eau chaude, 10 minutes. Ou mâcher 1 clou après les repas.',
      contraindications: 'Éviter pendant la grossesse. Utiliser avec modération.',
      products: [
        {
          name: 'Clou de Girofle Bio',
          price: '15,90€',
          description: 'Boutons floraux de giroflier bio',
          composition: 'Boutons de Syzygium aromaticum bio 100%'
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
      shortDescription: 'Épice dorée aux propriétés anti-inflammatoires naturelles.',
      fullDescription: 'Cultivé dans les terres chaudes d\'Asie, le curcuma développe ses rhizomes d\'un orange éclatant sous de larges feuilles tropicales. Utilisé depuis des millénaires en médecine ayurvédique, il exhale un parfum terreux et épicé caractéristique. Sa couleur dorée provient de la curcumine, principe actif reconnu pour ses propriétés anti-inflammatoires. Associé au poivre noir, il révèle pleinement ses bienfaits pour le confort articulaire.',
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
    },
    {
      id: 'cassis',
      name: 'Cassis',
      latinName: 'Ribes nigrum',
      emoji: '🍇',
      shortDescription: 'Feuilles et baies pour les articulations et la circulation.',
      fullDescription: 'Arbuste des jardins et forêts, le cassis développe ses feuilles aromatiques et ses grappes de baies noires. Les feuilles, riches en flavonoïdes, possèdent des propriétés anti-inflammatoires naturelles particulièrement appréciées pour le confort articulaire. Les baies concentrent des anthocyanes qui soutiennent la circulation sanguine.',
      mainBenefits: [
        'Anti-inflammatoire articulaire',
        'Soutient la circulation',
        'Riche en antioxydants',
        'Favorise la mobilité'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles séchées dans 250ml d\'eau bouillante, 2-3 fois par jour.',
      contraindications: 'Aucune contre-indication majeure connue. Prudence en cas de traitement anticoagulant.',
      products: [
        {
          name: 'Feuilles de Cassis Bio',
          price: '15,90€',
          description: 'Feuilles de cassis bio pour tisane articulaire',
          composition: 'Feuilles de Ribes nigrum bio 100%'
        }
      ]
    },
    {
      id: 'reine_des_pres',
      name: 'Reine-des-Prés',
      latinName: 'Filipendula ulmaria',
      emoji: '🌸',
      shortDescription: 'Fleurs anti-inflammatoires naturelles pour les articulations.',
      fullDescription: 'Plante des prairies humides, la reine-des-prés développe ses panaches de fleurs blanc crème au parfum d\'amande amère. Surnommée "l\'aspirine végétale", elle contient naturellement des dérivés salicylés qui lui confèrent ses propriétés anti-inflammatoires. Traditionnellement utilisée pour soulager les douleurs articulaires et musculaires.',
      mainBenefits: [
        'Anti-inflammatoire naturel',
        'Soulage les douleurs articulaires',
        'Action analgésique douce',
        'Favorise l\'élimination des toxines'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de fleurs dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter en cas d\'allergie à l\'aspirine. Déconseillé aux enfants de moins de 16 ans.',
      products: [
        {
          name: 'Reine-des-Prés Bio',
          price: '16,90€',
          description: 'Fleurs de reine-des-prés bio pour infusion articulaire',
          composition: 'Fleurs de Filipendula ulmaria bio 100%'
        }
      ]
    },
    {
      id: 'achillee_millefeuille',
      name: 'Achillée Millefeuille',
      latinName: 'Achillea millefolium',
      emoji: '🌸',
      shortDescription: 'Plante cicatrisante et anti-inflammatoire aux mille vertus.',
      fullDescription: 'Commune dans les prairies et chemins, l\'achillée développe ses feuilles finement découpées "aux mille feuilles" et ses corymbes de fleurs blanches ou rosées. Utilisée depuis l\'Antiquité pour ses propriétés vulnéraires, elle possède des vertus anti-inflammatoires et circulatoires remarquables. Ses principes actifs favorisent la cicatrisation et apaisent les inflammations.',
      mainBenefits: [
        'Anti-inflammatoire puissant',
        'Favorise la cicatrisation',
        'Améliore la circulation',
        'Propriétés antispasmodiques'
      ],
      usage: 'Infusion : 1-2 cuillères à café de sommités fleuries dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter pendant la grossesse. Déconseillé aux personnes allergiques aux Astéracées.',
      products: [
        {
          name: 'Achillée Millefeuille Bio',
          price: '14,90€',
          description: 'Sommités fleuries d\'achillée millefeuille bio pour tisane',
          composition: 'Sommités fleuries d\'Achillea millefolium bio 100%'
        }
      ]
    },
    {
      id: 'saule-blanc',
      name: 'Saule Blanc',
      latinName: 'Salix alba',
      emoji: '🌳',
      shortDescription: 'Écorce antalgique et anti-inflammatoire.',
      fullDescription: 'L\'écorce de saule blanc contient de la salicine, précurseur naturel de l\'acide salicylique. Utilisée depuis l\'Antiquité pour soulager la douleur et l\'inflammation, elle constitue un antalgique naturel efficace pour les articulations douloureuses et les maux de dos.',
      mainBenefits: [
        'Antalgique naturel',
        'Anti-inflammatoire',
        'Soulage les maux de dos',
        'Aide pour les rhumatismes'
      ],
      usage: 'Décoction : 1 cuillère à soupe d\'écorce dans 250ml d\'eau, bouillir 10 min.',
      contraindications: 'Éviter en cas d\'allergie aux salicylés, grossesse, allaitement.',
      products: [
        {
          name: 'Saule Blanc Bio - Écorce',
          price: '18,90€',
          description: 'Écorce de saule blanc bio en fragments',
          composition: 'Écorce de Salix alba bio 100%'
        }
      ]
    },
    {
      id: 'harpagophyton',
      name: 'Harpagophyton',
      latinName: 'Harpagophytum procumbens',
      emoji: '🌿',
      shortDescription: 'Griffe du diable pour l\'inconfort articulaire.',
      fullDescription: 'Plante du désert du Kalahari aux racines secondaires tubérisées, l\'harpagophyton est surnommé "griffe du diable" en raison de ses fruits crochus. Ses racines concentrent des harpagosides aux propriétés anti-inflammatoires reconnues pour soulager l\'inconfort articulaire et favoriser la mobilité.',
      mainBenefits: [
        'Anti-inflammatoire reconnu',
        'Soulage l\'inconfort articulaire',
        'Favorise la mobilité',
        'Action sur les rhumatismes'
      ],
      usage: 'Décoction : 1 cuillère à café de racine dans 250ml d\'eau, bouillir 15 min.',
      contraindications: 'Éviter en cas d\'ulcères, grossesse, allaitement, calculs biliaires.',
      products: [
        {
          name: 'Harpagophyton Bio - Racine',
          price: '22,90€',
          description: 'Racines d\'harpagophyton bio en poudre',
          composition: 'Racines de Harpagophytum procumbens bio 100%'
        }
      ]
    },
    {
      id: 'prele',
      name: 'Prêle',
      latinName: 'Equisetum arvense',
      emoji: '🌿',
      shortDescription: 'Source de silice pour renforcer les articulations.',
      fullDescription: 'Plante primitive aux tiges creuses et articulées, la prêle des champs concentre exceptionnellement la silice minérale. Cet élément essentiel participe à la formation et au maintien du cartilage, des os et des tissus conjonctifs. Elle reminéralise et renforce la structure articulaire.',
      mainBenefits: [
        'Très riche en silice biodisponible',
        'Renforce le cartilage',
        'Reminéralise les os',
        'Soutient les tissus conjonctifs'
      ],
      usage: 'Décoction : 1 cuillère à soupe de tiges dans 250ml d\'eau, bouillir 15 min.',
      contraindications: 'Éviter en cas d\'insuffisance rénale ou cardiaque.',
      products: [
        {
          name: 'Prêle Bio - Tiges',
          price: '13,90€',
          description: 'Tiges de prêle des champs bio',
          composition: 'Tiges d\'Equisetum arvense bio 100%'
        }
      ]
    },
    {
      id: 'bambou-tabashir',
      name: 'Bambou Tabashir',
      latinName: 'Bambusa arundinacea',
      emoji: '🎋',
      shortDescription: 'Exsudat de bambou ultra-riche en silice.',
      fullDescription: 'Le tabashir est l\'exsudat blanc cristallin qui se forme naturellement dans les entre-nœuds du bambou. Cette substance précieuse concentre jusqu\'à 70% de silice organique hautement biodisponible. Elle constitue la source végétale la plus riche en silice pour renforcer cartilages, os et articulations.',
      mainBenefits: [
        'Source la plus riche en silice végétale',
        'Renforce le cartilage articulaire',
        'Soutient la structure osseuse',
        'Améliore la flexibilité'
      ],
      usage: 'Poudre : 1/2 cuillère à café dans un verre d\'eau, 1 fois par jour.',
      contraindications: 'Aucune connue aux doses recommandées.',
      products: [
        {
          name: 'Bambou Tabashir Bio - Poudre',
          price: '28,90€',
          description: 'Exsudat de bambou bio ultra-concentré en silice',
          composition: 'Exsudat de Bambusa arundinacea bio 100%'
        }
      ]
    }
  ],
  coeur: [
    {
      id: 'aubepine',
      name: 'Aubépine',
      latinName: 'Crataegus monogyna',
      emoji: '🌸',
      shortDescription: 'Fleurs et feuilles pour le cœur et la circulation.',
      fullDescription: 'Arbuste épineux des haies et lisières, l\'aubépine développe ses grappes de fleurs blanches au parfum délicat et ses feuilles découpées. Utilisée traditionnellement pour soutenir la fonction cardiaque, elle contient des flavonoïdes et des oligomères procyanidiques qui accompagnent naturellement la circulation et régulent le rythme cardiaque.',
      mainBenefits: [
        'Soutient la fonction cardiaque',
        'Régule le rythme cardiaque',
        'Favorise la circulation',
        'Apaise les palpitations'
      ],
      usage: 'Infusion : 1 cuillère à soupe de fleurs et feuilles dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Interactions possibles avec les médicaments cardiaques. Consulter un professionnel de santé.',
      products: [
        {
          name: 'Aubépine Bio - Sommités',
          price: '17,90€',
          description: 'Fleurs et feuilles d\'aubépine bio pour tisane cardiaque',
          composition: 'Sommités fleuries de Crataegus monogyna bio 100%'
        }
      ]
    },
    {
      id: 'tilleul',
      name: 'Tilleul',
      latinName: 'Tilia cordata',
      emoji: '🌿',
      shortDescription: 'Fleurs apaisantes pour le cœur et le système nerveux.',
      fullDescription: 'Grand arbre des parcs et avenues, le tilleul offre ses fleurs jaunâtres au parfum miellé et délicat. Utilisées depuis des siècles pour leurs vertus calmantes, ces fleurs riches en mucilages et flavonoïdes apaisent les tensions nerveuses et accompagnent l\'équilibre cardiovasculaire. Leur douceur en fait une tisane appréciée de toute la famille.',
      mainBenefits: [
        'Apaise le système nerveux',
        'Soutient l\'équilibre cardiovasculaire',
        'Favorise la détente',
        'Calme les tensions'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de fleurs dans 250ml d\'eau chaude, le soir de préférence.',
      contraindications: 'Aucune contre-indication majeure connue. Usage familial traditionnel.',
      products: [
        {
          name: 'Fleurs de Tilleul Bio',
          price: '14,90€',
          description: 'Fleurs de tilleul bio pour tisane apaisante',
          composition: 'Fleurs de Tilia cordata bio 100%'
        }
      ]
    },
    {
      id: 'trefle_rouge',
      name: 'Trèfle Rouge',
      latinName: 'Trifolium pratense',
      emoji: '🌺',
      shortDescription: 'Fleurs riches en isoflavones pour l\'équilibre hormonal.',
      fullDescription: 'Commune dans les prairies, cette légumineuse développe ses capitules rose-pourpre caractéristiques et ses feuilles trifoliées. Utilisée traditionnellement pour ses vertus équilibrantes, elle contient des isoflavones naturelles qui soutiennent l\'équilibre hormonal féminin. Ses fleurs possèdent également des propriétés circulatoires bénéfiques.',
      mainBenefits: [
        'Équilibre hormonal naturel',
        'Riche en isoflavones',
        'Soutient la circulation',
        'Propriétés anti-inflammatoires'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de fleurs séchées dans 250ml d\'eau chaude, 2 fois par jour.',
      contraindications: 'Éviter en cas de cancer hormono-dépendant. Déconseillé pendant la grossesse.',
      products: [
        {
          name: 'Trèfle Rouge Bio - Fleurs',
          price: '16,90€',
          description: 'Fleurs de trèfle rouge bio pour tisane équilibrante',
          composition: 'Fleurs de Trifolium pratense bio 100%'
        }
      ]
    },
    {
      id: 'framboisier',
      name: 'Feuilles de Framboisier',
      latinName: 'Rubus idaeus',
      emoji: '🍃',
      shortDescription: 'Feuilles tonifiantes pour l\'équilibre féminin et la circulation.',
      fullDescription: 'Arbuste épineux des sous-bois, le framboisier développe ses feuilles composées d\'un vert tendre aux propriétés remarquables. Utilisées traditionnellement par les femmes européennes, ces feuilles riches en tanins et minéraux tonifient naturellement l\'utérus et soutiennent l\'équilibre hormonal féminin. Leur richesse en fer et magnésium en fait un allié précieux.',
      mainBenefits: [
        'Tonifie l\'utérus naturellement',
        'Soutient l\'équilibre féminin',
        'Riche en minéraux essentiels',
        'Propriétés astringentes douces'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de feuilles séchées dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Éviter au premier trimestre de grossesse. Consulter en cas de traitement hormonal.',
      products: [
        {
          name: 'Framboisier Bio - Feuilles',
          price: '13,90€',
          description: 'Feuilles de framboisier bio pour tisane féminine',
          composition: 'Feuilles de Rubus idaeus bio 100%'
        }
      ]
    },
    {
      id: 'ail-des-ours',
      name: 'Ail des Ours',
      latinName: 'Allium ursinum',
      emoji: '🌿',
      shortDescription: 'Plante sauvage purifiante pour la circulation.',
      fullDescription: 'Plante sauvage des sous-bois humides aux larges feuilles vert brillant et aux ombelles de fleurs blanches étoilées, l\'ail des ours exhale un parfum d\'ail caractéristique. Ses feuilles concentrent des composés soufrés similaires à l\'ail cultivé mais plus doux. Traditionnellement utilisé pour purifier le sang et soutenir la circulation.',
      mainBenefits: [
        'Purifie le sang naturellement',
        'Soutient la circulation sanguine',
        'Propriétés détoxifiantes',
        'Riche en composés soufrés'
      ],
      usage: 'Consommer 10-15 feuilles fraîches par jour en salade ou en pesto. Séché : 1 cuillère à café en infusion.',
      contraindications: 'Éviter en cas d\'allergie à l\'ail. Prudence avec les anticoagulants.',
      products: [
        {
          name: 'Ail des Ours Bio - Feuilles',
          price: '18,90€',
          description: 'Feuilles d\'ail des ours bio séchées',
          composition: 'Feuilles d\'Allium ursinum bio 100%'
        }
      ]
    },
    {
      id: 'olivier',
      name: 'Olivier (Feuilles)',
      latinName: 'Olea europaea',
      emoji: '🌿',
      shortDescription: 'Feuilles pour la tension artérielle et la circulation.',
      fullDescription: 'Arbre millénaire du bassin méditerranéen, l\'olivier développe ses feuilles argentées persistantes aux propriétés cardiovasculaires reconnues. Riches en oleuropéine, elles soutiennent naturellement l\'équilibre tensionnel et favorisent une bonne circulation. Leur action antioxydante protège également le système cardiovasculaire.',
      mainBenefits: [
        'Soutient l\'équilibre tensionnel',
        'Favorise la circulation',
        'Propriétés antioxydantes',
        'Protège le système cardiovasculaire'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, 2 fois par jour.',
      contraindications: 'Surveillance en cas de traitement antihypertenseur.',
      products: [
        {
          name: 'Olivier Bio - Feuilles',
          price: '17,90€',
          description: 'Feuilles d\'olivier bio pour tisane circulatoire',
          composition: 'Feuilles d\'Olea europaea bio 100%'
        }
      ]
    },
    {
      id: 'ail-des-ours',
      name: 'Ail des Ours',
      latinName: 'Allium ursinum',
      emoji: '🌿',
      shortDescription: 'Plante sauvage circulatoire et dépurative.',
      fullDescription: 'Plante sauvage des sous-bois humides, l\'ail des ours développe ses larges feuilles et ses ombelles de fleurs blanches au parfum d\'ail caractéristique. Riche en composés soufrés, il favorise la circulation sanguine et soutient la fonction cardiaque. Ses propriétés dépuratives en font un excellent allié détox de printemps.',
      mainBenefits: [
        'Favorise la circulation sanguine',
        'Soutient la fonction cardiaque',
        'Propriétés dépuratives',
        'Riche en composés soufrés'
      ],
      usage: 'Consommer frais en salade, ou séché : 1 cuillère à café dans 250ml d\'eau chaude.',
      contraindications: 'Éviter en cas de traitement anticoagulant. Modération recommandée.',
      products: [
        {
          name: 'Ail des Ours Bio - Feuilles',
          price: '16,90€',
          description: 'Feuilles d\'ail des ours bio séchées',
          composition: 'Feuilles d\'Allium ursinum bio 100%'
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
      shortDescription: 'Succulente apaisante aux vertus hydratantes et réparatrices.',
      fullDescription: 'Originaire des régions arides, l\'Aloe vera développe ses rosettes charnues aux feuilles épaisses bordées d\'épines dorées. Utilisée depuis l\'Antiquité par les civilisations méditerranéennes, elle recèle un gel transparent et rafraîchissant au parfum délicat. Riche en polysaccharides, vitamines et acides aminés, ce gel naturel apaise instantanément les irritations, hydrate en profondeur et favorise la régénération cutanée.',
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
    },
    {
      id: 'plantain',
      name: 'Plantain',
      latinName: 'Plantago major',
      emoji: '🌿',
      shortDescription: 'Plante cicatrisante commune aux propriétés apaisantes.',
      fullDescription: 'Présent sur tous les chemins et pelouses, le plantain développe ses feuilles nervurées en rosette et ses épis floraux discrets. Surnommé "herbe aux charpentiers", il possède des propriétés cicatrisantes et anti-inflammatoires exceptionnelles. Ses feuilles riches en mucilages et en tanins apaisent instantanément les irritations cutanées.',
      mainBenefits: [
        'Cicatrisant naturel puissant',
        'Apaise les irritations cutanées',
        'Anti-inflammatoire local',
        'Calme les piqûres d\'insectes'
      ],
      usage: 'Usage externe : appliquer les feuilles fraîches écrasées directement sur la peau. En infusion : 1 cuillère à soupe de feuilles séchées dans 250ml d\'eau chaude.',
      contraindications: 'Aucune contre-indication majeure connue. Test cutané recommandé avant première utilisation.',
      products: [
        {
          name: 'Plantain Bio - Feuilles',
          price: '12,90€',
          description: 'Feuilles de plantain bio séchées pour usage externe et tisane',
          composition: 'Feuilles de Plantago major bio 100%'
        }
      ]
    },
    {
      id: 'bourrache',
      name: 'Bourrache',
      latinName: 'Borago officinalis',
      emoji: '💙',
      shortDescription: 'Fleurs bleues anti-inflammatoires pour la peau sensible.',
      fullDescription: 'Plante annuelle aux tiges velues et aux magnifiques fleurs étoilées d\'un bleu intense, la bourrache exhale un parfum de concombre frais. Ses fleurs et feuilles sont riches en mucilages et en acides gras essentiels qui apaisent les inflammations cutanées. Traditionnellement utilisée pour adoucir et régénérer la peau sensible.',
      mainBenefits: [
        'Apaise les peaux sensibles',
        'Anti-inflammatoire cutané',
        'Régénère les tissus',
        'Riche en oméga-6 naturels'
      ],
      usage: 'Infusion : 1 cuillère à soupe de fleurs et feuilles dans 250ml d\'eau chaude pour compresses. Huile de graines en application externe.',
      contraindications: 'Éviter l\'usage interne prolongé. Usage externe préférable.',
      products: [
        {
          name: 'Bourrache Bio - Fleurs et Feuilles',
          price: '17,90€',
          description: 'Fleurs et feuilles de bourrache bio pour usage externe',
          composition: 'Fleurs et feuilles de Borago officinalis bio 100%'
        }
      ]
    },
    {
      id: 'souci_calendula',
      name: 'Souci - Calendula',
      latinName: 'Calendula officinalis',
      emoji: '🌼',
      shortDescription: 'Fleurs cicatrisantes dorées pour les soins cutanés.',
      fullDescription: 'Cultivé dans les jardins depuis des siècles, le souci développe ses capitules d\'un orange éclatant aux pétales soyeux. Reconnu universellement pour ses propriétés cicatrisantes exceptionnelles, il contient des saponines et des flavonoïdes qui favorisent la régénération cutanée. Ses fleurs sont particulièrement appréciées pour apaiser les peaux irritées et abîmées.',
      mainBenefits: [
        'Cicatrisant puissant',
        'Apaise les irritations cutanées',
        'Favorise la régénération',
        'Anti-inflammatoire cutané'
      ],
      usage: 'Infusion pour compresses : 2 cuillères à soupe de fleurs dans 250ml d\'eau chaude. Macérât huileux en application directe.',
      contraindications: 'Éviter en cas d\'allergie aux Astéracées. Test cutané recommandé.',
      products: [
        {
          name: 'Calendula Bio - Fleurs',
          price: '16,90€',
          description: 'Pétales de calendula bio pour soins cutanés',
          composition: 'Fleurs de Calendula officinalis bio 100%'
        }
      ]
    },
    {
      id: 'arnica',
      name: 'Arnica',
      latinName: 'Arnica montana',
      emoji: '🌻',
      shortDescription: 'Fleurs des montagnes pour les traumatismes et contusions.',
      fullDescription: 'Plante des prairies d\'altitude aux capitules jaune vif, l\'arnica développe ses fleurs rayonnantes dans les terres acides des montagnes. Reconnue universellement pour ses propriétés anti-inflammatoires et antalgiques, elle est le remède de référence des traumatismes cutanés. Ses fleurs concentrent des lactones qui réduisent l\'inflammation et accélèrent la guérison.',
      mainBenefits: [
        'Anti-inflammatoire puissant',
        'Soulage les contusions',
        'Accélère la guérison',
        'Antalgique local'
      ],
      usage: 'Usage externe uniquement : teinture diluée, pommade ou gel. Compresses avec infusion refroidie.',
      contraindications: 'Usage externe exclusivement. Éviter sur plaies ouvertes. Test cutané recommandé.',
      products: [
        {
          name: 'Arnica Bio - Fleurs',
          price: '19,90€',
          description: 'Fleurs d\'arnica montana bio pour usage externe',
          composition: 'Fleurs d\'Arnica montana bio 100%'
        }
      ]
    },
    {
      id: 'consoude',
      name: 'Consoude',
      latinName: 'Symphytum officinale',
      emoji: '🌿',
      shortDescription: 'Racine et feuilles cicatrisantes "qui ressoudent les os".',
      fullDescription: 'Plante vivace aux feuilles rugueuses et aux fleurs en clochettes, la consoude développe ses racines charnues riches en allantoïne. Surnommée "herbe qui ressoudent les os", elle possède des propriétés cicatrisantes et régénérantes exceptionnelles. Traditionnellement utilisée pour accélérer la guérison des plaies et contusions.',
      mainBenefits: [
        'Cicatrisant exceptionnel',
        'Favorise la régénération tissulaire',
        'Apaise les inflammations',
        'Riche en allantoïne naturelle'
      ],
      usage: 'Usage externe uniquement : cataplasme de feuilles fraîches, pommade ou compresses d\'infusion.',
      contraindications: 'Usage externe exclusivement. Éviter sur plaies profondes. Ne pas ingérer.',
      products: [
        {
          name: 'Consoude Bio - Feuilles',
          price: '16,90€',
          description: 'Feuilles de consoude bio pour usage externe cicatrisant',
          composition: 'Feuilles de Symphytum officinale bio 100%'
        }
      ]
    },
    {
      id: 'ortie-peau',
      name: 'Ortie (Peau)',
      latinName: 'Urtica dioica',
      emoji: '🌿',
      shortDescription: 'Feuilles purifiantes pour les problèmes cutanés.',
      fullDescription: 'Les feuilles d\'ortie concentrent des minéraux, vitamines et flavonoïdes qui purifient la peau de l\'intérieur. Leur action détoxifiante aide à clarifier le teint et à apaiser les problèmes cutanés liés aux impuretés. Riche en silice, elle renforce également la structure de la peau.',
      mainBenefits: [
        'Purifie la peau de l\'intérieur',
        'Clarifie le teint',
        'Riche en minéraux et vitamines',
        'Renforce la structure cutanée'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Aucune connue aux doses recommandées.',
      products: [
        {
          name: 'Ortie Bio - Feuilles',
          price: '12,90€',
          description: 'Feuilles d\'ortie bio pour tisane purifiante',
          composition: 'Feuilles d\'Urtica dioica bio 100%'
        }
      ]
    },
    {
      id: 'pensee-sauvage',
      name: 'Pensée Sauvage',
      latinName: 'Viola tricolor',
      emoji: '🌸',
      shortDescription: 'Fleurs dépuratives pour les problèmes de peau.',
      fullDescription: 'Petite plante aux fleurs tricolores violettes, jaunes et blanches, la pensée sauvage pousse dans les champs et jardins. Traditionnellement utilisée pour ses propriétés dépuratives cutanées, elle aide à traiter l\'eczéma, l\'acné et les dermatoses. Ses flavonoïdes et mucilages apaisent les inflammations.',
      mainBenefits: [
        'Dépurative cutanée',
        'Aide contre l\'eczéma et l\'acné',
        'Anti-inflammatoire cutané',
        'Apaise les dermatoses'
      ],
      usage: 'Infusion : 1 cuillère à soupe de plante entière dans 250ml d\'eau chaude, 2-3 fois par jour.',
      contraindications: 'Aucune connue aux doses recommandées.',
      products: [
        {
          name: 'Pensée Sauvage Bio - Plante',
          price: '15,90€',
          description: 'Plante entière de pensée sauvage bio',
          composition: 'Viola tricolor bio 100%'
        }
      ]
    },
    {
      id: 'bardane',
      name: 'Bardane',
      latinName: 'Arctium lappa',
      emoji: '🌿',
      shortDescription: 'Racine dépurative pour les peaux à problèmes.',
      fullDescription: 'Grande plante bisannuelle aux larges feuilles et aux capitules crochus, la bardane développe ses racines charnues riches en inuline. Reconnue pour ses propriétés dépuratives, elle aide à purifier l\'organisme et améliore l\'aspect des peaux à problèmes. Ses polyènes et lignanes soutiennent la détoxification.',
      mainBenefits: [
        'Puissante dépurative',
        'Améliore les peaux à problèmes',
        'Détoxifie l\'organisme',
        'Riche en inuline prébiotique'
      ],
      usage: 'Décoction : 1 cuillère à soupe de racine dans 250ml d\'eau, bouillir 10 min.',
      contraindications: 'Éviter pendant la grossesse. Possible interaction avec les anticoagulants.',
      products: [
        {
          name: 'Bardane Bio - Racine',
          price: '17,90€',
          description: 'Racine de bardane bio en fragments',
          composition: 'Racine d\'Arctium lappa bio 100%'
        }
      ]
    },
    {
      id: 'camomille-romaine',
      name: 'Camomille Romaine',
      latinName: 'Chamaemelum nobile',
      emoji: '🌼',
      shortDescription: 'Fleurs apaisantes pour la peau sensible.',
      fullDescription: 'Petite plante vivace aux fleurs blanches à cœur jaune, la camomille romaine développe ses capitules parfumés dans les jardins. Plus douce que la camomille allemande, elle possède des propriétés calmantes et anti-inflammatoires exceptionnelles pour les peaux sensibles et irritées.',
      mainBenefits: [
        'Apaise les peaux sensibles',
        'Anti-inflammatoire doux',
        'Calme les irritations',
        'Parfum délicat et apaisant'
      ],
      usage: 'Infusion pour compresses : 2 cuillères à soupe de fleurs dans 250ml d\'eau chaude.',
      contraindications: 'Éviter en cas d\'allergie aux Astéracées.',
      products: [
        {
          name: 'Camomille Romaine Bio',
          price: '18,90€',
          description: 'Fleurs de camomille romaine bio pour soins cutanés',
          composition: 'Fleurs de Chamaemelum nobile bio 100%'
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
      shortDescription: 'Plante sédative douce qui favorise l\'endormissement naturel.',
      fullDescription: 'Cultivée dans les prairies humides d\'Europe, la valériane développe ses ombelles de fleurs rose pâle au sommet de tiges élancées. Ses racines noueuses, au parfum musqué caractéristique, sont utilisées traditionnellement pour leurs vertus apaisantes. Riches en acides valéréniques, elles accompagnent naturellement l\'endormissement et favorisent un sommeil réparateur, sans accoutumance.',
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
    },
    {
      id: 'melisse',
      name: 'Mélisse',
      latinName: 'Melissa officinalis',
      emoji: '🌿',
      shortDescription: 'Feuilles citronnées apaisantes pour le stress et le sommeil.',
      fullDescription: 'Cultivée avec soin et cueillie à pleine maturité, la mélisse déploie un parfum citronné et délicat, qui évoque les jardins anciens et les soirs d\'été calmes. Reconnue depuis des siècles par les herboristes pour ses vertus apaisantes, elle accompagne les moments de repos et les fins de journée. Infusez quelques feuilles dans une eau frémissante, et laissez le temps faire son œuvre.',
      mainBenefits: [
        'Apaise le stress et l\'anxiété',
        'Favorise l\'endormissement',
        'Calme les palpitations',
        'Action antispasmodique douce'
      ],
      usage: 'Infusion : 1-2 cuillères à soupe de feuilles fraîches ou séchées dans 250ml d\'eau chaude, le soir.',
      contraindications: 'Aucune contre-indication majeure. Éviter les doses élevées en cas d\'hypothyroïdie.',
      products: [
        {
          name: 'Mélisse Bio - Tisane',
          price: '13,90€',
          description: 'Feuilles de mélisse bio pour tisane apaisante du soir',
          composition: 'Feuilles de Melissa officinalis bio 100%'
        }
      ]
    },
    {
      id: 'verveine',
      name: 'Verveine Odorante',
      latinName: 'Aloysia citrodora',
      emoji: '🍃',
      shortDescription: 'Plante antistress douce au parfum citronné relaxant.',
      fullDescription: 'Originaire d\'Amérique du Sud, la verveine odorante développe ses feuilles lancéolées au parfum citronné intense et rafraîchissant. Utilisée traditionnellement pour ses propriétés calmantes, elle apaise en douceur les tensions nerveuses et favorise la détente. Son arôme délicat en fait une tisane du soir particulièrement appréciée.',
      mainBenefits: [
        'Apaise les tensions nerveuses',
        'Favorise la relaxation',
        'Action antispasmodique',
        'Parfum citronné apaisant'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles dans 250ml d\'eau chaude, 30 minutes avant le coucher.',
      contraindications: 'Aucune contre-indication majeure connue. Usage modéré recommandé.',
      products: [
        {
          name: 'Verveine Odorante Bio',
          price: '14,50€',
          description: 'Feuilles de verveine odorante bio pour tisane relaxante',
          composition: 'Feuilles d\'Aloysia citrodora bio 100%'
        }
      ]
    },
    {
      id: 'passiflore',
      name: 'Passiflore',
      latinName: 'Passiflora incarnata',
      emoji: '🌸',
      shortDescription: 'Plante grimpante apaisante pour l\'anxiété et l\'insomnie.',
      fullDescription: 'Plante grimpante aux fleurs spectaculaires, la passiflore développe ses vrilles et ses feuilles lobées d\'un vert tendre. Utilisée traditionnellement par les peuples amérindiens, elle contient des flavonoïdes et alcaloïdes qui lui confèrent ses propriétés anxiolytiques naturelles. Particulièrement appréciée pour calmer l\'agitation mentale et favoriser un sommeil paisible.',
      mainBenefits: [
        'Apaise l\'anxiété naturellement',
        'Favorise l\'endormissement',
        'Calme l\'agitation mentale',
        'Réduit les tensions nerveuses'
      ],
      usage: 'Infusion : 1 cuillère à soupe de parties aériennes dans 250ml d\'eau chaude, 30 minutes avant le coucher.',
      contraindications: 'Éviter pendant la grossesse. Interactions possibles avec les sédatifs.',
      products: [
        {
          name: 'Passiflore Bio - Parties Aériennes',
          price: '19,90€',
          description: 'Parties aériennes de passiflore bio pour tisane calmante',
          composition: 'Parties aériennes de Passiflora incarnata bio 100%'
        }
      ]
    },
    {
      id: 'lavande',
      name: 'Lavande',
      latinName: 'Lavandula angustifolia',
      emoji: '💜',
      shortDescription: 'Fleurs parfumées relaxantes pour le sommeil et la détente.',
      fullDescription: 'Cultivée sur les plateaux ensoleillés de Provence, la lavande développe ses épis violets au parfum envoûtant et apaisant. Utilisée depuis l\'Antiquité, elle contient du linalol et de l\'acétate de linalyle qui lui confèrent ses propriétés relaxantes reconnues. Son parfum délicat transforme chaque tisane en moment de pure détente.',
      mainBenefits: [
        'Favorise la relaxation profonde',
        'Améliore la qualité du sommeil',
        'Apaise le système nerveux',
        'Parfum naturellement apaisant'
      ],
      usage: 'Infusion : 1 cuillère à café de fleurs dans 250ml d\'eau chaude, le soir. Ou en sachet sous l\'oreiller.',
      contraindications: 'Aucune contre-indication majeure. Éviter les doses élevées pendant la grossesse.',
      products: [
        {
          name: 'Fleurs de Lavande Bio',
          price: '15,90€',
          description: 'Fleurs de lavande bio de Provence pour tisane relaxante',
          composition: 'Fleurs de Lavandula angustifolia bio 100%'
        }
      ]
    },
    {
      id: 'houblon',
      name: 'Houblon',
      latinName: 'Humulus lupulus',
      emoji: '🌿',
      shortDescription: 'Cônes femelles sédatifs pour l\'insomnie et l\'agitation.',
      fullDescription: 'Plante grimpante vigoureuse des haies humides, le houblon développe ses cônes femelles verdâtres aux écailles papyracées. Traditionnellement utilisé en brasserie, il révèle aussi des propriétés sédatives remarquables. Ses cônes concentrent des lupulines riches en principes amers qui favorisent l\'endormissement et apaisent l\'agitation nerveuse.',
      mainBenefits: [
        'Propriétés sédatives naturelles',
        'Favorise l\'endormissement profond',
        'Apaise l\'agitation nerveuse',
        'Calme les insomnies'
      ],
      usage: 'Infusion : 1 cuillère à café de cônes dans 250ml d\'eau chaude, 1 heure avant le coucher.',
      contraindications: 'Éviter en cas de dépression. Interactions possibles avec les antidépresseurs.',
      products: [
        {
          name: 'Cônes de Houblon Bio',
          price: '16,90€',
          description: 'Cônes de houblon bio séchés pour tisane du soir',
          composition: 'Cônes de Humulus lupulus bio 100%'
        }
      ]
    }
  ],
  racines: [
    {
      id: 'gentiane',
      name: 'Gentiane',
      latinName: 'Gentiana lutea',
      emoji: '🌼',
      shortDescription: 'Racine amère digestive stimulante de l\'appétit.',
      fullDescription: 'Plante majestueuse des montagnes aux fleurs jaunes éclatantes, la gentiane développe sa racine pivotante pouvant atteindre 1 mètre de long. Cette racine d\'une amertume exceptionnelle est utilisée traditionnellement pour stimuler l\'appétit et la digestion. Ses principes amers, les sécoiridoïdes, réveillent naturellement les fonctions digestives paresseuses.',
      mainBenefits: [
        'Stimule puissamment l\'appétit',
        'Tonique digestif amer',
        'Favorise les sécrétions gastriques',
        'Aide à la convalescence'
      ],
      usage: 'Décoction : 1/2 cuillère à café de racine coupée dans 250ml d\'eau, bouillir 10 minutes. Prendre avant les repas.',
      contraindications: 'Éviter en cas d\'ulcères gastriques. Déconseillé aux femmes enceintes.',
      products: [
        {
          name: 'Gentiane Bio - Racines',
          price: '22,90€',
          description: 'Racines de gentiane jaune bio coupées pour décoction',
          composition: 'Racines de Gentiana lutea bio 100%'
        }
      ]
    },
    {
      id: 'angelique',
      name: 'Angélique',
      latinName: 'Angelica archangelica',
      emoji: '🌿',
      shortDescription: 'Racine aromatique digestive et expectorante.',
      fullDescription: 'Grande ombellifère des régions nordiques aux ombelles spectaculaires, l\'angélique développe sa racine charnue aux vertus remarquables. Appelée "herbe aux anges", elle possède des propriétés digestives, expectorantes et toniques. Son parfum intense et sa saveur chaude en font une racine appréciée en herboristerie traditionnelle.',
      mainBenefits: [
        'Stimule la digestion',
        'Expectorante naturelle',
        'Tonique général',
        'Propriétés antispasmodiques'
      ],
      usage: 'Décoction : 1 cuillère à café de racines dans 250ml d\'eau, bouillir 10 minutes, 2-3 fois par jour.',
      contraindications: 'Photosensibilisante. Éviter l\'exposition au soleil. Déconseillé pendant la grossesse.',
      products: [
        {
          name: 'Angélique Bio - Racines',
          price: '18,90€',
          description: 'Racines d\'angélique bio pour décoction digestive',
          composition: 'Racines d\'Angelica archangelica bio 100%'
        }
      ]
    },
    {
      id: 'reglisse',
      name: 'Réglisse',
      latinName: 'Glycyrrhiza glabra',
      emoji: '🌿',
      shortDescription: 'Racine sucrée adoucissante pour la gorge et la digestion.',
      fullDescription: 'Légumineuse des régions méditerranéennes, la réglisse développe ses racines stolonifères au goût sucré caractéristique. Utilisée depuis l\'Antiquité, elle contient de la glycyrrhizine qui lui confère ses propriétés adoucissantes et anti-inflammatoires. Particulièrement appréciée pour apaiser la gorge et soutenir la digestion.',
      mainBenefits: [
        'Adoucit la gorge irritée',
        'Anti-inflammatoire naturel',
        'Favorise la digestion',
        'Goût naturellement sucré'
      ],
      usage: 'Décoction : 1 cuillère à soupe de racines dans 250ml d\'eau, bouillir 15 minutes, 2-3 fois par jour.',
      contraindications: 'Éviter en cas d\'hypertension. Déconseillé pendant la grossesse. Usage modéré.',
      products: [
        {
          name: 'Réglisse Bio - Bâtons',
          price: '13,90€',
          description: 'Bâtons de racine de réglisse bio à mâcher ou en décoction',
          composition: 'Racines de Glycyrrhiza glabra bio 100%'
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
      shortDescription: 'Fleur pourpre immunostimulante des prairies d\'Amérique.',
      fullDescription: 'Originaire des Grandes Plaines d\'Amérique du Nord, l\'échinacée développe ses capitules pourpres aux pétales rayonnants autour d\'un cœur bombé et épineux. Utilisée traditionnellement par les peuples amérindiens, cette plante aux feuilles rugueuses et aux racines charnues soutient naturellement les défenses de l\'organisme. Riche en polysaccharides et alkylamides, elle accompagne l\'immunité en période hivernale.',
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
    },
    {
      id: 'reishi',
      name: 'Reishi',
      latinName: 'Ganoderma lucidum',
      emoji: '🍄',
      shortDescription: 'Champignon de l\'immortalité pour l\'immunité et la longévité.',
      fullDescription: 'Vénéré en Asie sous le nom de "champignon de l\'immortalité", le reishi développe son chapeau laqué d\'un brun rougeâtre sur les troncs d\'arbres feuillus. Utilisé traditionnellement pour fortifier l\'organisme, il contient des bêta-glucanes et des triterpènes qui soutiennent naturellement l\'immunité. Sa saveur amère caractéristique révèle la richesse de ses principes actifs.',
      mainBenefits: [
        'Renforce l\'immunité naturelle',
        'Propriétés adaptogènes',
        'Soutient la vitalité',
        'Favorise la longévité'
      ],
      usage: 'Décoction : 3-5g de champignon séché dans 500ml d\'eau, mijoter 30 minutes.',
      contraindications: 'Aucune contre-indication majeure. Interactions possibles avec anticoagulants.',
      products: [
        {
          name: 'Reishi Bio - Tranches',
          price: '38,90€',
          description: 'Tranches de Reishi bio séchées pour décoction',
          composition: 'Ganoderma lucidum bio 100%'
        }
      ]
    },
    {
      id: 'ortie',
      name: 'Ortie',
      latinName: 'Urtica dioica',
      emoji: '🌿',
      shortDescription: 'Plante reminéralisante riche en fer et nutriments.',
      fullDescription: 'Commune dans les jardins et terrains vagues, l\'ortie développe ses feuilles dentelées d\'un vert soutenu, riches en minéraux essentiels. Malgré ses piquants, elle révèle après cuisson ou séchage des qualités nutritionnelles exceptionnelles. Particulièrement riche en fer, silice et vitamines, elle soutient naturellement la vitalité et renforce l\'organisme.',
      mainBenefits: [
        'Très reminéralisante',
        'Riche en fer naturel',
        'Soutient la vitalité',
        'Fortifie l\'organisme'
      ],
      usage: 'Infusion : 2 cuillères à soupe de feuilles séchées dans 250ml d\'eau bouillante, 2-3 fois par jour.',
      contraindications: 'Aucune contre-indication majeure. Récolter avec des gants pour éviter les piqûres.',
      products: [
        {
          name: 'Ortie Bio - Feuilles',
          price: '9,90€',
          description: 'Feuilles d\'ortie bio séchées, très reminéralisantes',
          composition: 'Feuilles d\'Urtica dioica bio 100%'
        }
      ]
    },
    {
      id: 'sauge_officinale',
      name: 'Sauge Officinale',
      latinName: 'Salvia officinalis',
      emoji: '🌿',
      shortDescription: 'Feuilles aromatiques régulatrices et antiseptiques.',
      fullDescription: 'Cultivée dans les jardins méditerranéens, la sauge officinale développe ses feuilles veloutées gris-vert au parfum camphré intense. Vénérée depuis l\'Antiquité - son nom dérive du latin "salvare" (sauver) - elle possède des propriétés antiseptiques et régulatrices remarquables. Ses feuilles concentrent des huiles essentielles et des tanins qui soutiennent l\'équilibre hormonal et purifient l\'organisme.',
      mainBenefits: [
        'Propriétés antiseptiques puissantes',
        'Soutient l\'équilibre hormonal',
        'Action régulatrice naturelle',
        'Purifie et tonifie'
      ],
      usage: 'Infusion : 1 cuillère à café de feuilles séchées dans 250ml d\'eau bouillante, 2 fois par jour.',
      contraindications: 'Éviter pendant la grossesse et l\'allaitement. Usage modéré recommandé.',
      products: [
        {
          name: 'Sauge Officinale Bio',
          price: '13,90€',
          description: 'Feuilles de sauge officinale bio pour tisane régulatrice',
          composition: 'Feuilles de Salvia officinalis bio 100%'
        }
      ]
    },
    {
      id: 'pissenlit',
      name: 'Pissenlit',
      latinName: 'Taraxacum officinale',
      emoji: '🌻',
      shortDescription: 'Plante détoxifiante qui soutient le foie et l\'élimination.',
      fullDescription: 'Commune dans les prairies et jardins, cette plante développe ses feuilles dentelées caractéristiques et ses fleurs d\'un jaune éclatant. Utilisée traditionnellement pour ses vertus dépuratives, elle soutient naturellement les fonctions hépatiques et rénales. Ses racines et feuilles concentrent des principes amers qui stimulent la digestion et favorisent l\'élimination des toxines.',
      mainBenefits: [
        'Détoxifie le foie naturellement',
        'Stimule l\'élimination rénale',
        'Propriétés dépuratives',
        'Soutient la digestion'
      ],
      usage: 'Infusion : 1 cuillère à soupe de feuilles ou racines séchées dans 250ml d\'eau bouillante, 2-3 fois par jour.',
      contraindications: 'Éviter en cas d\'obstruction des voies biliaires. Prudence en cas de calculs rénaux.',
      products: [
        {
          name: 'Pissenlit Bio - Racines et Feuilles',
          price: '11,90€',
          description: 'Mélange de racines et feuilles de pissenlit bio pour cure détox',
          composition: 'Racines et feuilles de Taraxacum officinale bio 100%'
        }
      ]
    },
    {
      id: 'chaga',
      name: 'Chaga',
      latinName: 'Inonotus obliquus',
      emoji: '🍄',
      shortDescription: 'Champignon antioxydant exceptionnel des forêts boréales.',
      fullDescription: 'Ce champignon parasite développe ses masses noires rugueuses sur les troncs de bouleaux des forêts nordiques. Vénéré par les peuples sibériens comme "roi des champignons", il concentre des antioxydants exceptionnels, particulièrement la mélanine et les bêta-glucanes. Sa richesse en composés bioactifs en fait un adaptogène puissant pour renforcer l\'immunité.',
      mainBenefits: [
        'Antioxydant exceptionnel',
        'Renforce l\'immunité profonde',
        'Propriétés adaptogènes',
        'Soutient la vitalité cellulaire'
      ],
      usage: 'Décoction : 5-10g de champignon séché dans 500ml d\'eau, mijoter 45 minutes.',
      contraindications: 'Interactions possibles avec anticoagulants. Éviter en cas de diabète sans suivi médical.',
      products: [
        {
          name: 'Chaga Bio - Morceaux',
          price: '42,90€',
          description: 'Morceaux de Chaga bio sauvage des forêts boréales',
          composition: 'Inonotus obliquus bio 100%'
        }
      ]
    },
    {
      id: 'pleurotes',
      name: 'Pleurotes',
      latinName: 'Pleurotus ostreatus',
      emoji: '🍄',
      shortDescription: 'Champignons en forme d\'huître riches en protéines.',
      fullDescription: 'Champignons saprophytes aux chapeaux en forme d\'huître, les pleurotes poussent en touffes sur les troncs d\'arbres feuillus. Riches en protéines complètes, vitamines B et polysaccharides immunostimulants, ils soutiennent naturellement les défenses de l\'organisme. Leur texture charnue et leur saveur douce en font des champignons très appréciés.',
      mainBenefits: [
        'Riches en protéines complètes',
        'Immunostimulants naturels',
        'Source de vitamines B',
        'Propriétés antioxydantes'
      ],
      usage: 'Consommer 100-200g frais en cuisine, ou 5-10g séchés en décoction.',
      contraindications: 'Aucune connue aux doses alimentaires.',
      products: [
        {
          name: 'Pleurotes Bio - Séchés',
          price: '16,90€',
          description: 'Champignons pleurotes bio séchés',
          composition: 'Pleurotus ostreatus bio 100%'
        }
      ]
    },
    {
      id: 'cordyceps-sinensis',
      name: 'Cordyceps Sinensis',
      latinName: 'Ophiocordyceps sinensis',
      emoji: '🍄',
      shortDescription: 'Champignon tibétain adaptogène pour l\'énergie et l\'endurance.',
      fullDescription: 'Champignon parasitaire des hauts plateaux tibétains, le cordyceps sinensis se développe sur les larves d\'insectes. Vénéré dans la médecine traditionnelle chinoise, il est réputé pour ses propriétés adaptogènes exceptionnelles. Riche en cordycépine et polysaccharides, il soutient l\'énergie vitale et l\'endurance physique.',
      mainBenefits: [
        'Adaptogène puissant',
        'Augmente l\'énergie vitale',
        'Améliore l\'endurance',
        'Soutient la fonction rénale'
      ],
      usage: 'Prendre 1-3g de poudre par jour ou 500mg d\'extrait, de préférence le matin.',
      contraindications: 'Éviter en cas de maladies auto-immunes. Prudence avec anticoagulants.',
      products: [
        {
          name: 'Cordyceps Sinensis Bio',
          price: '89,90€',
          description: 'Cordyceps sinensis bio en poudre, qualité premium',
          composition: 'Ophiocordyceps sinensis bio 100%'
        }
      ]
    },
    {
      id: 'bardane',
      name: 'Bardane',
      latinName: 'Arctium lappa',
      emoji: '🌿',
      shortDescription: 'Racine détoxifiante pour purifier la peau et l\'organisme.',
      fullDescription: 'Plante bisannuelle aux larges feuilles cordiformes, la bardane développe sa racine pivotante riche en principes actifs. Traditionnellement utilisée pour ses vertus dépuratives, elle soutient l\'élimination des toxines et purifie l\'organisme en profondeur. Ses racines concentrent des polyacétylènes et de l\'inuline qui favorisent la santé cutanée.',
      mainBenefits: [
        'Purifie l\'organisme en profondeur',
        'Soutient la santé de la peau',
        'Propriétés détoxifiantes',
        'Aide à l\'élimination des déchets'
      ],
      usage: 'Décoction : 1 cuillère à soupe de racines séchées dans 250ml d\'eau, faire bouillir 10 minutes, 2-3 fois par jour.',
      contraindications: 'Éviter pendant la grossesse et l\'allaitement. Prudence en cas de diabète.',
      products: [
        {
          name: 'Bardane Bio - Racines',
          price: '15,90€',
          description: 'Racines de bardane bio coupées pour décoction détox',
          composition: 'Racines d\'Arctium lappa bio 100%'
        }
      ]
    },
    {
      id: 'shiitake',
      name: 'Shiitaké',
      latinName: 'Lentinula edodes',
      emoji: '🍄',
      shortDescription: 'Champignon immunostimulant riche en lentinane.',
      fullDescription: 'Champignon des forêts d\'Asie au chapeau brun velouté, le shiitaké est cultivé traditionnellement sur des troncs de chêne. Reconnu pour ses propriétés immunostimulantes exceptionnelles, il contient du lentinane, un bêta-glucane qui renforce naturellement les défenses immunitaires. Sa richesse en vitamines B et en ergostérol en fait un champignon médicinal de premier plan.',
      mainBenefits: [
        'Stimule l\'immunité naturelle',
        'Riche en lentinane actif',
        'Propriétés antivirales',
        'Soutient la vitalité générale'
      ],
      usage: 'Consommer 5-15g de champignons séchés en décoction ou réhydratés, 3-4 fois par semaine.',
      contraindications: 'Aucune contre-indication majeure. Débuter par de petites quantités.',
      products: [
        {
          name: 'Shiitaké Bio - Séchés',
          price: '24,90€',
          description: 'Champignons shiitaké bio séchés pour décoction ou cuisine',
          composition: 'Lentinula edodes bio 100%'
        }
      ]
    },
    {
      id: 'maitake',
      name: 'Maitaké',
      latinName: 'Grifola frondosa',
      emoji: '🍄',
      shortDescription: 'Champignon adaptogène "dansant" pour l\'immunité et l\'énergie.',
      fullDescription: 'Surnommé "champignon dansant" au Japon, le maitaké développe ses chapeaux superposés en forme d\'éventail à la base des chênes. Reconnu pour ses propriétés immunomodulatrices exceptionnelles, il contient des bêta-glucanes spécifiques qui renforcent les défenses naturelles. Son action adaptogène soutient également l\'équilibre métabolique.',
      mainBenefits: [
        'Immunomodulateur puissant',
        'Propriétés adaptogènes',
        'Soutient l\'équilibre métabolique',
        'Riche en bêta-glucanes actifs'
      ],
      usage: 'Décoction : 5-10g de champignon séché dans 500ml d\'eau, mijoter 20-30 minutes.',
      contraindications: 'Interactions possibles avec traitements immunosuppresseurs. Éviter en cas d\'hypotension.',
      products: [
        {
          name: 'Maitaké Bio - Séchés',
          price: '34,90€',
          description: 'Champignons maitaké bio séchés pour décoction immunostimulante',
          composition: 'Grifola frondosa bio 100%'
        }
      ]
    },
    {
      id: 'nigelle',
      name: 'Nigelle',
      latinName: 'Nigella sativa',
      emoji: '⚫',
      shortDescription: 'Graines noires aux mille vertus pour l\'immunité.',
      fullDescription: 'Plante annuelle aux fleurs délicates bleu pâle, la nigelle développe ses capsules renfermant de petites graines noires triangulaires. Surnommée "habba sawda" dans la tradition arabe, elle est réputée "guérir tout sauf la mort". Riche en thymoquinone, elle soutient naturellement l\'immunité et possède des propriétés anti-inflammatoires remarquables.',
      mainBenefits: [
        'Renforce l\'immunité naturelle',
        'Anti-inflammatoire puissant',
        'Propriétés antioxydantes',
        'Soutient la digestion'
      ],
      usage: 'Consommer 1/2 cuillère à café de graines moulues par jour, avec du miel ou dans une tisane.',
      contraindications: 'Éviter pendant la grossesse. Interactions possibles avec anticoagulants.',
      products: [
        {
          name: 'Nigelle Bio - Graines',
          price: '12,90€',
          description: 'Graines de nigelle bio, "remède contre tout"',
          composition: 'Graines de Nigella sativa bio 100%'
        }
      ]
    },
    {
      id: 'spiruline',
      name: 'Spiruline',
      latinName: 'Arthrospira platensis',
      emoji: '🌀',
      shortDescription: 'Micro-algue riche en fer et protéines pour la vitalité mentale.',
      fullDescription: 'Cette micro-algue bleu-vert des eaux chaudes concentre une richesse nutritionnelle exceptionnelle. Particulièrement riche en fer biodisponible, protéines complètes et vitamines du groupe B, elle soutient naturellement l\'énergie mentale et combat la fatigue cognitive. Sa couleur intense révèle sa teneur en phycocyanine, puissant antioxydant.',
      mainBenefits: [
        'Très riche en fer assimilable',
        'Combat la fatigue mentale',
        'Protéines complètes végétales',
        'Antioxydants puissants'
      ],
      usage: 'Commencer par 1g par jour (1/2 cuillère à café), augmenter progressivement jusqu\'à 3-5g par jour.',
      contraindications: 'Éviter en cas de phénylcétonurie. Prudence en cas de maladies auto-immunes.',
      products: [
        {
          name: 'Spiruline Bio - Paillettes',
          price: '24,90€',
          description: 'Paillettes de spiruline bio, source naturelle de fer et protéines',
          composition: 'Spiruline (Arthrospira platensis) bio 100%'
        }
      ]
    },
    {
      id: 'chlorella',
      name: 'Chlorella',
      latinName: 'Chlorella vulgaris',
      emoji: '🟢',
      shortDescription: 'Micro-algue détoxifiante qui améliore la clarté mentale.',
      fullDescription: 'Micro-algue d\'eau douce à la couleur vert intense, la chlorella est reconnue pour ses propriétés détoxifiantes exceptionnelles. Sa richesse en chlorophylle et en facteur de croissance CGF favorise l\'élimination des métaux lourds et toxines, améliorant ainsi la clarté mentale à long terme. Elle soutient naturellement les fonctions hépatiques.',
      mainBenefits: [
        'Détoxification naturelle',
        'Améliore la clarté mentale',
        'Très riche en chlorophylle',
        'Soutient les fonctions hépatiques'
      ],
      usage: 'Commencer par 1g par jour, augmenter progressivement jusqu\'à 3-5g par jour avec beaucoup d\'eau.',
      contraindications: 'Réactions possibles en début de cure (détox). Commencer par de petites doses.',
      products: [
        {
          name: 'Chlorella Bio - Poudre',
          price: '28,90€',
          description: 'Poudre de chlorella bio pour cure détoxifiante',
          composition: 'Chlorella vulgaris bio 100%'
        }
      ]
    },
    {
      id: 'maca',
      name: 'Maca',
      latinName: 'Lepidium meyenii',
      emoji: '🥔',
      shortDescription: 'Racine adaptogène des Andes pour l\'énergie et la résistance au stress.',
      fullDescription: 'Cultivée sur les hauts plateaux des Andes péruviennes, la maca développe sa racine tubéreuse dans des conditions climatiques extrêmes. Cette "ginseng péruvien" est un adaptogène puissant qui renforce la résistance au stress mental et soutient l\'énergie cérébrale. Sa richesse en acides aminés et minéraux en fait un tonique global remarquable.',
      mainBenefits: [
        'Adaptogène puissant',
        'Renforce la résistance au stress',
        'Soutient l\'énergie cérébrale',
        'Tonique global naturel'
      ],
      usage: 'Commencer par 1 cuillère à café (3-5g) par jour, mélangée dans une boisson ou yaourt.',
      contraindications: 'Éviter en cas de troubles hormonaux sans avis médical. Commencer par de petites doses.',
      products: [
        {
          name: 'Maca Bio - Poudre',
          price: '22,90€',
          description: 'Poudre de racine de maca bio des Andes péruviennes',
          composition: 'Racine de Lepidium meyenii bio 100%'
        }
      ]
    },
    {
      id: 'baies_goji',
      name: 'Baies de Goji',
      latinName: 'Lycium barbarum',
      emoji: '🔴',
      shortDescription: 'Baies antioxydantes protectrices du système nerveux.',
      fullDescription: 'Originaires des vallées himalayennes, ces petites baies rouge orangé concentrent une richesse en antioxydants exceptionnelle. Particulièrement riches en zéaxanthine, vitamines et polysaccharides, elles protègent naturellement le système nerveux du stress oxydatif. Leur saveur douce légèrement acidulée en fait un superaliment apprécié.',
      mainBenefits: [
        'Antioxydants puissants',
        'Protègent le système nerveux',
        'Riches en vitamines naturelles',
        'Soutiennent la vision'
      ],
      usage: 'Consommer 10-20g par jour (1-2 cuillères à soupe), telles quelles ou réhydratées.',
      contraindications: 'Interactions possibles avec anticoagulants. Modération en cas de diabète.',
      products: [
        {
          name: 'Baies de Goji Bio',
          price: '18,90€',
          description: 'Baies de goji bio séchées, riches en antioxydants',
          composition: 'Baies de Lycium barbarum bio 100%'
        }
      ]
    },
    {
      id: 'wakame',
      name: 'Wakamé',
      latinName: 'Undaria pinnatifida',
      emoji: '🌊',
      shortDescription: 'Algue brune reminéralisante riche en iode.',
      fullDescription: 'Algue brune des côtes asiatiques aux frondes découpées, le wakamé est traditionnellement consommé dans la cuisine japonaise. Très riche en iode, calcium et magnésium, il soutient la fonction thyroïdienne et reminéralise l\'organisme. Sa texture tendre et sa saveur marine délicate en font une algue très appréciée.',
      mainBenefits: [
        'Très riche en iode naturel',
        'Reminéralise l\'organisme',
        'Soutient la thyroïde',
        'Source de calcium marin'
      ],
      usage: 'Réhydrater 10g d\'algue séchée dans l\'eau tiède 10 minutes, puis ajouter aux salades ou soupes.',
      contraindications: 'Éviter en cas d\'hyperthyroïdie. Surveiller l\'apport en iode.',
      products: [
        {
          name: 'Wakamé Bio - Algue',
          price: '21,90€',
          description: 'Algue wakamé bio séchée du Japon',
          composition: 'Undaria pinnatifida bio 100%'
        }
      ]
    },
    {
      id: 'mousse-irlande',
      name: 'Mousse d\'Irlande',
      latinName: 'Chondrus crispus',
      emoji: '🌿',
      shortDescription: 'Algue rouge gélatineuse reminéralisante.',
      fullDescription: 'Algue rouge des côtes atlantiques aux frondes cartillagineuses, la mousse d\'Irlande forme un gel naturel riche en carraghénanes. Exceptionnellement reminéralisante, elle apporte de nombreux oligo-éléments marins et soutient la vitalité générale. Traditionnellement utilisée pour ses propriétés nutritives.',
      mainBenefits: [
        'Reminéralisante exceptionnelle',
        'Riche en oligo-éléments marins',
        'Forme un gel naturel',
        'Soutient la vitalité'
      ],
      usage: 'Faire tremper 10g dans l\'eau froide 12h, puis faire bouillir 15 min pour obtenir un gel.',
      contraindications: 'Aucune connue aux doses alimentaires.',
      products: [
        {
          name: 'Mousse d\'Irlande Bio',
          price: '24,90€',
          description: 'Algue mousse d\'Irlande bio séchée',
          composition: 'Chondrus crispus bio 100%'
        }
      ]
    },
    {
      id: 'dulse',
      name: 'Dulse',
      latinName: 'Palmaria palmata',
      emoji: '🔴',
      shortDescription: 'Algue rouge croquante riche en protéines.',
      fullDescription: 'Algue rouge des mers froides aux frondes plates et charnues, la dulse se distingue par sa texture croquante et sa saveur iodée prononcée. Exceptionnellement riche en protéines végétales, fer et vitamines B12, elle constitue un superaliment marin complet. Peut se consommer crue ou légèrement grillée.',
      mainBenefits: [
        'Très riche en protéines végétales',
        'Source naturelle de B12',
        'Riche en fer assimilable',
        'Goût umami naturel'
      ],
      usage: 'Consommer 5-10g par jour, crue en paillettes sur les plats ou légèrement grillée.',
      contraindications: 'Modération en cas d\'hyperthyroïdie.',
      products: [
        {
          name: 'Dulse Bio - Paillettes',
          price: '19,90€',
          description: 'Algue dulse bio en paillettes',
          composition: 'Palmaria palmata bio 100%'
        }
      ]
    },
    {
      id: 'cynorrhodon',
      name: 'Cynorrhodon',
      latinName: 'Rosa canina',
      emoji: '🌹',
      shortDescription: 'Fruits de l\'églantier, très riches en vitamine C naturelle.',
      fullDescription: 'Fruits rouge vif de l\'églantier sauvage, les cynorrhodons développent leur richesse vitaminique après les premières gelées. Exceptionnellement riches en vitamine C naturelle (20 fois plus que l\'orange), ils soutiennent l\'oxygénation cérébrale et renforcent la résistance de l\'organisme. Leur saveur acidulée et fruitée est très appréciée.',
      mainBenefits: [
        'Très riche en vitamine C naturelle',
        'Soutient l\'oxygénation cérébrale',
        'Renforce l\'immunité',
        'Antioxydant puissant'
      ],
      usage: 'Infusion : 1 cuillère à soupe de fruits séchés dans 250ml d\'eau bouillante, infuser 10 minutes.',
      contraindications: 'Aucune contre-indication majeure. Bien filtrer pour éviter les graines irritantes.',
      products: [
        {
          name: 'Cynorrhodon Bio - Fruits',
          price: '16,90€',
          description: 'Fruits de cynorrhodon bio séchés, source de vitamine C',
          composition: 'Fruits de Rosa canina bio 100%'
        }
      ]
    },
    {
      id: 'graines_chanvre',
      name: 'Graines de Chanvre',
      latinName: 'Cannabis sativa',
      emoji: '🌱',
      shortDescription: 'Graines complètes riches en protéines et acides gras.',
      fullDescription: 'Issues du chanvre industriel, ces graines développent un profil nutritionnel exceptionnel sans aucun effet psychoactif. Parfaitement équilibrées en oméga-3 et oméga-6, elles apportent les 8 acides aminés essentiels. Leur goût de noisette et leur digestibilité remarquable en font un superaliment quotidien.',
      mainBenefits: [
        'Profil en acides aminés complet',
        'Équilibre parfait oméga-3/oméga-6',
        'Facilement digestibles',
        'Goût agréable de noisette'
      ],
      usage: 'Consommer 1-3 cuillères à soupe par jour, nature ou saupoudrées sur les plats.',
      contraindications: 'Aucune contre-indication majeure. Produit légal sans THC.',
      products: [
        {
          name: 'Graines de Chanvre Bio',
          price: '15,90€',
          description: 'Graines de chanvre bio décortiquées, protéines complètes',
          composition: 'Graines de Cannabis sativa L. bio 100% (sans THC)'
        }
      ]
    },
    {
      id: 'reishi',
      name: 'Reishi',
      latinName: 'Ganoderma lucidum',
      emoji: '🍄',
      shortDescription: 'Champignon de l\'immortalité pour l\'équilibre et la longévité.',
      fullDescription: 'Champignon ligneux au chapeau laqué rouge-brun, le Reishi pousse sur les souches de feuillus. Vénéré en Asie comme "champignon de l\'immortalité", il soutient naturellement l\'équilibre de l\'organisme et accompagne la gestion du stress. Ses principes actifs, triterpènes et polysaccharides, renforcent les défenses naturelles.',
      mainBenefits: [
        'Adaptogène anti-stress',
        'Renforce l\'immunité',
        'Favorise un sommeil réparateur',
        'Propriétés hépatoprotectrices'
      ],
      usage: 'Décoction : 3-5g de champignon séché dans 500ml d\'eau, mijoter 30 minutes.',
      contraindications: 'Peut interagir avec les anticoagulants. Éviter avant une chirurgie.',
      products: [
        {
          name: 'Reishi Bio - Morceaux',
          price: '38,90€',
          description: 'Champignon Reishi bio séché des forêts asiatiques',
          composition: 'Ganoderma lucidum bio 100%'
        }
      ]
    },
    {
      id: 'chlorella',
      name: 'Chlorella',
      latinName: 'Chlorella vulgaris',
      emoji: '🌀',
      shortDescription: 'Micro-algue détoxifiante riche en chlorophylle.',
      fullDescription: 'Micro-algue verte unicellulaire des eaux douces, la Chlorella concentre une quantité exceptionnelle de chlorophylle et de nutriments. Reconnue pour ses propriétés détoxifiantes, elle aide à éliminer les métaux lourds et soutient la régénération cellulaire. Sa paroi cellulaire doit être brisée pour optimiser l\'assimilation.',
      mainBenefits: [
        'Détoxifie les métaux lourds',
        'Très riche en chlorophylle',
        'Soutient la régénération cellulaire',
        'Renforce les défenses naturelles'
      ],
      usage: 'Commencer par 1g par jour, augmenter progressivement jusqu\'à 3-5g.',
      contraindications: 'Éviter en cas d\'allergie aux algues. Commencer par petites doses.',
      products: [
        {
          name: 'Chlorella Bio - Poudre',
          price: '28,90€',
          description: 'Poudre de Chlorella bio à paroi cellulaire brisée',
          composition: 'Chlorella vulgaris bio 100%'
        }
      ]
    },
    {
      id: 'cynorrhodon',
      name: 'Cynorrhodon',
      latinName: 'Rosa canina',
      emoji: '🔴',
      shortDescription: 'Fruits de l\'églantier exceptionnellement riches en vitamine C.',
      fullDescription: 'Fruits rouge orangé de l\'églantier, les cynorrhodons développent leur richesse vitaminique après les premières gelées. Concentrant jusqu\'à 20 fois plus de vitamine C que les agrumes, ils soutiennent naturellement les défenses immunitaires. Traditionnellement préparés en confitures et tisanes.',
      mainBenefits: [
        'Exceptionnellement riche en vitamine C',
        'Renforce les défenses immunitaires',
        'Propriétés antioxydantes',
        'Soutient la vitalité hivernale'
      ],
      usage: 'Décoction : 1 cuillère à soupe de fruits séchés dans 250ml d\'eau, bouillir 10 minutes.',
      contraindications: 'Retirer les graines irritantes. Aucune contre-indication majeure.',
      products: [
        {
          name: 'Cynorrhodon Bio - Fruits',
          price: '13,90€',
          description: 'Fruits de cynorrhodon bio séchés sans graines',
          composition: 'Fruits de Rosa canina bio 100%'
        }
      ]
    },
    {
      id: 'myrtilles-sauvages',
      name: 'Myrtilles Sauvages',
      latinName: 'Vaccinium myrtillus',
      emoji: '🫐',
      shortDescription: 'Baies sauvages riches en anthocyanes pour la vision.',
      fullDescription: 'Petites baies bleues des sous-bois et landes, les myrtilles sauvages concentrent une richesse exceptionnelle en anthocyanes. Ces pigments bleus protègent la vision, renforcent les capillaires et soutiennent la circulation cérébrale. Plus concentrées que les myrtilles cultivées, elles constituent un superaliment antioxydant.',
      mainBenefits: [
        'Protègent la vision',
        'Riches en anthocyanes',
        'Antioxydants puissants',
        'Soutiennent la circulation'
      ],
      usage: 'Consommer 30-50g de baies séchées par jour ou en infusion.',
      contraindications: 'Aucune connue aux doses alimentaires.',
      products: [
        {
          name: 'Myrtilles Sauvages Bio',
          price: '24,90€',
          description: 'Myrtilles sauvages bio séchées',
          composition: 'Vaccinium myrtillus bio 100%'
        }
      ]
    },
    {
      id: 'mures-sauvages',
      name: 'Mûres Sauvages',
      latinName: 'Rubus fruticosus',
      emoji: '🫐',
      shortDescription: 'Baies sauvages antioxydantes des ronciers.',
      fullDescription: 'Baies noires des ronciers sauvages, les mûres concentrent des anthocyanes et flavonoïdes antioxydants. Riches en vitamines C et E, elles soutiennent les défenses naturelles et protègent contre le stress oxydatif. Leurs feuilles possèdent également des propriétés astringentes traditionnelles.',
      mainBenefits: [
        'Antioxydants naturels puissants',
        'Riches en vitamines C et E',
        'Soutiennent l\'immunité',
        'Propriétés anti-inflammatoires'
      ],
      usage: 'Consommer 30-50g de baies séchées par jour. Feuilles en infusion : 1 cuillère à soupe/250ml.',
      contraindications: 'Aucune connue aux doses alimentaires.',
      products: [
        {
          name: 'Mûres Sauvages Bio',
          price: '19,90€',
          description: 'Mûres sauvages bio séchées',
          composition: 'Rubus fruticosus bio 100%'
        }
      ]
    },
    {
      id: 'maitake',
      name: 'Maitaké',
      latinName: 'Grifola frondosa',
      emoji: '🍄',
      shortDescription: 'Champignon "danse de joie" pour le système immunitaire.',
      fullDescription: 'Champignon aux chapeaux superposés formant de grandes rosettes, le Maitaké pousse à la base des chênes. Son nom japonais signifie "champignon danse de joie". Riche en bêta-glucanes, il soutient naturellement les défenses immunitaires et aide à réguler la glycémie.',
      mainBenefits: [
        'Stimule le système immunitaire',
        'Aide à réguler la glycémie',
        'Propriétés adaptogènes',
        'Soutient la vitalité générale'
      ],
      usage: 'Consommer 3-5g de poudre par jour ou en décoction.',
      contraindications: 'Surveiller la glycémie en cas de diabète. Éviter avec immunosuppresseurs.',
      products: [
        {
          name: 'Maitaké Bio - Poudre',
          price: '34,90€',
          description: 'Poudre de Maitaké bio pour renforcer l\'immunité',
          composition: 'Grifola frondosa bio 100%'
        }
      ]
    },
    {
      id: 'polypore_versicolore',
      name: 'Polypore Versicolore',
      latinName: 'Trametes versicolor',
      emoji: '🍄',
      shortDescription: 'Champignon aux cercles colorés pour les défenses naturelles.',
      fullDescription: 'Champignon saprophyte aux bandes concentriques multicolores, le polypore versicolore forme des consoles sur les troncs morts. Utilisé traditionnellement en médecine chinoise, il contient des polysaccharides PSK et PSP qui soutiennent puissamment le système immunitaire.',
      mainBenefits: [
        'Puissant immunostimulant',
        'Propriétés antioxydantes',
        'Soutient la détoxification',
        'Aide contre la fatigue'
      ],
      usage: 'Décoction : 5-10g de champignon séché dans 500ml d\'eau, mijoter 45 minutes.',
      contraindications: 'Éviter en cas de maladies auto-immunes. Consulter en cas de traitement.',
      products: [
        {
          name: 'Polypore Versicolore Bio',
          price: '32,90€',
          description: 'Champignon polypore versicolore bio séché',
          composition: 'Trametes versicolor bio 100%'
        }
      ]
    },
    {
      id: 'baies_argousier',
      name: 'Baies d\'Argousier',
      latinName: 'Hippophae rhamnoides',
      emoji: '🟠',
      shortDescription: 'Baies oranges riches en vitamines pour la vitalité.',
      fullDescription: 'Arbuste épineux des dunes et montagnes, l\'argousier développe ses baies orange vif gorgées de vitamines. Particulièrement riches en vitamine C, E et caroténoïdes, elles soutiennent la vitalité et protègent contre le stress oxydatif. Leur saveur acidulée caractéristique en fait un superaliment apprécié.',
      mainBenefits: [
        'Très riche en vitamines C et E',
        'Puissant antioxydant naturel',
        'Soutient la vitalité',
        'Protège la peau du vieillissement'
      ],
      usage: 'Consommer 1-2 cuillères à soupe de jus par jour ou quelques baies fraîches.',
      contraindications: 'Aucune contre-indication majeure. Saveur très acidulée.',
      products: [
        {
          name: 'Baies d\'Argousier Bio',
          price: '24,90€',
          description: 'Baies d\'argousier bio séchées des Alpes',
          composition: 'Baies d\'Hippophae rhamnoides bio 100%'
        }
      ]
    },
    {
      id: 'agaricus_blazei',
      name: 'Agaricus Blazei',
      latinName: 'Agaricus blazei murrill',
      emoji: '🍄',
      shortDescription: 'Champignon du soleil pour stimuler l\'immunité.',
      fullDescription: 'Champignon aux propriétés immunostimulantes remarquables, l\'Agaricus blazei pousse naturellement au Brésil. Riche en bêta-glucanes, il soutient puissamment les défenses naturelles et aide l\'organisme à lutter contre les agressions extérieures. Traditionnellement appelé "champignon du soleil".',
      mainBenefits: [
        'Puissant immunostimulant',
        'Riche en bêta-glucanes',
        'Propriétés adaptogènes',
        'Soutient la vitalité générale'
      ],
      usage: 'Consommer 3-5g de poudre par jour ou en décoction.',
      contraindications: 'Éviter en cas de maladies auto-immunes. Consulter en cas de traitement.',
      products: [
        {
          name: 'Agaricus Blazei Bio',
          price: '42,90€',
          description: 'Champignon Agaricus blazei bio en poudre',
          composition: 'Agaricus blazei murrill bio 100%'
        }
      ]
    },
    {
      id: 'dulse',
      name: 'Dulse',
      latinName: 'Palmaria palmata',
      emoji: '🔴',
      shortDescription: 'Algue rouge riche en minéraux et vitamines.',
      fullDescription: 'Algue rouge des côtes atlantiques aux frondes palmées rouge pourpre, la Dulse développe sa richesse minérale dans les eaux froides. Traditionnellement consommée en Irlande et Bretagne, elle concentre iode, fer, magnésium et vitamines. Sa saveur légèrement salée en fait une algue très appréciée.',
      mainBenefits: [
        'Très riche en iode naturel',
        'Source de fer et magnésium',
        'Soutient la fonction thyroïdienne',
        'Reminéralisante naturelle'
      ],
      usage: 'Consommer 2-5g par jour, réhydratée ou en paillettes sur les plats.',
      contraindications: 'Éviter en cas d\'hyperthyroïdie. Prudence avec traitements thyroïdiens.',
      products: [
        {
          name: 'Dulse Bio - Paillettes',
          price: '16,90€',
          description: 'Algue dulse bio des côtes atlantiques en paillettes',
          composition: 'Palmaria palmata bio 100%'
        }
      ]
    },
    {
      id: 'moringa',
      name: 'Moringa',
      latinName: 'Moringa oleifera',
      emoji: '🌿',
      shortDescription: 'Arbre de vie aux feuilles nutritives exceptionnelles.',
      fullDescription: 'Arbre tropical aux feuilles composées d\'un vert tendre, le Moringa développe ses gousses pendantes dans les régions arides. Surnommé "arbre de vie", ses feuilles concentrent une richesse nutritionnelle exceptionnelle : protéines complètes, vitamines, minéraux et antioxydants. Un superaliment complet pour la vitalité.',
      mainBenefits: [
        'Très riche en protéines complètes',
        'Concentré de vitamines et minéraux',
        'Puissant antioxydant',
        'Soutient la vitalité générale'
      ],
      usage: 'Consommer 1-2 cuillères à café de poudre par jour, mélangée aux smoothies ou yaourts.',
      contraindications: 'Éviter les racines et écorces. Commencer par petites doses.',
      products: [
        {
          name: 'Moringa Bio - Feuilles',
          price: '22,90€',
          description: 'Poudre de feuilles de Moringa bio, superaliment complet',
          composition: 'Feuilles de Moringa oleifera bio 100%'
        }
      ]
    },
    {
      id: 'baobab',
      name: 'Baobab',
      latinName: 'Adansonia digitata',
      emoji: '🌳',
      shortDescription: 'Fruit de l\'arbre géant riche en vitamine C et fibres.',
      fullDescription: 'Fruit de l\'emblématique baobab africain, cette pulpe blanc crème concentre naturellement vitamine C, fibres et minéraux. L\'arbre millénaire stocke ses nutriments dans ses fruits pendant la saison sèche. Traditionnellement consommé par les populations africaines pour la vitalité et la digestion.',
      mainBenefits: [
        'Très riche en vitamine C naturelle',
        'Excellent source de fibres',
        'Riche en antioxydants',
        'Soutient la digestion'
      ],
      usage: 'Mélanger 1-2 cuillères à café de poudre dans les smoothies, yaourts ou eau.',
      contraindications: 'Aucune contre-indication majeure. Goût acidulé prononcé.',
      products: [
        {
          name: 'Baobab Bio - Poudre',
          price: '18,90€',
          description: 'Poudre de pulpe de fruit de baobab bio d\'Afrique',
          composition: 'Pulpe de fruit d\'Adansonia digitata bio 100%'
        }
      ]
    },
    {
      id: 'guarana',
      name: 'Guarana',
      latinName: 'Paullinia cupana',
      emoji: '⚡',
      shortDescription: 'Graines énergisantes d\'Amazonie riches en caféine naturelle.',
      fullDescription: 'Liane grimpante d\'Amazonie aux fruits rouges renfermant des graines riches en guaranine (caféine naturelle). Utilisé traditionnellement par les peuples amazoniens pour l\'énergie et l\'endurance, le guarana libère sa caféine progressivement, évitant les pics et chutes énergétiques.',
      mainBenefits: [
        'Énergie naturelle durable',
        'Améliore la concentration',
        'Stimule le métabolisme',
        'Antioxydants naturels'
      ],
      usage: 'Consommer 1-2g de poudre par jour, de préférence le matin.',
      contraindications: 'Éviter en cas de sensibilité à la caféine. Ne pas prendre le soir.',
      products: [
        {
          name: 'Guarana Bio - Poudre',
          price: '24,90€',
          description: 'Poudre de graines de guarana bio d\'Amazonie',
          composition: 'Graines de Paullinia cupana bio 100%'
        }
      ]
    }
  ]
};