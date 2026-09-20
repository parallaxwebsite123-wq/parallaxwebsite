import { supabase, isSupabaseConfigured } from './supabaseClient';
import { BuildSampleState } from './sampleBuilderState';

export interface CustomerDetails {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  businessType: string;
  country: string;
  address: string;
  city: string;
  zip: string;
  notes?: string;
}

export interface SampleRequestPayload {
  product_details: BuildSampleState;
  customer_details: CustomerDetails;
}

export interface SampleRequestItem {
  id: string;
  product_details: BuildSampleState;
  customer_details: CustomerDetails;
  status: 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  created_at: string;
}

export async function submitSampleRequest(payload: SampleRequestPayload): Promise<SampleRequestItem> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase client is not configured.');
  }

  const insertData = {
    product_details: payload.product_details,
    customer_details: payload.customer_details,
    status: 'new'
  };

  const { data, error } = await supabase
    .from('sample_requests')
    .insert([insertData])
    .select()
    .single();

  if (error || !data) {
    console.error('Error submitting sample request to Supabase:', error);
    throw new Error(error?.message || 'Failed to submit sample request. Please try again.');
  }

  return data as SampleRequestItem;
}

export async function fetchAdminSampleRequests(): Promise<SampleRequestItem[]> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase
    .from('sample_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sample requests for admin:', error);
    throw new Error(error.message || 'Failed to fetch sample requests.');
  }

  return (data || []) as SampleRequestItem[];
}

export async function updateSampleRequestStatus(id: string, status: SampleRequestItem['status']): Promise<SampleRequestItem> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase
    .from('sample_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error updating sample request status:', error);
    throw new Error(error?.message || 'Failed to update order status.');
  }

  return data as SampleRequestItem;
}
