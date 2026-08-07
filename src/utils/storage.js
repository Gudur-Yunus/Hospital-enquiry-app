const STORAGE_KEY = 'arogya_enquiries';

const SEED_ENQUIRIES = [
  {
    id: 'ENQ-8821',
    tokenNumber: 101,
    patientName: 'Ramesh Verma',
    phoneNumber: '9876543210',
    preferredLanguage: 'hi',
    category: 'appointment',
    department: 'cardiology',
    description: 'Severe chest tightness during brisk walking for 3 days.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: 'ENQ-8822',
    tokenNumber: 102,
    patientName: 'Ananya Reddy',
    phoneNumber: '9440123456',
    preferredLanguage: 'te',
    category: 'appointment',
    department: 'neurology',
    description: 'Severe migraine headache with blurred vision on right eye.',
    status: 'received',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'ENQ-8823',
    tokenNumber: 103,
    patientName: 'K. Venkateswarlu',
    phoneNumber: '9848011223',
    preferredLanguage: 'te',
    category: 'appointment',
    department: 'orthopedics',
    description: 'Right knee acute swelling and walking discomfort.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
  {
    id: 'ENQ-8824',
    tokenNumber: 104,
    patientName: 'Priya Sharma',
    phoneNumber: '9811223344',
    preferredLanguage: 'en',
    category: 'billing',
    department: 'gastroenterology',
    description: 'Ayushman Bharat cashless clearance for endoscopy.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
  },
];

export const getEnquiries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    return parsed;
  } catch {
    return SEED_ENQUIRIES;
  }
};

export const saveEnquiry = (enquiry) => {
  const existing = getEnquiries();
  const nextToken = existing.length > 0 ? Math.max(...existing.map((e) => e.tokenNumber || 100)) + 1 : 101;
  const newRecord = {
    ...enquiry,
    id: enquiry.id || `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
    tokenNumber: enquiry.tokenNumber || nextToken,
    status: enquiry.status || 'received',
    createdAt: enquiry.createdAt || new Date().toISOString(),
  };
  existing.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return newRecord;
};

export const updateEnquiryStatus = (id, status) => {
  const existing = getEnquiries();
  const updated = existing.map((e) => (e.id === id ? { ...e, status } : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getEnquiryByToken = (tokenNumber) => {
  const all = getEnquiries();
  const query = String(tokenNumber).trim().toUpperCase();
  return all.find(
    (e) => String(e.tokenNumber) === query || String(e.id).toUpperCase() === query
  ) || null;
};
