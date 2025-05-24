import { Pizza } from 'lucide-react';
import { SummaryViewer } from '../summaries/summary-viewer';
import { MotionDiv, MotionH3 } from '../common/motion-wrapper';

const DEMO_SUMMARY = `# Quick Overview
🧠 Explores the principles and techniques for fostering creative and unconventional thinking.

# Document Details
📄 Type: Self-Help/Business
🧑‍🤝‍🧑 For: Individuals, Teams, Leaders

# Key Highlights
💡 Practical exercises to stimulate creative problem-solving
🔓 Strategies to break free from conventional thought patterns
🌟 Real-world examples of innovative breakthroughs

# Why It Matters
➡️ In today's rapidly evolving world, the ability to think differently is crucial for innovation, problem-solving, and staying ahead of the curve in both personal and professional life.

# Main Points

➡️ Understanding the barriers to creative thinking

➡️ Techniques for brainstorming and idea generation

➡️ Cultivating a mindset that embraces novelty

➡️ Evaluating and implementing unconventional solutions

➡️ Fostering a culture of innovation within teams

# Pro Tips
🔑 Challenge your assumptions regularly
✍️ Practice divergent thinking exercises
🗣️ Seek diverse perspectives
🌱 Create a safe space for experimentation

# Key Terms to Know

✨ Divergent Thinking: Generating multiple creative ideas
🧱 Cognitive Bias: Systematic patterns of deviation from norm or rationality in judgment
🔄 Reframing: Looking at a situation from a different perspective
🚀 Innovation: Creating and implementing new ideas or methods

# Bottom Line
✅ Learn to unlock your creative potential and approach challenges with fresh perspectives, leading to innovative solutions and breakthroughs.

# Final Thoughts
Developing an "out-of-the-box" mindset is a valuable skill that can be cultivated through conscious effort and the application of specific techniques. This guide provides the tools to embark on that journey.`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-4 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Precisium transforms{' '}
              <span className="bg-linear-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
                this How TO THINK PDF
              </span>{' '}
              into an easy-to-read summary!
            </MotionH3>
          </div>

          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            {/** Summar Viewer */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SummaryViewer summary={DEMO_SUMMARY} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
