# FixMate - On-Demand Home Repairs & Maintenance Marketplace (MVP)

A startup-grade, modern, and responsive MVP web application for **FixMate** — connecting homeowners with trusted local professionals for home repair and maintenance.

Target Launch Region: **Kadapa, Andhra Pradesh** (with regional expansion roadmap).

---

## 🚀 Features Overview

1. **Brand Identity & Header**:
   - Custom FixMate tool-inspired badge logo.
   - Smooth navigation: *Home, Services, How It Works, Pros, Why Us, Contact*.
   - Prominent **"Book a Service"** CTA and **"My Bookings"** viewer badge.
   - Localized status pill: *Live in Kadapa, AP • Expanding soon to Tirupati & Kurnool*.

2. **Hero Section**:
   - Headline: *"Reliable Home Repairs, Made Simple."*
   - Subheadline: *"Find trusted local professionals for all your home repair and maintenance needs."*
   - Interactive Quick-Search Widget: Filter by Service Category and Kadapa Neighborhood (*Apsara Circle, RTC Bus Stand Road, Maruthi Nagar, Yerramukkapalli, Prakash Nagar, etc.*).
   - Trust metrics: *⚡ 45-min emergency response*, *⭐ 4.85/5 rating*, *🛡️ Upfront pricing*.

3. **7 Core Services Grid**:
   - **Plumbing** (Leaking taps, pipes, pump motors, overhead tanks)
   - **Electrical Repairs** (Wiring, MCB tripping, ceiling fans, inverter lines)
   - **Carpentry** (Godrej locks, cupboard hinges, furniture restoration)
   - **Painting** (Water seepage patching, accent walls, full homes)
   - **AC Repair & Maintenance** (Jet-pump foam cleaning, gas charging)
   - **Appliance Repairs** (Washing machines, refrigerators, RO purifiers)
   - **Cleaning & Maintenance** (Deep sanitization, sump & water tank cleaning)
   - Each card features: photo, description, starting price in ₹, common issues list, and direct **Book Now** trigger.

4. **How It Works**:
   - Step 1: Choose the service you need
   - Step 2: Browse professionals and compare ratings and prices
   - Step 3: Book a convenient appointment

5. **Demo Professional Profiles**:
   - Curated sample profiles with experience, customer ratings, indicative prices in INR, and Kadapa locality tags.
   - Clearly labeled as demonstration profiles for prototype evaluation.

6. **Interactive Booking Flow**:
   - Validated fields: Name, 10-digit mobile number, Kadapa locality, service type, preferred date & time slot, problem description.
   - Immediate confirmation modal displaying a unique Booking Reference ID (`FXM-XXXXXX`), summary, and demo notice.
   - Persistent browser `localStorage` management with a drawer to inspect and delete saved appointments.

7. **Trust & Customer Reviews**:
   - Transparent pricing in rupees, no hidden charges, service guarantee, and sample customer feedback from Kadapa residents.

8. **Contact & WhatsApp Integration**:
   - Direct WhatsApp button configured with pre-filled inquiry text.
   - Working contact message form with local state persistence.
   - Easily configurable phone and email placeholders (`+91 98765 43210`, `support@fixmate.in`).

9. **Firebase Ready**:
   - Configured Firebase stub (`src/services/firebase.js`) designed to switch to live Cloud Firestore & Firebase Auth by simply adding your project credentials to `.env`.

---

## 💻 Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Optimized & lightweight)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Inter
- **State/Storage**: In-memory & `localStorage` (Firebase-ready adapter)

---

## 🛠️ Running Locally

1. **Clone or open the project folder:**
   ```bash
   cd "c:\Users\ankal\Desktop\antigravity project 1"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   👉 **http://localhost:5173/**

4. **Production Build test:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import the repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**. Your live FixMate landing page will be live in ~30 seconds.

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Choose your repository.
4. Set Build command: `npm run build`
5. Set Publish directory: `dist`
6. Click **Deploy Site**.

## 🔐 Owner Admin Panel

An in-app admin dashboard is accessible directly from the website header without needing to visit the Supabase dashboard:

- **Access**: Click **"Admin Panel"** in the top navigation bar (or **"Owner Admin"** in the top announcement bar).
- **Credentials**:
  - **Username**: `vasu549`
  - **Password**: `fixmate`
- **Features**:
  - Real-time list of all customer bookings from Supabase.
  - Search by customer name, phone number, locality in Kadapa, or service type.
  - Filter by status (*Confirmed, In Progress, Completed, Cancelled*).
  - Update booking status directly with live Supabase synchronization.
  - View all contact inquiries and customer messages with quick **Reply via WhatsApp** links.
  - Delete completed or test records.


### 1. Database Schema
Execute the pre-made SQL schema in your Supabase project:
1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor** > **New Query**
3. Paste and run the contents of [supabase/schema.sql](file:///c:/Users/ankal/Desktop/antigravity%20project%201/supabase/schema.sql)

This automatically provisions:
- `bookings` table with Row Level Security (RLS) policies
- `inquiries` table for contact requests

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Find these in Supabase Dashboard -> Project Settings -> API)*

> **Automatic Fallback:** Even without `.env` configured yet, FixMate runs with zero errors in local prototype mode, automatically switching to live Supabase the moment credentials are provided!

