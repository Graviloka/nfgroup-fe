# 🏠 NF Group Property Listing Platform

A modern, responsive property listing platform built with Next.js 15 and TypeScript. This application allows users to submit their properties for rent or sale, with a clean and intuitive interface designed for the Indonesian real estate market.

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (Geist)
- **Build Tool**: Turbopack

### Backend
- **CMS**: [Strapi 5](https://strapi.io/) - Headless Content Management System
- **Database**: Configurable (PostgreSQL/MySQL/SQLite)
- **API**: RESTful API with authentication

## ✨ Features

- 📝 **Property Submission Form** - Comprehensive form for property listings
- 🏷️ **Dual Listing Types** - Support for both rental and sale properties
- 📸 **Media Upload** - Multiple image and video upload with validation
- 📱 **Responsive Design** - Mobile-first approach with modern UI
- 🔒 **Type Safety** - Full TypeScript coverage
- 🎨 **Modern UI** - Clean, professional design with consistent color scheme
- ⚡ **Performance** - Optimized with Next.js 15 and Turbopack
- 🛡️ **Security** - Environment variables and proper data validation

## 📁 Project Structure

```
nfgroup-frontend/
├── app/                          # Next.js App Router
│   ├── components/               # React Components
│   │   ├── forms/               # Form Components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── PropertyDetailsForm.tsx
│   │   │   ├── RentalDetailsForm.tsx
│   │   │   ├── MediaUploadForm.tsx
│   │   │   └── FormSubmission.tsx
│   │   └── layout/              # Layout Components
│   │       ├── HeroSection.tsx
│   │       ├── FormSection.tsx
│   │       └── Footer.tsx
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useFileUpload.ts
│   │   └── usePropertyForm.ts
│   ├── types/                   # TypeScript Definitions
│   │   ├── api.ts
│   │   ├── forms.ts
│   │   └── footer.ts
│   ├── constants/               # Application Constants
│   │   ├── api.ts
│   │   ├── footer.ts
│   │   └── forms.ts
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # Main Page
│   └── globals.css              # Global Styles
├── public/                      # Static Assets
│   ├── nfgroup_logo.svg
│   └── cert-*.png
├── .env.example                 # Environment Template
├── .gitignore                   # Git Ignore Rules
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind Configuration
├── tsconfig.json                # TypeScript Configuration
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **Strapi 5** backend instance running

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nfgroup-frontend.git
cd nfgroup-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Public API Endpoints (safe to expose to client)
NEXT_PUBLIC_API_SALE=https://your-strapi-instance.com/api/villa-for-sales
NEXT_PUBLIC_API_RENT=https://your-strapi-instance.com/api/villa-for-rents
NEXT_PUBLIC_API_UPLOAD=https://your-strapi-instance.com/api/upload

# Private Authentication Token (server-side only)
API_AUTH_TOKEN=your_strapi_auth_token_here
```

> **🔒 Security Note**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Sensitive data like API tokens should NOT use this prefix to prevent exposure in client-side code.

### 4. Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette

- **Primary**: `#7a1c1c` (Maroon)
- **Background**: `#F1F1F1` (Light Gray)
- **Text**: `#171717` (Dark Gray)
- **Accent**: `#e7dfd7` (Cream)

### Typography

- **Font Family**: Inter (Geist)
- **Headings**: 2xl, 4xl, 5xl
- **Body**: base, lg, sm

## 🔌 API Integration

### Architecture

The application uses a hybrid approach for API calls:

- **Client-side**: File uploads (to Strapi's upload endpoint)
- **Server-side**: Form submissions (via Next.js API routes for security)

This ensures sensitive authentication tokens are never exposed to the client.

### Backend Requirements

The application expects a Strapi 5 backend with the following content types:

#### Villa for Sales (`villa-for-sales`)
```json
{
  "first_name": "string",
  "last_name": "string",
  "email_address": "string",
  "phone_number": "string",
  "property_address": "string",
  "maps_long_lat": "string",
  "property_type": "string",
  "bedroom_number": "number",
  "bathroom_number": "number",
  "building_size": "number",
  "land_size": "number",
  "property_description": "text",
  "tenure": "string",
  "remaining_lease": "number",
  "building_permits": "string",
  "listing_price": "number",
  "villa_photos": ["media"]
}
```

#### Villa for Rents (`villa-for-rents`)
```json
{
  "first_name": "string",
  "last_name": "string",
  "email_address": "string",
  "phone_number": "string",
  "property_address": "string",
  "maps_long_lat": "string",
  "property_type": "string",
  "bedroom_number": "number",
  "bathroom_number": "number",
  "building_size": "number",
  "land_size": "number",
  "property_description": "text",
  "rental_type": "string",
  "managed_property": "boolean",
  "company_name": "string",
  "rental_price": "number",
  "rental_period": "string",
  "villa_photos": ["media"]
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Add proper error handling
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is proprietary software owned by NF Group.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ by Zapra Gartiast (zapra@gravitasi.co.id)**
