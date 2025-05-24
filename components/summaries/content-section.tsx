import { parseEmojiPoint, parsePoint } from "@/utils/summary-helper";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const EmojiPoint = ({ point , index }: { point: string; index: number }) => {

  const { emoji, text } = parseEmojiPoint(point) ?? {};

  return (
    <MotionDiv
      varients={itemVariants}
      className="group relative bg-gradient-to-br from-yellow-100/[0.1] to-yellow-300/[0.03] p-4 rounded-2xl border border-yellow-500/10 hover:shadow-lg transition-all"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
      />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        <span className="mr-2">{emoji}</span>
        {text}
      </p>
    </MotionDiv>
  );
};



const RegularPoint = ({ point, index }: { point: string; index: number }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
      />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
    // console.log("🔍 Points received in ContentSection:", points); 
  return (
    <MotionDiv variants={containerVariants} 
      key={points.join('')}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4">
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        // console.log(`🧩 Checking point: "${point}" → isEmpty: ${isEmpty}, hasEmoji: ${hasEmoji}, isMainPoint: ${isMainPoint}`);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} index={index} />;
        }

        return <RegularPoint key={`point-${index}`} point={point} index={index} />;
      })}
    </MotionDiv>
  );
}
