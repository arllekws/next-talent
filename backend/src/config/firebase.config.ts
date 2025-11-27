import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

export const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      // Caminho absoluto partindo da raiz do projeto
      const serviceAccountPath = path.join(process.cwd(), 'firebase-adminsdk.json');

      if (!fs.existsSync(serviceAccountPath)) {
        console.warn('⚠️ Arquivo firebase-adminsdk.json não encontrado');
        return;
      }

      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
      console.error('❌ Erro ao inicializar Firebase Admin:', error.message);
    }
  }
};
