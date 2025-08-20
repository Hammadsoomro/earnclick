import { useEffect } from "react";

interface AdCashAdProps {
  className?: string;
}

export function AdCashAd({ className = "" }: AdCashAdProps) {
  useEffect(() => {
    // Load AdCash script if not already loaded
    if (!document.querySelector('script[src*="groleegni.net"]')) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(d,z,s){
          s.src='https://'+d+'/401/'+z;
          try{
            (document.body||document.documentElement).appendChild(s)
          }catch(e){}
        })('groleegni.net',9676701,document.createElement('script'))
      `;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div 
      className={`adcash-ad ${className}`}
      style={{ 
        width: '100%', 
        height: '90px',
        margin: '10px auto',
        textAlign: 'center',
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      id="adcash-banner"
    >
      <div style={{ color: '#6c757d', fontSize: '12px' }}>
        AdCash Banner Advertisement
      </div>
    </div>
  );
}

// Pre-configured banner components for different sizes
export function AdCashBanner({ className = "" }: { className?: string }) {
  return (
    <AdCashAd className={className} />
  );
}

export function AdCashSquare({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Load different AdCash script for square ads if needed
    const script = document.createElement('script');
    script.innerHTML = `
      (function(d,z,s){
        s.src='https://'+d+'/401/'+z;
        try{
          (document.body||document.documentElement).appendChild(s)
        }catch(e){}
      })('groleegni.net',9676701,document.createElement('script'))
    `;
    document.head.appendChild(script);
  }, []);

  return (
    <div 
      className={`adcash-square ${className}`}
      style={{ 
        width: '300px', 
        height: '250px',
        margin: '10px auto',
        textAlign: 'center',
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      id="adcash-square"
    >
      <div style={{ color: '#6c757d', fontSize: '12px' }}>
        AdCash Square Advertisement
      </div>
    </div>
  );
}
