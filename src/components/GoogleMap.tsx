'use client';

interface GoogleMapProps {
  address?: string;
}

export default function GoogleMap({ address = "Finca La Riberita, Madrid, Spain" }: GoogleMapProps) {
  // Using Google Maps iframe embed - no API key needed
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&zoom=15`;

  return (
    <iframe
      src={mapUrl}
      className="w-full h-96 rounded-lg shadow-lg"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}