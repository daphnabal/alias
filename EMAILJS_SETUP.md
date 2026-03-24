# EmailJS Setup Instructions

Follow these steps to enable the word flagging email system:

## 1. Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the connection instructions
5. Note your **Service ID** (e.g., `service_xyz123`)

## 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set the template name to: `Alias Word Flags`
4. Configure the template:

**Subject:**
```
alias words
```

**Content:**
```
New flagged words from Alias game:

Total flagged: {{words_count}}

Words to review:
{{words_list}}

---
Sent from: {{from_name}}
```

5. Save the template and note your **Template ID** (e.g., `template_xyz123`)

## 4. Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abcDEF123xyz`)

## 5. Update the Code

Open `src/utils/emailService.ts` and replace the placeholder values:

```typescript
const SERVICE_ID = 'service_xyz123';  // Your Service ID from step 2
const TEMPLATE_ID = 'template_xyz123'; // Your Template ID from step 3
const PUBLIC_KEY = 'abcDEF123xyz';     // Your Public Key from step 4
```

## 6. Test the System

1. Run the game: `npm run dev`
2. Play a round and flag some words using the 🗑️ button
3. Finish the game (reach the end)
4. Check your email (gl.navon@gmail.com) for the flagged words report

## 7. Deploy

Once tested, deploy the changes:

```bash
git add -A
git commit -m "Add word flagging system with EmailJS"
git push origin master
```

The GitHub Actions workflow will automatically deploy to production.

---

## How It Works

- Players click the 🗑️ (trash) button next to any word in the end-of-turn summary
- Words are stored locally in browser localStorage
- When a game ends (someone reaches the finish), all flagged words are automatically sent to your email
- localStorage is cleared after successful send
- Each email includes the word and timestamp of when it was flagged

## Notes

- Free tier: 200 emails/month
- If a game is abandoned mid-game, flags are NOT sent (only sent on game completion)
- Multiple players on different devices will each send their own flags
- Flagged words persist across page refreshes until the game ends
