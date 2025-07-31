'use client';

import { useTranslations } from 'next-intl';

export default function GoogleFormsContact() {
  const t = useTranslations('contact');
  
  // Replace this URL with your actual Google Form embed URL
  // To get this URL:
  // 1. Create a Google Form (forms.google.com)
  // 2. Click the "Send" button
  // 3. Click the embed icon (< >)
  // 4. Copy the src URL from the iframe code
  const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-serif text-gray-900 mb-6">{t('form.submit')}</h3>
      <div className="text-gray-600 mb-4">
        <p className="mb-4">
          Para configurar el formulario de contacto:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Ve a <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">forms.google.com</a></li>
          <li>Crea un nuevo formulario con campos: Nombre, Email, Teléfono, Tipo de Evento, Mensaje</li>
          <li>En Configuración → Respuestas → Recopilar direcciones de correo</li>
          <li>En Configuración → Presentación → Mensaje de confirmación personalizado</li>
          <li>Haz clic en "Enviar" → Icono de embed {"< >"}</li>
          <li>Copia la URL src del iframe</li>
          <li>Reemplaza YOUR_FORM_ID en el código con tu ID real</li>
        </ol>
      </div>
      
      {/* Uncomment this iframe when you have your Google Form URL */}
      {/* <iframe 
        src={googleFormUrl}
        width="100%" 
        height="800" 
        frameBorder="0" 
        marginHeight={0} 
        marginWidth={0}
        className="w-full"
      >
        Cargando…
      </iframe> */}
    </div>
  );
}