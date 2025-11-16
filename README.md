# Digital Menu Management System

**PLEASE FIND THE ATTACHED VIDEOS IN THE BOTTOM OF THIS FILE**

**Deployed App**: (https://menu-management-t3-app.vercel.app/)

## Overview
A full-stack TypeScript application for managing restaurant digital menus with QR code generation and public menu display.

## Approach

I built this application using the T3 Stack (Next.js, tRPC, Prisma, React Query, Tailwind CSS) to create a type-safe, modern web application.

### Key Technical Decisions:

1. **React Query Integration for state and auth management**: Leveraged React Query through tRPC for automatic caching and state management
2. **Zod for API input validation**: Chose tRPC over REST for end-to-end type safety without code generation
3. **Component Architecture**: Broke down complex components into smaller, reusable pieces
4. **Auth Cookie**: Used cookie based auth for seemless experience

### Project Structure:
```
src/
├── app/ # Next.js App Router pages
├── components/ # Reusable UI components
├── server/
│ ├── api/
│ │ ├── routers/ # tRPC API routers
│ │ ├── root.ts # Main router
│ │ └── trpc.ts # tRPC setup
│ └── db.ts # Prisma client
└── utils/ # Helper functions and tRPC client
```
## IDE Used

VSCode

## AI Tools Used

**Primary Tool**: Perplexity and ChatGPT

### Example Prompts Used:

1. "Create a tRPC router for restaurant CRUD operations with Prisma"
2. "Update the DishCard component to show price and dish type with icons"
3. "Add QR code generation for menu sharing with download functionality"
4. "Create a modal component that closes when clicking outside"
5. "Break down the DishTab component into smaller, reusable components"
6. How to wrap app in tRPC while using React Query for context and cookies
### AI Tool Helpfulness:

**Helpful aspects:**
- Rapid component scaffolding
- TypeScript type definitions
- tRPC router setup and integration
- Tailwind CSS styling patterns
- Problem-solving for specific errors

**Mistakes Identified and Corrected:**
1. **Backdrop opacity issue**: AI suggested `bg-transparent bg-opacity-10` which doesn't work; corrected to proper RGBA values
2. **Optional chaining**: Missing optional chaining for `dish.dishCategories?.map()` causing undefined errors
3. **Modal z-index conflicts**: Had to adjust z-index hierarchy for proper layering
4. **Spice level display**: Expression `spiceLevel && spiceLevel > 0` incorrectly handled 0 values; changed to `(spiceLevel ?? 0) > 0`
5. **Component prop mismatches**: AI sometimes didn't use the latest component versions; had to manually sync
6. **Property any**: Any code given was not typesafe and was set any, so had to import models manually from Prisma Client

## Edge Cases Handled

### 1. **Data Validation**
- Empty category/dish lists show appropriate empty states
- Price validation (must be > 0)
- Category requirement before creating dishes
- Email format validation for OTP system

### 2. **User Experience**
- Description truncation with "read more" for long text
- Responsive design for mobile and desktop
- Loading states during data fetching
- Error messages for failed operations

### 3. **Authentication**
- OTP expiration (15 minutes)
- Verification code cleanup after use
- Protected routes requiring authentication
- Session management

### 4. **Null/Undefined Handling**
- Optional chaining for nested objects
- Fallback values for missing data

### 5. **Modal Interactions**
- Click outside to close functionality
- Preventing event propagation inside modal
- Smooth scrolling to category sections

## Known Limitations (Time Constraints)

### 1. **Image Upload**
- Currently using base64 encoding; would implement cloud storage (Cloudflare R2/AWS S3) for production
- No image compression or optimization
- File size limits not enforced

### 2. **Error Handling**
- Using basic `alert()` for errors; would implement toast notifications
- No retry logic for failed API calls
- Limited error logging and monitoring

### 3. **Performance Optimizations**
- Could implement infinite scroll for large dish lists
- Image lazy loading not implemented
- No pagination for restaurants/categories

### 4. **Authentication**
- No password recovery flow
- Session persistence could be improved
- No two-factor authentication option

### 5. **Accessibility**
- Keyboard navigation for modals needs improvement
- Screen reader support not fully tested
- Focus management in modals could be better

## How to Run Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (`.env`):
DATABASE_URL="your-postgres-url"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

text
4. Run Prisma migrations: `npx prisma db push`
5. Start development server: `npm run dev`

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, Prisma ORM
- **Database**: PostgreSQL
- **State Management**: TanStack Query (React Query)
- **Authentication**: Custom OTP system
- **Deployment**: Vercel
- **Additional**: Zod (validation), qrcode.react (QR generation)

## Future Enhancements

1. Multi-language support for menus
2. Analytics dashboard for menu views
3. Order management integration
4. Menu customization themes
5. Allergen information tracking
6. Nutritional information display


## Important for Testing
- Please Enter Otp 999999 because the current otp is sent via resend.com and it was only allowing a testing account, below is the link for the uploaded video of working OTP system 

Link to tutorials: https://drive.google.com/drive/folders/1DcXFiQclxBPre2NxzB7E41lx8NCNjuxm?usp=sharing
