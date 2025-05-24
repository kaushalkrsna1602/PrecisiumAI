import { Sparkles, BrainCircuit } from 'lucide-react'; // Using different icons for variety

const developerEmail = 'kaushal.kr.kr@gmail.com'; // Replace with your actual embedded email

export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
      <div className="container">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Powered by Innovation & Fresh Perspectives <BrainCircuit className="w-4 h-4 text-primary" />
        </div>
        <p className="text-xs">
          © {new Date().getFullYear()} NEW YOUTH WORLD. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-xs">
          <a href={`mailto:${developerEmail}`} className="hover:underline">Email</a>
          <a href="https://www.linkedin.com/in/kaushal-kumar-00a015232/" className="hover:underline">LinkedIn</a>
          <a href="https://kaushal-kumar.vercel.app/" className="hover:underline">Contact Us</a>
        </div>
        <p className="mt-6 text-xs">
          Built by Kaushal Kumar
        </p>
      </div>
    </footer>
  );
}