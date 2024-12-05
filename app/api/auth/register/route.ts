import { NextResponse } from 'next/server';

// In-memory storage since we can't use localStorage on the server
let users: any[] = [];
let companies: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, userType } = body;

    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      type: userType
    };

    // Add user to users array
    users.push(newUser);

    // If registering as a company, create company profile
    if (userType === 'company') {
      const newCompany = {
        id: newUser.id,
        name,
        email,
        phone: '',
        businessLicense: '',
        description: '',
        rating: 4.0,
        routes: []
      };

      companies.push(newCompany);
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Registration successful',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          type: newUser.type
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}