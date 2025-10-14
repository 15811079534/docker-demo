'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="section-title">常见问题</h2>
          <p className="section-subtitle">
            关于定价和服务的常见问题解答
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">Q:</span>
                {faq.q}
              </h3>
              <p className="text-gray-600 pl-6">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
