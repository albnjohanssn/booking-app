'use client';
import { authClient } from '../../lib/auth-client'; //import the auth client
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log('loading');
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          console.log('successfully registered account');
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div>
      <input
        type='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Username'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
