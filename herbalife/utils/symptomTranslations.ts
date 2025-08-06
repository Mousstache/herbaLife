// Mapping des symptômes français vers leurs clés de traduction
export const symptomKeyMap: { [key: string]: string } = {
  'Fatigue chronique': 'chronic_fatigue',
  'Troubles du sommeil / insomnie': 'sleep_disorders',
  'Stress': 'stress',
  'Anxiété': 'anxiety',
  'Irritabilité': 'irritability',
  'Nervosité': 'nervousness',
  'Troubles de la mémoire': 'memory_problems',
  'Difficulté de concentration': 'concentration_difficulty',
  'Maux de tête': 'headaches',
  'Migraines': 'migraines',
  'Vertiges': 'dizziness',
  'Burn-out': 'burnout',
  'Dépression légère': 'mild_depression',
  'Tics nerveux': 'nervous_tics',
  'Spasmes musculaires liés au stress': 'stress_muscle_spasms',
  'Hypersensibilité sensorielle': 'sensory_hypersensitivity',
  'Brouillard mental ("brouillard cérébral")': 'brain_fog',
  'Confusion passagère': 'temporary_confusion',
  'Hypertension': 'hypertension',
  'Hypotension': 'hypotension',
  'Palpitations': 'palpitations',
  'Jambes lourdes': 'heavy_legs',
  'Varices': 'varicose_veins',
  'Œdèmes': 'edema',
  'Circulation périphérique faible (mains/pieds froids)': 'poor_circulation',
  'Tachycardie légère': 'mild_tachycardia',
  'Sensation d\'oppression thoracique (non cardiaque)': 'chest_tightness',
  'Toux sèche': 'dry_cough',
  'Toux grasse': 'productive_cough',
  'Rhume': 'cold',
  'Rhinite allergique': 'allergic_rhinitis',
  'Sinusite': 'sinusitis',
  'Bronchite': 'bronchitis',
  'Asthme léger': 'mild_asthma',
  'Essoufflement': 'shortness_of_breath',
  'Enrouement': 'hoarseness',
  'Sécheresse des muqueuses': 'mucous_dryness',
  'Gorge irritée': 'sore_throat',
  'Ballonnements': 'bloating',
  'Gaz intestinaux': 'intestinal_gas',
  'Constipation': 'constipation',
  'Diarrhée': 'diarrhea',
  'Digestion lente': 'slow_digestion',
  'Nausées': 'nausea',
  'Reflux acide': 'acid_reflux',
  'Crampes intestinales': 'intestinal_cramps',
  'Perte d\'appétit': 'loss_of_appetite',
  'Foie engorgé': 'liver_congestion',
  'Mauvaise haleine (halitose)': 'bad_breath',
  'Sensation de lourdeur après repas': 'heavy_feeling_after_meals',
  'Ulcère débutant': 'early_ulcer',
  'Bouche pâteuse au réveil': 'morning_mouth_coating',
  'Infections fréquentes': 'frequent_infections',
  'Fatigue post-infectieuse': 'post_infectious_fatigue',
  'Faible immunité générale': 'low_general_immunity',
  'Infections ORL récurrentes': 'recurrent_ent_infections',
  'Inflammation chronique': 'chronic_inflammation',
  'Ganglions légèrement enflés': 'slightly_swollen_lymph_nodes'
};

// Mapping des noms de catégories français vers leurs clés de traduction
export const categoryKeyMap: { [key: string]: string } = {
  'Système nerveux & mental': 'nervous_mental',
  'Système cardiovasculaire & circulation': 'cardiovascular',
  'Système respiratoire': 'respiratory',
  'Système digestif': 'digestive',
  'Système immunitaire': 'immune'
};

// Fonction utilitaire pour obtenir la traduction d'un symptôme
export const getSymptomTranslation = (symptom: string, t: (key: string) => string): string => {
  const key = symptomKeyMap[symptom];
  return key ? t(`symptoms.list.${key}`) : symptom;
};

// Fonction utilitaire pour obtenir la traduction d'une catégorie
export const getCategoryTranslation = (category: string, t: (key: string) => string): string => {
  const key = categoryKeyMap[category];
  return key ? t(`symptoms.categories.${key}`) : category;
};
