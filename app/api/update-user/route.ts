import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { sub, name, email, nickname } = await request.json(); 
  
    try {
      const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_AUDIENCE,
          grant_type: 'client_credentials',
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      if (!accessToken) {
        throw new Error('Unable to get access token for Auth0 API');
      }
      
      const updateResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${sub}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          email,
          nickname,  
        }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to update user information');
      }
  
      const updatedUser = await updateResponse.json();
  
      return NextResponse.json({ message: 'User information updated successfully', updatedUser }, { status: 200 });
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }