import { useEffect } from "react";

interface MonetagAdProps {
  zoneId: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MonetagAd({ 
  zoneId, 
  width = 728, 
  height = 90, 
  className = "" 
}: MonetagAdProps) {
  useEffect(() => {
    // Load Monetag script if not already loaded
    if (!document.querySelector('script[src*="monetag.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//thubanoa.com/1?z=7990707';
      document.head.appendChild(script);
    }

    // Initialize ad if Monetag is loaded
    if (window.monetag) {
      window.monetag.cmd.push(function() {
        window.monetag.display(zoneId);
      });
    }
  }, [zoneId]);

  return (
    <div 
      className={`monetag-ad ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        margin: '10px auto',
        textAlign: 'center',
        background: '#f5f5f5',
        border: '1px solid #ddd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      id={`monetag-${zoneId}`}
    >
      <div style={{ color: '#666', fontSize: '12px' }}>
        Advertisement Space
      </div>
    </div>
  );
}

// Pre-configured banner components
export function MonetagBanner({ className = "" }: { className?: string }) {
  return (
    <MonetagAd
      zoneId="7990707"
      width={728}
      height={90}
      className={className}
    />
  );
}

export function MonetagSquare({ className = "" }: { className?: string }) {
  return (
    <MonetagAd
      zoneId="7990708"
      width={300}
      height={250}
      className={className}
    />
  );
}

export function MonetagSidebar({ className = "" }: { className?: string }) {
  return (
    <MonetagAd
      zoneId="7990709"
      width={160}
      height={600}
      className={className}
    />
  );
}

// Extend window type for Monetag
declare global {
  interface Window {
    monetag: any;
  }
}
