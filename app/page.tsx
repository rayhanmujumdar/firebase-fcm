'use client';
import useFcmToken from '@/hooks/useFcmToken';

export default function Home() {
    const { token, notificationPermissionStatus } = useFcmToken();
    const handleTestNotification = async () => {
        const response = await fetch('/api/send-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                title: 'Test Notification',
                message: 'This is a test notification',
                link: '/contact',
            }),
        });

        const data = await response.json();
        console.log(data);
    };

    console.log(token, notificationPermissionStatus);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="p-10">
                <h1 className="text-4xl mb-4 font-bold">
                    Firebase Cloud Messaging Demo
                </h1>

                {notificationPermissionStatus === 'granted' ? (
                    <p>Permission to receive notifications has been granted.</p>
                ) : notificationPermissionStatus !== null ? (
                    <p>
                        You have not granted permission to receive
                        notifications. Please enable notifications in your
                        browser settings.
                    </p>
                ) : null}

                <button
                    disabled={!token}
                    className="mt-5"
                    onClick={handleTestNotification}
                >
                    Send Test Notification
                </button>
            </main>
        </div>
    );
}
