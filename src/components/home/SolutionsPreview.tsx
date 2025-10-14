'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Factory, GraduationCap, Heart, ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 'manufacturing',
    title: '制造业解决方案',
    industry: '智能制造',
    description: '装备制造、汽车零部件等企业的研发部门、工程部门',
    icon: Factory,
    users: '技术工程师、图纸管理员',
    painPoints: [
      '技术文档管理混乱',
      '新员工培训成本高',
      '设计规范难以统一',
    ],
    benefits: '检索效率提升80%，新人上岗周期缩短50%',
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-50',
    href: '/solutions/manufacturing',
  },
  {
    id: 'education',
    title: '教育行业解决方案',
    industry: '智慧教育',
    description: '职业培训机构、K12教培机构的教务部门',
    icon: GraduationCap,
    users: '学管员、档案管理员、助教',
    painPoints: [
      '学生信息管理繁琐',
      '课程安排协调困难',
      '家校沟通效率低',
    ],
    benefits: '管理效率提升70%，家校沟通响应速度提升3倍',
    color: 'from-purple-600 to-pink-500',
    bgColor: 'bg-purple-50',
    href: '/solutions/education',
  },
  {
    id: 'healthcare',
    title: '医疗行业解决方案',
    industry: '智慧医疗',
    description: '社区养老中心、基层医疗机构的护理/服务部门',
    icon: Heart,
    users: '社区护理员、健康顾问',
    painPoints: [
      '患者信息查询耗时',
      '医疗知识检索困难',
      '重复性工作量大',
    ],
    benefits: '信息查询效率提升60%，医护人员工作负担降低40%',
    color: 'from-red-600 to-orange-500',
    bgColor: 'bg-red-50',
    href: '/solutions/healthcare',
  },
];

export default function SolutionsPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">行业解决方案</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            什么场景适合数字员工？重复性高、依赖特定知识、需在多系统间切换的知识岗位员工，和流程操作员——这些场景最适合数字员工
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={solution.href}>
                  <div className="card h-full group cursor-pointer border-2 border-transparent hover:border-blue-200">
                    {/* 顶部图标和行业标签 */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      <span className={`${solution.bgColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {solution.industry}
                      </span>
                    </div>

                    {/* 标题和描述 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {solution.description}
                    </p>

                    {/* 典型用户 */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">典型用户：</span>
                        <span className="font-medium text-gray-700">{solution.users}</span>
                      </div>
                    </div>

                    {/* 痛点列表 */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-700 mb-3">核心痛点：</div>
                      <ul className="space-y-2">
                        {solution.painPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.color} mt-1.5 mr-2 flex-shrink-0`}></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 效果展示 */}
                    <div className={`${solution.bgColor} rounded-lg p-4 mb-6`}>
                      <div className="text-xs font-semibold text-gray-700 mb-1">实现价值</div>
                      <div className="text-sm font-medium text-gray-800">
                        {solution.benefits}
                      </div>
                    </div>

                    {/* 查看更多 */}
                    <div className={`flex items-center text-sm font-semibold bg-gradient-to-r ${solution.color} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
                      查看详情
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 查看所有解决方案按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/solutions" className="btn-secondary">
            查看所有解决方案
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

