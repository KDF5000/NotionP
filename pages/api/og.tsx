import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'My Blog Post';
  const date = searchParams.get('date');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '40px 80px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              background: 'linear-gradient(to bottom right, #000000, #444444)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.2,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 800,
            }}
          >
            {title}
          </div>
          {date && (
            <div
              style={{
                fontSize: 30,
                color: '#666',
                fontFamily: 'sans-serif',
              }}
            >
              {date}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 40,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#000',
                marginRight: 10,
              }}
            />
            <div style={{ fontSize: 24, fontWeight: 600 }}>PCursor.run</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
