import { delay } from 'motion/react';
import { isDev } from './helpers';

export type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export const pricingPlans = [
  {
    name: 'Basic',
    price: 5,
    description: 'Perfect for occasional use',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    id: 'basic',
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_5kQbIU4Jx5mP1Kgh0qcQU00'
      : 'https://buy.stripe.com/test_5kQbIU4Jx5mP1Kgh0qcQU00',
    priceId: isDev ? 'price_1RRrxI4exgkHYhvHh3xIW0oZ' : '',
  },
  {
    name: 'Pro',
    price: 15,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    id: 'pro',
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_4gMeV65NB5mP3SobG6cQU01'
      : 'https://buy.stripe.com/test_4gMeV65NB5mP3SobG6cQU01',
    priceId: isDev ? 'price_1RRrzW4exgkHYhvHibF76Drk' : '',
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // duration: 0.5,
      // ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0, // Added y: 0 to bring the element to its original position
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
