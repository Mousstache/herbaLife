const fs = require('fs');
const path = require('path');

// Lire le fichier DataPlant.tsx pour extraire les noms de plantes
const dataPlantPath = path.join(__dirname, '../data/DataPlant.tsx');
const imageHelperPath = path.join(__dirname, '../utils/imageHelper.ts');
const plantImagesPath = path.join(__dirname, '../constants/PlantImages.ts');

// Lire le contenu des fichiers
const dataPlantContent = fs.readFileSync(dataPlantPath, 'utf8');
const imageHelperContent = fs.readFileSync(imageHelperPath, 'utf8');
const plantImagesContent = fs.readFileSync(plantImagesPath, 'utf8');

// Extraire les noms de plantes de DataPlant.tsx
const plantNameMatches = dataPlantContent.match(/name: ['"]([^'"]+)['"]/g);
const plantNames = plantNameMatches
  ? plantNameMatches
      .map(match => match.replace(/name: ['"]([^'"]+)['"]/, '$1'))
      .filter(name => 
        !name.includes('Système') && 
        !name.includes(' Bio') && 
        !name.includes('Teinture') &&
        !name.includes('Sirop') &&
        !name.includes('Gélules') &&
        !name.includes('Premium') &&
        !name.includes('Huile Essentielle') &&
        !name.includes('Gel ') &&
        !name.includes(' - ')
      )
      .filter((name, index, arr) => arr.indexOf(name) === index) // Supprimer les doublons
      .sort()
  : [];

// Extraire la liste des images disponibles
const availableImagesMatch = plantImagesContent.match(/AVAILABLE_PLANT_IMAGES = \[([\s\S]*?)\]/);
const availableImages = availableImagesMatch
  ? availableImagesMatch[1]
      .match(/'([^']+)'/g)
      .map(match => match.replace(/'/g, ''))
  : [];

console.log(`\n🌿 ANALYSE DES IMAGES DE PLANTES`);
console.log(`═══════════════════════════════════`);
console.log(`📊 Plantes dans la base de données: ${plantNames.length}`);
console.log(`🖼️  Images disponibles: ${availableImages.length}`);

// Fonction pour convertir un nom de plante en nom de fichier (similaire à imageHelper.ts)
function getPlantImageName(plantName) {
  return plantName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Extraire le mapping manuel
const mappingMatch = imageHelperContent.match(/plantImageMapping: \{([\s\S]*?)\}/);
const manualMapping = {};
if (mappingMatch) {
  const mappingContent = mappingMatch[1];
  const mappingEntries = mappingContent.match(/'([^']+)':\s*'([^']+)'/g);
  if (mappingEntries) {
    mappingEntries.forEach(entry => {
      const match = entry.match(/'([^']+)':\s*'([^']+)'/);
      if (match) {
        manualMapping[match[1]] = match[2];
      }
    });
  }
}

console.log(`\n🗂️  Mapping manuel: ${Object.keys(manualMapping).length} entrées`);

// Vérifier les correspondances
let plantesAvecImages = 0;
let plantesSansImages = [];

console.log(`\n🔍 VÉRIFICATION DES CORRESPONDANCES:`);
console.log(`────────────────────────────────────`);

plantNames.forEach(plantName => {
  let imageFileName;
  
  // Vérifier d'abord le mapping manuel
  if (manualMapping[plantName]) {
    imageFileName = manualMapping[plantName];
  } else {
    // Utiliser la conversion automatique
    imageFileName = getPlantImageName(plantName);
  }
  
  const hasImage = availableImages.includes(imageFileName);
  
  if (hasImage) {
    plantesAvecImages++;
    console.log(`✅ ${plantName} → ${imageFileName}.jpg`);
  } else {
    plantesSansImages.push({ name: plantName, expectedFile: imageFileName });
    console.log(`❌ ${plantName} → ${imageFileName}.jpg (MANQUANT)`);
  }
});

console.log(`\n📈 RÉSUMÉ:`);
console.log(`═════════`);
console.log(`✅ Plantes avec images: ${plantesAvecImages}/${plantNames.length} (${Math.round(plantesAvecImages/plantNames.length*100)}%)`);
console.log(`❌ Plantes sans images: ${plantesSansImages.length}`);

if (plantesSansImages.length > 0) {
  console.log(`\n📝 PLANTES SANS IMAGES:`);
  console.log(`─────────────────────`);
  plantesSansImages.forEach(plant => {
    console.log(`• ${plant.name} (cherche: ${plant.expectedFile}.jpg)`);
  });
}

console.log(`\n🎯 Pour améliorer la couverture:`);
console.log(`• Ajouter les images manquantes dans assets/images/`);
console.log(`• Ou mettre à jour le mapping manuel dans imageHelper.ts`);
console.log(`• Ou utiliser des noms alternatifs dans PlantImages.ts\n`);
