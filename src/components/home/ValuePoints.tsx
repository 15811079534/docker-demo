'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Zap, Target } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const valuePoints = [
  {
    icon: MessageSquare,
    title: '虚拟助理体验',
    description: '告别复杂软件，对话式交互，像与助理安排任务一样。自然语言交互，让AI真正听懂您的需求。',
    features: ['对话式交互', '自然语言', '智能理解'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: '开箱即用',
    description: '预置行业解决方案，一周内上线，快速见效。无需复杂配置，即刻体验AI赋能。',
    features: ['预置模板', '快速部署', '一周上线'],
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Target,
    title: '深度业务融合',
    description: '非通用AI工具，深度融合业务场景的专属助手。针对企业特定需求定制，精准解决实际问题。',
    features: ['场景定制', '业务专属', '精准匹配'],
    color: 'from-teal-500 to-blue-600',
    bgColor: 'bg-teal-50',
  },
];

export default function ValuePoints() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title gradient-text">核心优势</h2>
          <p className="section-subtitle">
            三大核心价值，让AI真正成为您的得力助手
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valuePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="card h-full group hover:border-blue-200 border-2 border-transparent transition-all">
                  {/* 图标 */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-all">
                      <Icon className={`w-8 h-8 bg-gradient-to-br ${point.color} bg-clip-text text-transparent group-hover:text-white transition-all`} 
                            strokeWidth={2} />
                    </div>
                  </div>

                  {/* 内容 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {point.description}
                  </p>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {point.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`${point.bgColor} px-3 py-1 rounded-full text-xs font-medium text-gray-700`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 装饰线条 */}
                  <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${point.color} transition-all duration-500 mt-auto rounded-full`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

