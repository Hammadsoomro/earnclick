import { useEffect } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function AdSenseAd({
  adSlot,
  adFormat = "auto",
  style = { display: "block" },
  className = "",
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-8199077937393778"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

// Pre-configured ad components for different placements
export function BannerAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567890" // Replace with actual ad slot from AdSense
      adFormat="horizontal"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "90px",
      }}
    />
  );
}

export function SquareAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567891" // Replace with actual ad slot from AdSense
      adFormat="rectangle"
      className={className}
      style={{
        display: "block",
        width: "300px",
        height: "250px",
      }}
    />
  );
}

export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567892" // Replace with actual ad slot from AdSense
      adFormat="vertical"
      className={className}
      style={{
        display: "block",
        width: "160px",
        height: "600px",
      }}
    />
  );
}
