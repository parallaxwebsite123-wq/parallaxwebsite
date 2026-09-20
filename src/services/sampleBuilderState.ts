export interface BuildSampleState {
  step1_direction: string;
  step2_category: string;
  step3_family: string;
  step3_notes: string;
  step3_target: string;
  step4_packaging: string;
  step4_details: string;
  step5_quantity: string;
  step5_timeline: string;
  step5_brand_type: string;
}

export const DEFAULT_SAMPLE_STATE: BuildSampleState = {
  step1_direction: 'Develop a completely custom fragrance from scratch',
  step2_category: 'Eau de Parfum',
  step3_family: 'Woody',
  step3_notes: '',
  step3_target: '',
  step4_packaging: 'Minimal Glass',
  step4_details: '',
  step5_quantity: '100 - 500 units (Pilot Run)',
  step5_timeline: 'ASAP (3-4 Months)',
  step5_brand_type: 'New Fragrance Brand'
};

const STORAGE_KEY = 'parallax_build_sample_state';

export function getStoredSampleState(): BuildSampleState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Normalize removed Extrait or invalid step 1 option
      if (parsed.step1_direction === 'Modify an existing marketplace formulation') {
        parsed.step1_direction = 'Develop a completely custom fragrance from scratch';
      }
      if (parsed.step2_category === 'Extrait') {
        parsed.step2_category = 'Eau de Parfum';
      }
      return { ...DEFAULT_SAMPLE_STATE, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to parse stored sample state from sessionStorage:', e);
  }
  return DEFAULT_SAMPLE_STATE;
}

export function saveStoredSampleState(state: BuildSampleState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save sample state to sessionStorage:', e);
  }
}

export function clearStoredSampleState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear sample state from sessionStorage:', e);
  }
}
