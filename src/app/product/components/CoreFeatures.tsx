'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquareText, Package, Shield, LucideIcon } from 'lucide-react';

interface Feature {
  name: string;
  desc?: string;
}

interface CoreFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  color: string;
}

const coreFeatures: CoreFeature[] = [
  {
    id: 'interactive-workspace',
    icon: MessageSquareText,
    title: '拟人化交互工作台',
    subtitle: '像与同事协作一样自然',
    description:
      '告别传统软件复杂的菜单和操作流程，通过自然语言与数字员工对话，轻松完成各项任务。',
    features: [
      {
        desc: '语音/文字输入'
      },
      {
        desc: '多轮对话与上下文记忆',
      },
      {
        desc: '文件/图片上传识别'
      },
      {
        desc: '上下文感知的界面自动加载'
      },
      {
        desc: '技能功能的可视化操作'
      },
      {
        desc: '结果的可视化呈现（列表、图表、文档）'
      },
    ],
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'skill-marketplace',
    icon: Package,
    title: '行业技能包市场',
    subtitle: '即插即用的专家能力',
    description:
      '我们为不同行业和场景预置了丰富的技能包，开箱即用，快速见效。同时支持定制化开发，满足您的特殊需求。',
    features: [
      {
        desc: '预览所有已订阅/可订阅的技能包'
      },
      {
        desc: '一键启用/停用技能'
      },
      {
        desc: '技能使用引导与示例'
      },
      {
        desc: '常用技能快捷入口'
      },
       {
        desc: '当前任务状态显示（如进行中的工单）'
      },
       {
        desc: '由数字员工推送的待办和通知'
      }
    ],
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 'enterprise-control',
    icon: Shield,
    title: '企业级统一管控',
    subtitle: '安全、可控、可管理',
    description:
      '提供完善的管理后台，支持权限管理、使用监控、审计追踪等功能，让企业管理者对数字员工的运行状态了如指掌。',
    features: [
      {
        desc: '全局资源监控（AI调用量、存储、并发）'
      },
      {
        desc: '使用情况分析（活跃用户、热门技能）'
      },
      {
        desc: '业务价值看板（节省时间、处理工单数等）'
      },
      {
        desc: '用户操作日志'
      },
      {
        desc: '对话日志（可开关，保障隐私）'
      },
      {
        desc: '系统安全日志'
      },
    ],
    color: 'from-green-600 to-teal-500',
  },
];

export default function CoreFeatures() {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={featuresRef} className="py-20 md:py-28">
      <div className="container-custom">
        <div className="space-y-32">
          {coreFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={feature.id}>
                {/* 主标题 - 居中显示 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center mb-16"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </motion.div>

                {/* 主要内容区域：左侧可视化 + 右侧功能列表 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* 可视化展示 */}
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="card border-2 border-gray-100">
                      <div
                        className={`h-96 rounded-lg bg-gradient-to-br ${feature.color} opacity-10 flex items-center justify-center`}
                      >
                        <Icon className="w-32 h-32 text-gray-400" strokeWidth={1} />
                      </div>
                    </div>
                  </div>

                  {/* 右侧：副标题 + 描述 + 功能列表 */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    {/* 副标题 */}
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {feature.subtitle}
                    </h4>

                    {/* 描述 */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* 功能列表 */}
                    <div className="space-y-4">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-gray-400 mt-1">–</span>
                          <div>
                            <div className="text-gray-900 leading-relaxed">
                              {item.desc && (
                                <span className="text-gray-600">{item.desc}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

