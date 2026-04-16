

## Plan: Add WhatsApp Floating Button + Clean Up Contact Info

### What changes

**1. Add WhatsApp floating icon next to chat icon (`src/components/chat/ChatWidget.tsx`)**
- Add a new circular button (same size `w-14 h-14`, same styling as the chat toggle) positioned to the left of the chat button
- Uses a WhatsApp icon (using the `MessageCircle` icon or a custom WhatsApp SVG) 
- Links to `https://wa.me/15556395391` (the new number: +1 (555) 639-5391)
- Positioned at `right-[5.5rem]` so it sits directly left of the chat button

**2. Remove phone + WhatsApp from Footer Contact column (`src/components/Footer.tsx`)**
- Delete the phone link (`tel:+9715913426`) and WhatsApp link from the Contact column (lines 86-101)
- Keep only the email link
- Also remove `Phone` and `MessageSquare` from imports if no longer used elsewhere in the file (MessageSquare is still used in social icons column)

**3. Remove phone + WhatsApp from Contact page (`src/pages/Contact.tsx`)**
- Delete the phone link (line 169-170) and WhatsApp link (lines 172-173) from the Direct Contact section
- Keep only the email link
- Clean up unused imports (`Phone`)

**4. Update Footer social WhatsApp link**
- Update the WhatsApp social icon link from `https://wa.me/009715913426` to `https://wa.me/15556395391`

