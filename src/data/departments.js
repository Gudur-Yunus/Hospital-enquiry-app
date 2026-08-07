// Departments data mapped to 3D anatomical zones and general hospital navigation
export const departments = [
  {
    id: 'general-opd',
    nameEn: 'General OPD & Neurology',
    nameHi: 'सामान्य ओपीडी और न्यूरोलॉजी',
    nameTe: 'జనరల్ OPD & న్యూరాలజీ',
    icon: 'Stethoscope',
    floor: 1,
    room: '102',
    color: '#06B6D4',
    zone: 'head',
    doctorOnDuty: {
      en: 'Dr. Rajesh Verma (Neurologist)',
      hi: 'डॉ. राजेश वर्मा (न्यूरोलॉजिस्ट)',
      te: 'డా. రాజేష్ వర్మ (న్యూరాలజిస్ట్)',
    },
    estimatedWaitMins: 10,
    activeTokensCount: 8,
    direction: {
      en: 'Take Elevator to Floor 1, Turn Left to Wing A',
      hi: 'लिफ्ट से पहली मंज़िल पर जाएं, विंग A की ओर बाएं मुड़ें',
      te: 'లిఫ్ట్ ద్వారా 1వ అంతస్తుకు వెళ్లి, ఎడమవైపు వింగ్ A వైపు వెళ్ళండి',
    },
    symptoms: [
      { id: 'headache', icon: '🧠', en: 'Severe Headache / Migraine', hi: 'तीव्र सिरदर्द / माइग्रेन', te: 'తీవ్ర తలనొప్పి / మైగ్రేన్' },
      { id: 'dizziness', icon: '🌀', en: 'Dizziness / Vertigo', hi: 'चक्कर आना / संतुलन बिगड़ना', te: 'తలతిరుగుట / కళ్లు తిరగడం' },
      { id: 'vision', icon: '👁️', en: 'Blurred Vision / Eye Pain', hi: 'धुंधला दिखना / आंखों में दर्द', te: 'మసకగా కనిపించడం / కంటి నొప్పి' },
      { id: 'fever', icon: '🌡️', en: 'High Fever & Chills', hi: 'तेज बुखार और ठंड लगना', te: 'తీవ్ర జ్వరం & చలి' },
      { id: 'ear', icon: '👂', en: 'Ear Ache / Infection', hi: 'कान में तेज दर्द या संक्रमण', te: 'చెవి నొప్పి / ఇన్ఫెక్షన్' },
    ],
  },
  {
    id: 'cardiology',
    nameEn: 'Cardiology & Pulmonology',
    nameHi: 'हृदयरोग और फेफड़े विभाग',
    nameTe: 'కార్డియాలజీ & గుండె, ఊపిరితిత్తులు',
    icon: 'Heart',
    floor: 2,
    room: '204',
    color: '#F43F5E',
    zone: 'chest',
    doctorOnDuty: {
      en: 'Dr. Priya Sharma (Cardiologist)',
      hi: 'डॉ. प्रिया शर्मा (कार्डियोलॉजिस्ट)',
      te: 'డా. ప్రియా శర్మ (కార్డియాలజిస్ట్)',
    },
    estimatedWaitMins: 12,
    activeTokensCount: 14,
    direction: {
      en: 'Take Main Lift to Floor 2, Room 204 (Follow Red Line)',
      hi: 'मुख्य लिफ्ट से दूसरी मंज़िल, कमरा 204 (लाल रेखा का अनुसरण करें)',
      te: 'ప్రధాన లిఫ్ట్ ద్వారా 2వ అంతస్తు, గది 204 (ఎరుపు లైన్ అనుసరించండి)',
    },
    symptoms: [
      { id: 'chest_pain', icon: '❤️', en: 'Chest Pain / Tightness', hi: 'सीने में दर्द या भारीपन', te: 'ఛాతీ నొప్పి / బిగుతుగా ఉండటం' },
      { id: 'breath', icon: '🫁', en: 'Shortness of Breath', hi: 'सांस लेने में तकलीफ या घबराहट', te: 'శ్వాస ఆడకపోవడం' },
      { id: 'palpitations', icon: '💓', en: 'Rapid Heart Palpitations', hi: 'दिल की धड़कन तेज होना', te: 'గుండె వేగంగా కొట్టుకోవడం' },
      { id: 'cough', icon: '😮‍💨', en: 'Persistent Deep Cough', hi: 'लगातार गंभीर खांसी / कफ', te: 'తీవ్రమైన దీర్ఘకాల దగ్గు' },
    ],
  },
  {
    id: 'gastro',
    nameEn: 'Gastroenterology & Abdomen',
    nameHi: 'गैस्ट्रोएंटरोलॉजी (उदर व पाचन)',
    nameTe: 'గ్యాస్ట్రోఎంటరాలజీ & ఉదర వ్యాధులు',
    icon: 'Activity',
    floor: 1,
    room: '108',
    color: '#F59E0B',
    zone: 'stomach',
    doctorOnDuty: {
      en: 'Dr. Anil Mehta (Gastroenterologist)',
      hi: 'डॉ. अनिल मेहता (पेट रोग विशेषज्ञ)',
      te: 'డా. అనిల్ మెహతా (జీర్ణకోశ నిపుణుడు)',
    },
    estimatedWaitMins: 8,
    activeTokensCount: 6,
    direction: {
      en: 'Ground Floor Corridor B, Straight to Room 108',
      hi: 'भूतल कॉरिडोर B, सीधे कमरा 108 पर जाएं',
      te: 'గ్రౌండ్ ఫ్లోర్ కారిడార్ B, నేరుగా గది 108కి వెళ్ళండి',
    },
    symptoms: [
      { id: 'stomach_ache', icon: '⚡', en: 'Acute Abdominal Pain', hi: 'पेट में अचानक तेज मरोड़/दर्द', te: 'కడుపులో తీవ్రమైన నొప్పి' },
      { id: 'nausea', icon: '🤢', en: 'Nausea & Vomiting', hi: 'उल्टी और जी मिचलाना', te: 'వాంతులు & వికారం' },
      { id: 'acidity', icon: '🔥', en: 'Severe Acidity & Heartburn', hi: 'तीव्र एसिडिटी और सीने में जलन', te: 'తీవ్రమైన ఎసిడిటీ / మంట' },
      { id: 'digestion', icon: '🚽', en: 'Food Poisoning / Diarrhea', hi: 'फूड पॉइजनिंग / दस्त', te: 'విరేచనాలు / ఫుడ్ పాయిజనింగ్' },
    ],
  },
  {
    id: 'orthopedics',
    nameEn: 'Orthopedics & Joint Care',
    nameHi: 'अस्थिरोग (हड्डियाँ और जोड़)',
    nameTe: 'ఆర్థోపెడిక్స్ & ఎముకలు, కీళ్ళు',
    icon: 'Bone',
    floor: 3,
    room: '301',
    color: '#10B981',
    zone: 'limbs',
    doctorOnDuty: {
      en: 'Dr. S. K. Reddy (Orthopedic Surgeon)',
      hi: 'डॉ. एस. के. रेड्डी (अस्थि शल్యचिकित्सक)',
      te: 'డా. ఎస్. కె. రెడ్డి (ఆర్థోపెడిక్ సర్జన్)',
    },
    estimatedWaitMins: 15,
    activeTokensCount: 18,
    direction: {
      en: 'Take Ramp/Lift to Floor 3, Bone & Joint Center',
      hi: 'रैंप या लिफ्ट से तीसरी मंज़िल, बोन एंड जॉइंट सेंटर जाएं',
      te: 'ర్యాంప్ లేదా లిఫ్ట్ ద్వారా 3వ అంతస్తు, ఎముకల కేంద్రానికి వెళ్ళండి',
    },
    symptoms: [
      { id: 'fracture', icon: '🦴', en: 'Bone Fracture / Sprain', hi: 'हड्डी टूटना / मोच या सूजन', te: 'ఎముక విరుగుట / బెణుకు' },
      { id: 'knee', icon: '🦵', en: 'Knee & Joint Swelling', hi: 'घुटने और जोड़ों में दर्द व सूजन', te: 'మోకాలి నొప్పి & వాపు' },
      { id: 'mobility', icon: '🚶', en: 'Difficulty in Walking', hi: 'चलने-फिरने में असमर्थता', te: 'నడవడంలో తీవ్ర ఇబ్బంది' },
      { id: 'back', icon: '⚡', en: 'Severe Lower Back Pain', hi: 'कमर और रीढ़ की हड्डी में दर्द', te: 'తీవ్రమైన నడుము నొప్పి' },
    ],
  },
  {
    id: 'pediatrics',
    nameEn: 'Pediatrics (Child Care)',
    nameHi: 'बाल रोग विभाग',
    nameTe: 'పీడియాట్రిక్స్ (చిన్నపిల్లల వార్డు)',
    icon: 'Baby',
    floor: 2,
    room: '210',
    color: '#0891B2',
    direction: {
      en: 'Floor 2, West Wing, Child Health Unit',
      hi: 'दूसरी मंज़िल, वेस्ट विंग, शिशु स्वास्थ्य इकाई',
      te: '2వ అంతస్తు, వెస్ట్ వింగ్, పిల్లల వార్డు',
    },
  },
  {
    id: 'billing',
    nameEn: 'Ayushman Bharat & Billing Counter',
    nameHi: 'आयुष्मान भारत एवं बिलिंग काउंटर',
    nameTe: 'ఆయుష్మాన్ భారత్ & బిల్లింగ్ కౌంటర్',
    icon: 'Receipt',
    floor: 0,
    room: 'Desk 4',
    color: '#059669',
    direction: {
      en: 'Ground Floor Main Lobby, Beside Reception',
      hi: 'भूतल मुख्य लॉबी, रिसेप्शन के पास',
      te: 'గ్రౌండ్ ఫ్లోర్ మెయిన్ లాబీ, రిసెప్షన్ ప్రక్కన',
    },
  },
  {
    id: 'pharmacy',
    nameEn: 'Free Government Pharmacy',
    nameHi: 'निःशुल्क सरकारी औषधि केंद्र',
    nameTe: 'ఉచిత ప్రభుత్వ ఔషధ కేంద్రం',
    icon: 'Pill',
    floor: 0,
    room: 'Gate 2',
    color: '#D97706',
    direction: {
      en: 'Ground Floor, Exit Gate 2',
      hi: 'भूतल, निकास द्वार 2 के पास',
      te: 'గ్రౌండ్ ఫ్లోర్, నిష్క్రమణ గేట్ 2',
    },
  },
];

export const getDeptName = (dept, lang) => {
  if (!dept) return '';
  if (lang === 'hi') return dept.nameHi;
  if (lang === 'te') return dept.nameTe;
  return dept.nameEn;
};

export const getDeptById = (id) => departments.find((d) => d.id === id);

export const getDeptByZone = (zoneId) => departments.find((d) => d.zone === zoneId) || departments[0];
