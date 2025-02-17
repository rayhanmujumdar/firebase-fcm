import admin from 'firebase-admin';
import { Message } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import serviceAccount from '@/worker-secrets/service-worker.json';

if (!admin.apps.length) {
    console.log(serviceAccount);
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.SECRET_FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

export async function POST(request: NextRequest) {
    const { token, title, message, link } = await request.json();
    const payload: Message = {
        token,
        notification: {
            title,
            body: message,
        },
        webpush: link && {
            fcmOptions: {
                link,
            },
        },
    };

    try {
        await admin.messaging().send(payload);
        console.log('Notification sent!', payload);

        return NextResponse.json({
            success: true,
            message: 'Notification sent!',
        });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}
