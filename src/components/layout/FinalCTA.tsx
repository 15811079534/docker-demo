'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CTAButton } from '@/components/shared';

export default function FinalCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* 主标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight px-4"
          >
            面向垂直行业的、开箱即用的"数字员工"SaaS解决方案，
          </motion.h2>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight px-4"
          >
            通过拟人化的交互体验，将AI能力无缝融入核心业务流程，
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 leading-tight px-4"
          >
            降本增效，赋能员工。
          </motion.p>

          {/* CTA按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <CTAButton
              text="预约15分钟专家咨询"
              href="/contact"
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

