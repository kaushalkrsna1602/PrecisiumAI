import { cn } from '@/lib/utils';
import {
  pricingPlans,
  PriceType,
  containerVariants,
  itemVariants,
} from '@/utils/constants';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv, MotionSection } from '../common/motion-wrapper';

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  priceId,
}: PriceType) => {
  return (
    <MotionDiv
      variants={listVariants}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
    >
      <div
        className={cn(
          'relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl',
          id === 'pro' && 'border-rose-500 border-2'
        )}
      >
        <MotionDiv
          variants={listVariants}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">$ {price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <MotionDiv
          variants={listVariants}
          className="sapce-y-2.5 leading-relaxed text-base felx-1"
        >
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </MotionDiv>
        <MotionDiv
          variants={listVariants}
          className="space-y-2 flex justify-center w-full"
        >
          <Link
            className={cn(
              'w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2',
              id === 'pro'
                ? ' border-rose-900'
                : 'border-rose-100 from-rose-400 to-rose-500'
            )}
            href={paymentLink}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex items-center justify-center w-full pb-12"
        >
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
