'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Briefcase } from 'lucide-react';

export default function CustomizationServices() {
  const customizationTypes = [
    {
      icon: Bot,
      name: '定制智能体',
      description: '',
      scenarios: '企业知识问答、新员工培训、标准客服、内部政策咨询',
      value: '快速激活企业知识，降低信息检索成本',
      cycle: '',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    },
    {
      icon: Zap,
      name: 'AI应用助手（深度集成）',
      description: '',
      scenarios: '适合场景：与现有的CRM、ERP、OA等核心业务系统流程集成，实现业务流程自动化（如智能提单、数据录入、报告生成）',
      value: '将AI融入核心工作流，直接提升人均效能',
      cycle: '1-3个月',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Briefcase,
      name: 'AI业务助手（重度初始化）',
      description: '',
      scenarios: '适合场景：游戏复杂的数据迁移、系统初始化、历史数据清洗与学习的综合性项目，打造高度拟人化的业务专家',
      value: '完成业务模式的智能化升级，成为关键业务的"副驾驶"',
      cycle: '3-6个月以上',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            定制开发服务说明
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            您的数字员工，由您定义——定制开发服务
          </p>
          <p className="text-base text-gray-600 max-w-4xl mx-auto mt-2 leading-relaxed">
            在选择了运行平台后，我们将与您携手，共同定义和开发专属的数字员工。以下是三种典型的定制方向，供您参考：
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {customizationTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`${type.bgColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-16 h-16 ${type.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {type.name}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">
                        适合场景：
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-4">
                      {type.scenarios}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">
                        核心价值：
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-4">
                      {type.value}
                    </p>
                  </div>

                  {type.cycle && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-700">
                          典型交付周期：
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 pl-4">
                        {type.cycle}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
