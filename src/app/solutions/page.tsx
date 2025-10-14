'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Factory, GraduationCap, Heart, ArrowRight, TrendingUp } from 'lucide-react';

const solutions = [
  {
    id: 'manufacturing',
    title: '制造业解决方案',
    industry: '智能制造',
    description: '为制造业打造技术文档管理员数字员工',
    icon: Factory,
    painPoints: [
      '技术图纸散乱、版本失控',
      '查找耗时、新人培养成本高',
      '设计规范难以统一',
      '知识传承困难',
    ],
    solutions: [
      '智能检索与版本对比',
      '新员工培训与知识问答',
      '设计规范自动核查',
      '技术知识库管理',
    ],
    benefits: [
      { metric: '80%', label: '检索效率提升' },
      { metric: '50%', label: '新人上岗周期缩短' },
      { metric: '30%', label: '设计错误率下降' },
    ],
    roles: ['研发工程师', '技术文档管理员', '质量工程师', '培训专员'],
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-50',
    href: '/solutions/manufacturing',
  },
  {
    id: 'education',
    title: '教育行业解决方案',
    industry: '智慧教育',
    description: '为教育机构打造学管员智能助手',
    icon: GraduationCap,
    painPoints: [
      '学生信息管理繁琐',
      '课程安排协调困难',
      '家校沟通效率低',
      '教学资源分散',
    ],
    solutions: [
      '学生信息智能管理',
      '智能排课与课程推荐',
      '家校沟通自动化',
      '教学资源整合',
    ],
    benefits: [
      { metric: '70%', label: '管理效率提升' },
      { metric: '3倍', label: '家校沟通响应速度' },
      { metric: '60%', label: '排课时间节省' },
    ],
    roles: ['教务管理员', '班主任', '教学主管', '招生老师'],
    color: 'from-purple-600 to-pink-500',
    bgColor: 'bg-purple-50',
    href: '/solutions/education',
  },
  {
    id: 'healthcare',
    title: '医疗行业解决方案',
    industry: '智慧医疗',
    description: '为医疗机构打造医疗知识助手',
    icon: Heart,
    painPoints: [
      '患者信息查询耗时',
      '医疗知识检索困难',
      '重复性工作量大',
      '医患沟通成本高',
    ],
    solutions: [
      '患者信息智能检索',
      '医学知识库问答',
      '诊断辅助与建议',
      '医患沟通辅助',
    ],
    benefits: [
      { metric: '60%', label: '信息查询效率提升' },
      { metric: '40%', label: '医护工作负担降低' },
      { metric: '50%', label: '医患沟通时间节省' },
    ],
    roles: ['医生', '护士', '医务管理员', '药剂师'],
    color: 'from-red-600 to-orange-500',
    bgColor: 'bg-red-50',
    href: '/solutions/healthcare',
  },
];

export default function SolutionsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 md:py-28 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/back_top.jpg)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-800"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              非通用AI工具，而是深度融合制造业、教育、医疗特定业务流程的专属助手
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              提供如【技术文档管理员】、【学管员智能助手】、【社区医疗顾问】等开箱即用的解决方案。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="space-y-24">
            {solutions.map((solution, index) => {
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
              const Icon = solution.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={solution.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                    {/* 左侧内容 */}
                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                      {/* 行业标签 */}
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center`}
                        >
                          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                        </div>
                        <span
                          className={`${solution.bgColor} px-4 py-2 rounded-full text-sm font-semibold`}
                        >
                          {solution.industry}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {solution.title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-8">
                        {solution.description}
                      </p>

                      {/* 痛点 */}
                      <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span
                            className={`w-1 h-6 rounded bg-gradient-to-b ${solution.color}`}
                          ></span>
                          行业痛点
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {solution.painPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="text-red-500 mt-1">✗</span>
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 解决方案 */}
                      <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span
                            className={`w-1 h-6 rounded bg-gradient-to-b ${solution.color}`}
                          ></span>
                          核心应用场景
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {solution.solutions.map((sol, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="text-green-500 mt-1">✓</span>
                              {sol}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 适用岗位 */}
                      <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-3 text-sm">
                          适用岗位
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {solution.roles.map((role, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={solution.href}
                        className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${solution.color} bg-clip-text text-transparent hover:gap-3 transition-all group`}
                      >
                        查看详细方案
                        <ArrowRight
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>

                    {/* 右侧数据 */}
                    <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                      <div className={`card border-2 border-gray-100`}>
                        <div className="text-center mb-6">
                          <TrendingUp
                            className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${solution.color} bg-clip-text text-transparent`}
                          />
                          <h3 className="font-bold text-gray-900">
                            实现的价值
                          </h3>
                        </div>

                        <div className="space-y-6">
                          {solution.benefits.map((benefit, idx) => (
                            <div key={idx} className="text-center">
                              <div
                                className={`text-4xl font-bold bg-gradient-to-r ${solution.color} bg-clip-text text-transparent mb-2`}
                              >
                                {benefit.metric}
                              </div>
                              <div className="text-gray-600">{benefit.label}</div>
                              <div
                                className={`h-2 bg-gradient-to-r ${solution.color} rounded-full mt-3`}
                                style={{ width: `${80 + idx * 5}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <Link
                            href="/contact"
                            className={`block text-center py-3 px-6 rounded-lg font-semibold bg-gradient-to-r ${solution.color} text-white hover:shadow-lg transition-all`}
                          >
                            为我定制方案
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              没有找到适合您的行业方案？
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              我们支持定制化开发，无论您来自哪个行业，我们都能为您量身打造专属的数字员工
            </p>
            <Link href="/contact" className="btn-primary">
              联系我们定制方案
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

