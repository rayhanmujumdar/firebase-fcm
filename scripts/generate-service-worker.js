import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const serviceWorkerConfig = {
    type: process.env.SECRET_FIREBASE_TYPE,
    project_id: process.env.SECRET_FIREBASE_PROJECT_ID,
    private_key_id: process.env.SECRET_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.SECRET_FIREBASE_PRIVATE_KEY,
    client_email: process.env.SECRET_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.SECRET_FIREBASE_CLIENT_ID,
    auth_uri: process.env.SECRET_FIREBASE_AUTH_URI,
    token_uri: process.env.SECRET_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
        process.env.SECRET_FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.SECRET_FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.SECRET_FIREBASE_UNIVERSE_DOMAIN,
};

fs.writeFileSync(
    path.resolve(__dirname, '../worker-secret/service-worker.json'),
    JSON.stringify(serviceWorkerConfig, null, 2)
);

console.log('service-worker.json has been generated successfully.');
