'use client';
import { useState } from 'react';

export default function Home() {

  const [shortCode, setShortCode] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;

    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    
    if(!res.ok) {
      console.error('Error shortening URL:', data.error);
      return;
    } 

    setShortCode(data.data[0].short_code);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 mb-10">URL Shortener</h1>
      <div className="form-container">
        <form className="flex flex-col items-center gap-4 form" onSubmit={handleSubmit}>
          <input name="url" type="url" placeholder="Enter the URL here"
            className="border border-gray-300 rounded focus:outline-none url-input" />
          <button type="submit" className="submit-btn bg-green-500 text-white rounded hover:bg-green-600">Shorten URL</button>
        </form>
      </div>

      {shortCode && (<div className="flex flex-col items-center mt-10 result-container">
        <h2 className="text-2xl font-semibold mb-4">Your shortened URL:</h2>
        <div className="shortened-url p-4 rounded">
          <a href={`/${shortCode}`} className="text-blue-500 hover:underline"
          rel="noopener noreferrer" target="_blank"
          >{`${window.location.origin}/${shortCode}`}</a>
        </div>
      </div>)}
    </div>
  );
}
