"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 'bold', color: '#b91c1c' }}>Something went wrong!</h2>
          <p style={{ margin: '20px 0', color: '#64748b' }}>{error.message}</p>
          <button
            onClick={() => reset()}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: 16,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
