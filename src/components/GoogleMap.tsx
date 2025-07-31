'use client';

export default function GoogleMap() {
  // Using Google Maps iframe embed without API key
  // You can get this embed code from Google Maps:
  // 1. Go to Google Maps and search for your location
  // 2. Click "Share" > "Embed a map" > Copy the iframe code
  // 3. Extract the src URL and use it here
  
  // Finca La Riberita exact location embed
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.471293295323!2d-6.044608988111988!3d41.12423651215677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3935da5856c0c1%3A0x18238a5defc08f9!2sFinca%20La%20Riberita!5e0!3m2!1sen!2ses!4v1753994109320!5m2!1sen!2ses";

  return (
    <iframe
      src={embedUrl}
      className="w-full h-96 rounded-lg shadow-lg"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Location Map"
    />
  );
}