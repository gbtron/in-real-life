import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
    const { sub, name, email, nickname } = await request.json(); 
    
    try{
      const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/getToken`, {
        method: 'POST'
      });
      
      const { access_token } = await tokenResponse.json();
  
      if (!access_token) {
        throw new Error('Unable to get access token for Auth0 API');
      }
      
      const updateResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${sub}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access_token}`,
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
  
      return NextResponse.json({ message: 'User information updated successfully', updatedUser }, { status: updateResponse.status });
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }