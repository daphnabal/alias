/**
 * EmailJS Integration for sending flagged words
 * Uses EmailJS to send reports to gl.navon@gmail.com
 */

import emailjs from '@emailjs/browser';
import { FlaggedWord } from './wordFlags';

// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
// Sign up at https://www.emailjs.com/ and create a service + template
const SERVICE_ID = 'service_alias'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_alias'; // Replace with your EmailJS template ID  
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

/**
 * Initialize EmailJS
 */
export const initEmailJS = (): void => {
  emailjs.init(PUBLIC_KEY);
};

/**
 * Send flagged words via email
 */
export const sendFlaggedWordsEmail = async (flags: FlaggedWord[]): Promise<boolean> => {
  if (flags.length === 0) {
    return true; // Nothing to send
  }

  try {
    // Format words for email (one per line with timestamp)
    const wordsList = flags
      .map(f => {
        const date = new Date(f.timestamp).toLocaleString('he-IL');
        return `${f.word} (${date})`;
      })
      .join('\n');

    const templateParams = {
      to_email: 'gl.navon@gmail.com',
      subject: 'alias words',
      words_count: flags.length,
      words_list: wordsList,
      from_name: 'Alias Game Player'
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Failed to send flagged words email:', error);
    return false;
  }
};
