'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/services/firebase'; // ajuste o caminho conforme seu projeto

export default function TestTokenPage() {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      }
    };
    getToken();
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔑 Token do Firebase</h1>
        
        {token ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="mb-4 text-green-600 font-semibold">
              ✅ Token gerado com sucesso!
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Token JWT:
              </label>
              <textarea 
                className="w-full h-40 p-3 border rounded font-mono text-xs"
                value={token}
                readOnly
              />
            </div>
            
            <button 
              onClick={copyToken}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar Token'}
            </button>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Importante:</strong> Este token expira após 1 hora. 
                Se receber erro 401, gere um novo token.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-red-600">
              ❌ Você precisa fazer login primeiro!
            </p>
            <a 
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ir para Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
