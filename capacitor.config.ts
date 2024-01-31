import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'recipesApp',
  webDir: 'www',
  server: {
    androidScheme: 'https',  // Change to 'https' if needed
    allowNavigation: ['https://localhost:*'], // Update this to match your server URL
    cleartext: true
  }
};

export default config;

