// DEMO DATA ONLY. Replace with fetch('/api/leads') once the Flask API is ready.
const sources = ['Website','Property Listings','Paid Ads','Referral','Campaigns']
const statuses = ['New','Contacted','Interested','Converted','Not Interested']
const names = ['Aarav Mehta','Priya Nair','Rohan Gupta','Ishita Verma','Kabir Singh','Ananya Rao','Vikram Joshi','Neha Kapoor','Arjun Malhotra','Sneha Iyer','Rahul Bansal','Meera Shah','Dev Khanna','Tara Menon','Nikhil Jain','Pooja Desai','Sahil Arora','Divya Pillai','Karan Chopra','Riya Sethi','Amit Tiwari','Kavya Reddy','Harsh Agarwal','Simran Kaur']
export const category = s => (s >= 70 ? 'Hot' : s >= 40 ? 'Warm' : 'Cold')
export const leads = names.map((name, i) => {
  const score = (i * 37 + 11) % 100
  return { id: i + 1, name, email: name.toLowerCase().replace(' ', '.') + '@example.com',
    source: sources[i % 5], budget: `₹${40 + (i % 6) * 15}L – ₹${60 + (i % 6) * 20}L`,
    score, category: category(score), status: statuses[(i * 3) % 5],
    lastActivity: `${(i % 7) + 1}d ago`, created: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`, notes: '' }
})
export const SOURCES = sources
export const STATUSES = statuses
export const activityTrend = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => ({ day: d, events: [42, 55, 61, 48, 70, 35, 29][i] }))
