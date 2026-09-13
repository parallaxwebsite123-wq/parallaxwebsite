import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  source?: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

export const OEM_SERVICE_OPTIONS = [
  'White-label manufacturing',
  'Custom fragrance development',
  'Build a sample of my perfume',
  'Premium packaging',
  'Scalable manufacturing',
  'Multiple fragrance formats',
  'End-to-end product development'
];

export async function submitInquiry(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  source?: string;
}): Promise<Inquiry> {
  // Primary: Try Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const payload = {
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        service: data.service.trim(),
        source: data.source || 'Website Inquiry',
        status: 'new',
        created_at: new Date().toISOString()
      };

      const { data: insertedData, error } = await supabase
        .from('inquiries')
        .insert([payload])
        .select()
        .single();

      if (!error && insertedData) {
        // Sync local JSON backup asynchronously
        fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(() => {});

        return insertedData as Inquiry;
      }
      if (error) {
        console.warn('Supabase inquiry insert notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase inquiry submit error:', err);
    }
  }

  // Fallback / Dual API
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "We couldn't submit your query right now. Please try again.");
  }

  const result = await res.json();
  return result.inquiry;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Inquiry[];
      }
    } catch (err) {
      console.warn('Supabase fetchInquiries error:', err);
    }
  }

  try {
    const res = await fetch('/api/inquiries', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.inquiries || [];
    }
  } catch (err) {
    console.warn('Failed to fetch inquiries from API:', err);
  }
  return [];
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Promise<Inquiry> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        // Sync local backup
        fetch('/api/inquiries/status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status })
        }).catch(() => {});

        return data as Inquiry;
      }
    } catch (err) {
      console.warn('Supabase updateInquiryStatus error:', err);
    }
  }

  const res = await fetch('/api/inquiries/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to update inquiry status.');
  }

  const result = await res.json();
  return result.inquiry;
}
