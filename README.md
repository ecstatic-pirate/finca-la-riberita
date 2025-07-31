# Riberita Wedding Venue

A modern, elegant landing page for a wedding venue built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive layout that looks great on all devices
- **Image Carousel**: Auto-playing hero section with beautiful venue images
- **Interactive Gallery**: Filterable image gallery with lightbox functionality
- **Contact Form**: Comprehensive booking inquiry form with date selection
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **SEO Optimized**: Built-in SEO features with Next.js metadata
- **Performance**: Optimized images and lazy loading for fast page loads

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Images**: Next.js Image optimization with Unsplash integration

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
riberita/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── Navigation.tsx   # Sticky navigation bar
│       ├── Hero.tsx         # Hero section with carousel
│       ├── About.tsx        # About section with features
│       ├── Gallery.tsx      # Image gallery with filters
│       ├── Packages.tsx     # Pricing packages
│       ├── Testimonials.tsx # Customer testimonials
│       ├── Contact.tsx      # Contact form and info
│       └── Footer.tsx       # Site footer
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`:
- Primary colors: Warm coral/peach tones
- Secondary colors: Cool blue/gray tones

### Content
All text content is hardcoded in the components and can be easily modified:
- Venue name and tagline in `Hero.tsx`
- Feature descriptions in `About.tsx`
- Package details in `Packages.tsx`
- Contact information in `Contact.tsx`

### Images
The project uses placeholder images from Unsplash. Replace the image URLs in each component with your own venue photos.

## Deployment

The site is ready to be deployed on Vercel, Netlify, or any platform that supports Next.js:

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider

## Future Enhancements

- Email integration for contact form
- CMS integration for dynamic content
- Online booking system
- Virtual tour integration
- Multi-language support
- Analytics integration

## License

This project is open source and available under the MIT License.