import { storage } from './storage';

const FIRST_LAUNCH_KEY = '@herbalife_first_launch';
const ONBOARDING_COMPLETED_KEY = '@herbalife_onboarding_completed';

class FirstLaunchService {
  /**
   * Vérifie si c'est la première fois que l'utilisateur lance l'app
   */
  async isFirstLaunch(): Promise<boolean> {
    try {
      const hasLaunched = await storage.getItem(FIRST_LAUNCH_KEY);
      return hasLaunched === null;
    } catch (error) {
      console.error('Erreur lors de la vérification du premier lancement:', error);
      return true; // Par défaut, on considère que c'est la première fois
    }
  }

  /**
   * Marque que l'application a été lancée
   */
  async markAsLaunched(): Promise<void> {
    try {
      await storage.setItem(FIRST_LAUNCH_KEY, 'true');
      console.log('Application marquée comme lancée');
    } catch (error) {
      console.error('Erreur lors du marquage du premier lancement:', error);
    }
  }

  /**
   * Vérifie si l'onboarding (contre-indications) a été complété
   */
  async isOnboardingCompleted(): Promise<boolean> {
    try {
      const completed = await storage.getItem(ONBOARDING_COMPLETED_KEY);
      return completed === 'true';
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'onboarding:', error);
      return false;
    }
  }

  /**
   * Marque l'onboarding comme complété
   */
  async markOnboardingCompleted(): Promise<void> {
    try {
      await storage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      console.log('Onboarding marqué comme complété');
    } catch (error) {
      console.error('Erreur lors du marquage de l\'onboarding:', error);
    }
  }

}

export const firstLaunchService = new FirstLaunchService();
