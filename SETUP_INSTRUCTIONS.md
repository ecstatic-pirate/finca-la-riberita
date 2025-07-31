# Instrucciones de Configuración - Finca La Riberita

## 🌐 Sitio Web Bilingüe
El sitio web ya está configurado con soporte para español (predeterminado) e inglés.

## 📍 Google Maps (Sin API Key)
El mapa ya funciona usando el iframe básico de Google Maps. Para actualizar la ubicación:

1. Abre `src/components/Contact.tsx`
2. Busca el componente `<GoogleMap />`
3. Agrega tu dirección: `<GoogleMap address="Tu dirección completa aquí" />`

## 📧 Formulario de Contacto

### Opción 1: Formulario Actual (mailto)
El formulario actual abre el cliente de correo del usuario. Para cambiar el email:
- Edita `src/components/Contact.tsx`
- Busca `mailto:info@fincalariberita.com`
- Cambia por tu email

### Opción 2: Google Forms (Recomendado)
Para recibir consultas directamente en tu Gmail:

1. Ve a [forms.google.com](https://forms.google.com)
2. Crea un nuevo formulario con estos campos:
   - Nombre (respuesta corta)
   - Email (respuesta corta)
   - Teléfono (respuesta corta)
   - Tipo de Evento (opción múltiple: Boda, Evento Corporativo, Celebración Privada)
   - Mensaje (párrafo)

3. Configura el formulario:
   - ⚙️ Configuración → Respuestas → ✓ Recopilar direcciones de correo
   - ⚙️ Configuración → Respuestas → ✓ Enviar a los encuestados una copia de sus respuestas
   - ⚙️ Configuración → Presentación → Mensaje de confirmación: "Gracias por tu consulta. Te contactaremos pronto."

4. Obtén el código de inserción:
   - Haz clic en "Enviar" (arriba a la derecha)
   - Selecciona el icono de embed `< >`
   - Copia solo la URL del src (algo como: `https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform?embedded=true`)

5. Agrega el formulario a tu sitio:
   - Abre `src/components/GoogleFormsContact.tsx`
   - Reemplaza `YOUR_FORM_ID` con tu URL
   - Descomenta el iframe

## 🔧 Actualizaciones Necesarias

1. **Información de contacto** (`src/messages/es.json` y `en.json`):
   - Dirección completa
   - Teléfono real
   - Email de contacto

2. **Contenido de la página**:
   - Descripción completa en español (que mencionaste tener)
   - Agregar fotos reales en los componentes

3. **Imágenes**:
   - Reemplaza las imágenes de Unsplash con fotos reales
   - Agrega las fotos a la carpeta `public/images/`

## 🚀 Para ver el sitio:
```bash
npm run dev
```
Luego abre http://localhost:3001

## 📱 Cambiar idioma:
Los botones ES/EN en la navegación cambian entre español e inglés.