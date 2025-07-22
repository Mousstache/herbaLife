import { Plant } from '../data/DataPlant';

export interface UserContraindications {
  grossesse: boolean;
  allaitement: boolean;
  hypertension: boolean;
  anticoagulants: boolean;
  allergies_asteracees: boolean;
  maladies_auto_immunes: boolean;
  ulceres_gastriques: boolean;
  troubles_hormonaux: boolean;
  phenylcetonurie: boolean;
  enfants: boolean;
}

export function isPlantDangerous(plant: Plant, userContraindications: string[]): boolean {
  const contraindications = plant.contraindications.toLowerCase();
  
  // Vérifications spécifiques selon les contre-indications de l'utilisateur
  for (const contraindicationId of userContraindications) {
    switch (contraindicationId) {
      case 'grossesse':
        if (contraindications.includes('grossesse') || 
            contraindications.includes('enceinte') ||
            contraindications.includes('femmes enceintes')) {
          return true;
        }
        break;
        
      case 'allaitement':
        if (contraindications.includes('allaitement') ||
            contraindications.includes('allaitante')) {
          return true;
        }
        break;
        
      case 'hypertension':
        if (contraindications.includes('hypertension') ||
            contraindications.includes('tension')) {
          return true;
        }
        break;
        
      case 'anticoagulants':
        if (contraindications.includes('anticoagulant') ||
            contraindications.includes('anticoagulant')) {
          return true;
        }
        break;
        
      case 'allergies_asteracees':
        if (contraindications.includes('astéracées') ||
            contraindications.includes('asteracees')) {
          return true;
        }
        break;
        
      case 'maladies_auto_immunes':
        if (contraindications.includes('auto-immun') ||
            contraindications.includes('auto immun')) {
          return true;
        }
        break;
        
      case 'ulceres_gastriques':
        if (contraindications.includes('ulcère') ||
            contraindications.includes('ulcer') ||
            contraindications.includes('gastrique')) {
          return true;
        }
        break;
        
      case 'troubles_hormonaux':
        if (contraindications.includes('hormonal') ||
            contraindications.includes('hormone')) {
          return true;
        }
        break;
        
      case 'phenylcetonurie':
        if (contraindications.includes('phénylcétonurie') ||
            contraindications.includes('phenylcetonurie')) {
          return true;
        }
        break;
        
      case 'enfants':
        if (contraindications.includes('enfant') ||
            contraindications.includes('enfants') ||
            contraindications.includes('pédiatrique')) {
          return true;
        }
        break;
    }
  }
  
  return false;
}

export function getDangerLevel(plant: Plant, userContraindications: string[]): 'safe' | 'warning' | 'dangerous' {
  if (isPlantDangerous(plant, userContraindications)) {
    return 'dangerous';
  }
  
  return 'safe';
}
