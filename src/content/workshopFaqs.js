// Practical answers shared by the FAQ page and its initial HTML.
export const workshopFaqs = [
  { question: 'Can I make wedding rings or marriage bands with my partner?', answer: 'You can ask us to plan a guided session for two wedding bands. Send your designs, ring sizes, metal preferences and deadline before booking. We confirm which stages you can make, what the artisan completes, the total cost and when the rings will be ready.' },
  { question: 'Can I design an engagement ring at the workshop?', answer: 'Yes, start by sending your design idea, preferred metal and gemstone. Intricate settings need specialist work and may require more than one visit. An artisan reviews feasibility, availability and completion time before you commit.' },
  { question: 'Do you make silver and gold jewellery?', answer: 'Our ring-making experiences include silver crafting. Gold designs are discussed on request. Confirm the exact metal purity, included weight, additional material charges and price basis for your design before booking.' },
  { question: 'Are gemstones, engraving and extra metal included?', answer: 'Inclusions depend on the workshop and design. Ask for a written breakdown of the metal allowance, stone, setting, engraving and any additional work. A reference photo helps us explain what your session will involve.' },
  { question: 'Will I make the whole ring myself?', answer: 'Your involvement depends on the design, techniques and session. Tell us if doing as much as possible yourself is your priority. We can recommend a simpler project and explain which technical stages an artisan will handle for safety and accuracy.' },
  { question: 'Can I bring a gemstone or old ring to use in a new design?', answer: 'Send clear photos and any stone or metal documentation first. An artisan needs to review the condition, material and proposed design. Bringing a piece does not guarantee that it can be reused or set during your session.' },
  { question: 'How do I choose my ring size?', answer: 'The intended finger should be measured for the width and profile you want. Bring a well-fitting ring if useful, and tell us which sizing system you know. A home measurement is a starting point; confirm the fit with the artisan before making.' },
  { question: 'Is a ring-making workshop a good activity before a flight?', answer: 'Only if your itinerary allows enough time. Tell us your flight and onward travel plans before requesting a session. Allow time for the full workshop and a separate airport journey; we do not promise airport transfer times or completion before a flight without reviewing your plans.' },
  { question: 'Where is The Ring Experience in Negombo?', answer: 'Find us at 63/1 Porutota Road, Negombo 11500, Sri Lanka. Use the Google Maps link for directions and contact us before travelling to confirm your session and arrival details.' },
  { question: 'Does submitting a request confirm my booking?', answer: 'No. A form submission or WhatsApp message starts your inquiry. Your session is confirmed only when we agree the date, availability, design and booking details with you.' },
];

export function mergeWorkshopFaqs(items = []) {
  const valid = items.filter(item => item?.question && item?.answer);
  const seen = new Set(valid.map(item => item.question.trim().toLowerCase()));
  return [...valid, ...workshopFaqs.filter(item => !seen.has(item.question.toLowerCase()))];
}
