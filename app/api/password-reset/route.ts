import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json({ error: errorData.error || 'Failed to get token' }, { status: tokenResponse.status });
    }

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    const resetResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/tickets/password-change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
      }),
    });

    if (!resetResponse.ok) {
      const errorData = await resetResponse.json();
      return NextResponse.json({ error: errorData.error || 'Failed to send password reset email' }, { status: resetResponse.status });
    }

    const resetData = await resetResponse.json();
    return NextResponse.json({ message: 'Password reset email sent', resetResponse: resetData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  }
}
