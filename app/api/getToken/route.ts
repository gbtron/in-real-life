import { NextResponse } from 'next/server';

export async function POST() {
    const response = await fetch (`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
        }),
    });

    const tokenData = await response.json();

    if (response.ok) {
        return NextResponse.json(tokenData);
    } else {
        return NextResponse.json({error: tokenData }, { status: response.status });
    }
}