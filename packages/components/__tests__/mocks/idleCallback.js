// Le runtime React Native fournit requestIdleCallback, l'environnement Jest du preset natif non.
// Depuis React Native 0.88, il remplace InteractionManager : sans ce relais, tout composant qui
// diffère un travail après une animation plante au montage.
global.requestIdleCallback = global.requestIdleCallback || (callback => setTimeout(callback, 0));
global.cancelIdleCallback = global.cancelIdleCallback || (handle => clearTimeout(handle));
