import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  showIcon?: boolean;
}

export default function CTAButton({
  text = '预约15分钟专家咨询',
  href = '/contact',
  variant = 'primary',
  className = '',
  showIcon = true,
}: CTAButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <Link
      href={href}
      className={`${baseClass} !inline-flex items-center justify-center gap-2 whitespace-nowrap ${className}`}
      style={{ display: 'inline-flex' }}
    >
      {text}
      {showIcon && <ArrowRight className="w-5 h-5 flex-shrink-0" />}
    </Link>
  );
}

