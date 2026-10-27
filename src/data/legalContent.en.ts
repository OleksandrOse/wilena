import { LegalDoc, LegalSection } from './legalContent';

// Англійські версії юридичних документів. Німецькі тексти (legalContent.ts) не змінюються.
export interface LegalDocEn extends LegalDoc {
  note?: string;
}

const NOTE = 'Convenience translation. Only the German version is legally binding.';

const CHECK_TIMES: LegalSection = {
  heading: 'Check-in & Check-out',
  blocks: [
    { type: 'p', text: 'Summer season – May to end of September' },
    { type: 'lines', items: ['Check-in from 16:00', 'Check-out by 10:00'] },
    { type: 'p', text: 'Winter season – October to end of April' },
    { type: 'lines', items: ['Check-in from 15:00', 'Check-out by 11:00'] },
    { type: 'p', text: 'Early check-in and late check-out are possible subject to availability and prior agreement.' },
  ],
};

const GUEST_COUNT: LegalSection = {
  heading: 'Number of guests',
  blocks: [
    { type: 'p', text: 'The apartment may only be used by the number of people stated at the time of booking. Additional overnight guests are only permitted after prior agreement.' },
  ],
};

export const stornoDocEn: LegalDocEn = {
  slug: 'stornobedingungen',
  title: 'Booking & Cancellation Terms',
  note: NOTE,
  sections: [
    {
      heading: 'Flexible Rate',
      blocks: [{ type: 'p', text: 'For guests who want to stay flexible.' }],
    },
    {
      heading: 'Cancellation terms',
      blocks: [
        { type: 'list', items: [
          'Free cancellation is possible up to 30 days before arrival.',
          'For cancellations 29 to 14 days before arrival, 50 % of the total price will be charged.',
          'For cancellations 13 to 7 days before arrival, 70 % of the total price will be charged.',
          'For cancellations within 6 days before arrival and in case of no-show, 100 % of the total price will be charged.',
          'In case of early departure, there is no refund for nights not used.',
        ] },
      ],
    },
    {
      heading: 'Changes to the booking',
      blocks: [{ type: 'p', text: 'Changes to the travel period or length of stay are possible subject to availability and prior agreement. Any price changes will be taken into account accordingly.' }],
    },
    CHECK_TIMES,
    GUEST_COUNT,
    {
      heading: 'Prices & additional services',
      blocks: [{ type: 'p', text: 'The prices stated at the time of booking apply. Additional services may be offered subject to availability and, where applicable, for an additional charge.' }],
    },
    {
      heading: 'Discounts & special offers',
      blocks: [{ type: 'p', text: 'Discounts and special offers cannot be combined with one another. The rate most favourable to the guest applies in each case, unless stated otherwise for the respective offer.' }],
    },
    {
      heading: 'Non-Refundable Rate – 10 % cheaper',
      blocks: [
        { type: 'p', text: 'Plan safely & save. Book at the lower Non-Refundable rate and save 10 % on the regular nightly price.' },
        { type: 'list', items: [
          '10 % price advantage',
          'Payment at booking',
          'Non-cancellable and non-refundable',
        ] },
        { type: 'p', text: 'The total amount is due at booking. In the event of cancellation, change or no-show, no refund will be given. The Non-Refundable rate cannot be combined with other discounts or special offers.' },
      ],
    },
  ],
};

export const hausordnungDocEn: LegalDocEn = {
  slug: 'hausordnung',
  title: 'House Rules',
  note: NOTE,
  intro: 'Welcome to Wilena Apartments. So that our guests and residents feel comfortable and can enjoy a pleasant stay, we kindly ask you to observe our house rules.',
  sections: [
    CHECK_TIMES,
    { heading: 'Quiet hours', blocks: [{ type: 'p', text: 'Please be considerate of other guests and residents. Quiet hours apply from 22:00 to 07:00. During this time, please avoid noise in the apartments and in the common areas.' }] },
    { heading: 'Smoking', blocks: [{ type: 'p', text: 'Smoking is not permitted in the apartments. Please use suitable outdoor areas only.' }] },
    { heading: 'Parties & events', blocks: [{ type: 'p', text: 'Parties, events and larger gatherings are not permitted in the apartments.' }] },
    GUEST_COUNT,
    { heading: 'Pets', blocks: [{ type: 'p', text: 'Pets are only permitted upon prior request and confirmation. Any additional costs will be agreed before arrival.' }] },
    { heading: 'Cleanliness & waste', blocks: [{ type: 'p', text: 'Please leave the apartment in a reasonable and tidy condition. Please separate waste according to the designated bins. Waste must be disposed of in the containers provided.' }] },
    { heading: 'Inventory & damage', blocks: [{ type: 'p', text: 'Please treat the apartment, furnishings and equipment with care. If anything is damaged or a defect occurs during your stay, please let us know as soon as possible.' }] },
    { heading: 'Keys', blocks: [{ type: 'p', text: 'Please handle the keys you are given with care. On departure, the key must be returned to the designated key box. Please use the key box that was communicated to you. If a key is lost, the actual costs for replacement or necessary security measures may be charged.' }] },
    { heading: 'Safety', blocks: [{ type: 'p', text: 'When leaving the apartment, please close windows and doors and switch off the stove, air conditioning and any electrical appliances that are not needed. Please pay particular attention to making sure that hobs and air conditioning units are switched off when you leave the apartment.' }] },
  ],
  outro: 'Thank you for your consideration and understanding. We wish you a pleasant stay at Wilena Apartments.',
};

export const impressumDocEn: LegalDocEn = {
  slug: 'impressum',
  title: 'Legal Notice (Impressum)',
  note: NOTE,
  sections: [
    {
      heading: 'Wilena Apartments',
      blocks: [
        { type: 'lines', items: [
          'Business owner: Dr. Elena Schollenberg',
          'Warmbader Allee 53',
          '9504 Villach',
          'Austria',
        ] },
        { type: 'lines', items: ['Phone: +43 664 737 48 88', 'E-mail: wilena@speed.at'] },
      ],
    },
  ],
};

export const datenschutzDocEn: LegalDocEn = {
  slug: 'datenschutz',
  title: 'Privacy Policy',
  note: NOTE,
  sections: [
    {
      heading: 'Controller',
      blocks: [
        { type: 'lines', items: [
          'Wilena Apartments',
          'Dr. Elena Schollenberg',
          'Warmbader Allee 53',
          '9504 Villach',
          'Austria',
        ] },
        { type: 'lines', items: ['E-mail: wilena@speed.at', 'Phone: +43 664 737 48 88'] },
      ],
    },
    { heading: 'Protection of your personal data', blocks: [{ type: 'p', text: 'The protection of your personal data is important to us. Personal data that you send us in the course of an enquiry, contact or booking is treated confidentially and in accordance with the applicable data protection regulations.' }] },
    { heading: 'Contacting us', blocks: [{ type: 'p', text: 'If you contact us via the contact form, e-mail or telephone, we process the data you provide solely to handle your enquiry and for further communication with you.' }] },
    { heading: 'Booking data', blocks: [
      { type: 'p', text: 'As part of a booking request or booking, we process the personal data required for this, in particular your name, contact details and the booking information required to carry out the stay.' },
      { type: 'p', text: 'Your personal data is used solely to process your enquiry, handle your booking and carry out your stay, and to comply with legal obligations.' },
    ] },
    { heading: 'Disclosure of data', blocks: [{ type: 'p', text: 'Personal data is only passed on to third parties where this is necessary to process the booking or to comply with legal obligations, or where you have given your consent.' }] },
    { heading: 'Storage period', blocks: [{ type: 'p', text: 'Personal data is only stored for as long as is necessary for the respective purposes or statutory retention obligations apply.' }] },
    { heading: 'Your rights', blocks: [
      { type: 'p', text: 'Within the framework of the statutory provisions, you have in particular the right of access, rectification, erasure, restriction of processing and data portability and, where applicable, a right to object.' },
      { type: 'p', text: 'If you have any questions about data protection, you can contact us at any time: wilena@speed.at' },
    ] },
    {
      heading: 'Cookies & local storage',
      blocks: [
        { type: 'p', text: 'This website uses only technically necessary storage mechanisms (e.g. cookies or local storage in the browser) that are required for the operation of the website. This includes in particular logging in to the internal administration area.' },
        { type: 'p', text: 'This data is not used for tracking, analysis or advertising purposes. No analytics or marketing cookies are used. No consent is required for technically necessary storage.' },
        { type: 'p', text: 'You can delete or block cookies and locally stored data at any time in your browser settings. This may restrict certain functions of the website.' },
      ],
    },
    {
      heading: 'External links',
      blocks: [
        { type: 'p', text: 'Our website contains links to external services (e.g. Google Maps, Instagram, Facebook, WhatsApp, Telegram). When you click on them, you leave our website. The privacy policies of the respective provider apply to data processing on those sites.' },
      ],
    },
  ],
};

export const cookiesDocEn: LegalDocEn = {
  slug: 'cookies',
  title: 'Cookies',
  note: NOTE,
  intro: 'Here we inform you how this website uses cookies and comparable technologies.',
  sections: [
    {
      heading: 'What are cookies?',
      blocks: [{ type: 'p', text: 'Cookies are small text files that are stored on your device. Local storage in the browser (Local Storage) serves similar functions.' }],
    },
    {
      heading: 'Technically necessary storage',
      blocks: [
        { type: 'p', text: 'We use only technically necessary storage mechanisms that are required for the operation of the website, in particular for logging in to the internal administration area. No consent is required for this.' },
      ],
    },
    {
      heading: 'No analytics or marketing cookies',
      blocks: [
        { type: 'list', items: [
          'No analytics or tracking services',
          'No marketing or advertising cookies',
          'No embedded maps or third-party content',
          'Fonts are provided locally',
        ] },
      ],
    },
    {
      heading: 'Managing cookies',
      blocks: [{ type: 'p', text: 'You can delete or block cookies and locally stored data at any time in your browser settings. This may restrict certain functions of the website.' }],
    },
    {
      heading: 'Further information',
      blocks: [{ type: 'p', text: 'Further information on the processing of personal data can be found in our privacy policy. If you have any questions, you can reach us at wilena@speed.at.' }],
    },
  ],
};

export const legalDocsEn: Record<string, LegalDocEn> = {
  stornobedingungen: stornoDocEn,
  hausordnung: hausordnungDocEn,
  impressum: impressumDocEn,
  datenschutz: datenschutzDocEn,
  cookies: cookiesDocEn,
};

