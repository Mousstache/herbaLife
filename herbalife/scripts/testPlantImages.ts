import { getPlantImageFileName } from '../utils/imageHelper';
import { isPlantImageAvailable, getPlantImageUrl } from '../constants/PlantImages';

// Test de quelques plantes importantes
const testPlants = [
  'Ginkgo Biloba',
  'Curcuma',
  'Menthe Poivrée',
  'Échinacée',
  'Thym',
  'Lavande Vraie',
  'Ail des Ours',
  'Basilic Sacré - Tulsi',
  'Baies d\'Argousier',
  'Mousse d\'Irlande',
  'Verge d\'Or',
  'Curcuma + Pipérine',
  'Ginseng Rouge de Corée',
  'Articulations & muscles',
  'Peau, cheveux & ongles'
];

console.log('🧪 TEST DU SYSTÈME D\'IMAGES DE PLANTES');
console.log('=====================================\n');

testPlants.forEach(plantName => {
  const imageFileName = getPlantImageFileName(plantName);
  const isAvailable = isPlantImageAvailable(imageFileName);
  const imageUrl = getPlantImageUrl(imageFileName);
  
  const status = isAvailable ? '✅' : '❌';
  console.log(`${status} ${plantName}`);
  console.log(`   → Fichier: ${imageFileName}.jpg`);
  console.log(`   → URL: ${imageUrl}`);
  console.log(`   → Disponible: ${isAvailable ? 'OUI' : 'NON'}\n`);
});

export {};
