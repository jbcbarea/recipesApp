import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'recipesApp',
  webDir: 'www',
  server: {
    androidScheme: 'http',  // Change to 'https' if needed
    allowNavigation: ['http://localhost:*'], // Update this to match your server URL
    cleartext: true
  }
};

export default config;

