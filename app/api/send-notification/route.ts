// import admin from 'firebase-admin';
import { Message } from 'firebase-admin/messaging';

import { NextRequest, NextResponse } from 'next/server';

// if (!admin.apps.length) {
//     // eslint-disable-next-line @typescript-eslint/no-require-imports
//     const serviceAccount = require('@/worker-secret/service-worker.json');
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

export async function POST(request: NextRequest) {
    const { token, title, message, link } = await request.json();
    const payload: Message = {
        token,
        notification: {
            title: title,
            body: message,
        },
        webpush: link && {
            fcmOptions: {
                link,
            },
        },
    };

    try {
        // await admin.messaging().send(payload);
        console.log('Notification sent!', payload);

        return NextResponse.json({
            success: true,
            message: 'Notification sent!',
        });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}
