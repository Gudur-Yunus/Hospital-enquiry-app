// Seed data — 4 realistic enquiries across different statuses and categories
// Loaded into localStorage once on first app run (if empty)
import { getEnquiries } from '../utils/storage';

const SEED_KEY = 'arogya_seed_loaded_v1';

export const seedDemoData = () => {
  // Only seed once
  if (localStorage.getItem(SEED_KEY)) return;
  if (getEnquiries().length > 0) {
    localStorage.setItem(SEED_KEY, '1');
    return;
  }

  const now = Date.now();
  const seeds = [
    {
      id: 'TKN-0001',
      tokenNumber: 1,
      patientName: 'Ramaiah Venkatesh',
      phoneNumber: '9876543210',
      preferredLanguage: 'te',
      category: 'appointment',
      department: 'cardiology',
      description: 'Appointment at Cardiology on Mon, 11 Aug',
      status: 'resolved',
      createdAt: now - 1000 * 60 * 95, // 95 min ago
    },
    {
      id: 'TKN-0002',
      tokenNumber: 2,
      patientName: 'Sunita Devi',
      phoneNumber: '8765432109',
      preferredLanguage: 'hi',
      category: 'billing',
      department: 'billing',
      description: 'payment: Payment options for surgery bill',
      status: 'in_progress',
      createdAt: now - 1000 * 60 * 40, // 40 min ago
    },
    {
      id: 'TKN-0003',
      tokenNumber: 3,
      patientName: 'Mohammed Irfan',
      phoneNumber: '7654321098',
      preferredLanguage: 'en',
      category: 'appointment',
      department: 'orthopedics',
      description: 'Appointment at Orthopedics on Tue, 12 Aug',
      status: 'in_progress',
      createdAt: now - 1000 * 60 * 20, // 20 min ago
    },
    {
      id: 'TKN-0004',
      tokenNumber: 4,
      patientName: 'Lakshmi Priya',
      phoneNumber: '6543210987',
      preferredLanguage: 'te',
      category: 'billing',
      department: 'billing',
      description: 'insurance: Insurance query for maternity ward',
      status: 'received',
      createdAt: now - 1000 * 60 * 5, // 5 min ago
    },
  ];

  localStorage.setItem('arogya_enquiries', JSON.stringify(seeds));
  localStorage.setItem(SEED_KEY, '1');
};
