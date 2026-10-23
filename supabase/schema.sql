-- FixMate Supabase Schema Definition
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    locality TEXT NOT NULL,
    service_id TEXT NOT NULL,
    service_title TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    description TEXT NOT NULL,
    preferred_pro TEXT,
    estimated_fee TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous bookings insertion (public landing page)
CREATE POLICY "Allow public insert to bookings" 
ON public.bookings 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow anonymous read to bookings (for customer review)
CREATE POLICY "Allow public select on bookings" 
ON public.bookings 
FOR SELECT 
TO anon 
USING (true);

-- Allow delete for demo cleanup
CREATE POLICY "Allow public delete on bookings" 
ON public.bookings 
FOR DELETE 
TO anon 
USING (true);


-- 2. Create Inquiries / Contact Messages Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to inquiries" 
ON public.inquiries 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow public select on inquiries" 
ON public.inquiries 
FOR SELECT 
TO anon 
USING (true);
