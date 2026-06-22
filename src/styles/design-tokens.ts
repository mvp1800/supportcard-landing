export const colors = {
  brand:      '#4B9FD8',
  brandDark:  '#3A8BC4',
  brandLight: '#E8F4FB',
  heading:    '#001F3F',
  body:       '#4A4A4A',
  muted:      '#999999',
  surface:    '#F8FAFB',
  white:      '#FFFFFF',
  border:     '#E0E8F0',
  success:    '#2ECC71',
} as const

export const gradients = {
  brand:   'linear-gradient(135deg, #3A8BC4 0%, #4B9FD8 100%)',
  page:    'linear-gradient(155deg, #daeef8 0%, #edf6fb 35%, #f5fafe 100%)',
  text:    'linear-gradient(135deg, #4B9FD8 0%, #2ecc71 100%)',
  card:    'linear-gradient(160deg, #ffffff 0%, #FAFBFE 100%)',
  overviewCard: 'linear-gradient(135deg, #4B9FD8 0%, #6CBAE8 100%)',
} as const

export const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  size: {
    caption: '13px',
    eyebrow: '14px',
    body:    '16px',
    h3:      '16px',
    h2:      '42px',
    h1:      '56px',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
} as const

export const spacing = {
  1: '8px', 2: '16px', 3: '24px', 4: '32px',
  5: '40px', 6: '48px', 7: '56px', 8: '64px', 10: '80px',
} as const

export const radius = {
  input:  '6px',
  button: '8px',
  card:   '12px',
  pill:   '9999px',
} as const

export const shadows = {
  card:      '0 2px 8px rgba(0,0,0,0.04)',
  cardHover: '0 12px 32px rgba(75,159,216,0.14)',
  button:    '0 8px 24px rgba(75,159,216,0.4)',
  focus:     '0 0 0 3px rgba(75,159,216,0.12)',
  phone:     '0 30px 80px rgba(0,0,0,0.22)',
} as const
