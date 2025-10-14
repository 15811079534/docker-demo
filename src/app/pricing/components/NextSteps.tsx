'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/shared';

export default function NextSteps() {
  const steps = [
    {
      number: '1',
      title: '初步沟通',
      description: '点击下方按钮，与我们的解决方案架构师进行15分钟的免费沟通。'
    },
    {
      number: '2', 
      title: '需求诊断',
      description: '我们将深入了解您的业务场景，明确定制范围与目标。'
    },
    {
      number: '3',
      title: '方案与报价',
      description: '我们将在3个工作日内，为您提供一份包含详细项目范围、实施计划、人天评估及精准报价的定制方案。'
    },
    {
      number: '4',
      title: '我们的承诺',
      description: '在您签署开发合同前，您将清晰地知道每一笔预算的用途。'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 opacity-60"></div>
      
      {/* 装饰性背景图案 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧标题 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              下一步如何开始？
            </h2>
          </motion.div>

          {/* 右侧步骤说明 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
          >
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {step.title}：
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 咨询按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <CTAButton 
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                预约15分钟专家咨询
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
