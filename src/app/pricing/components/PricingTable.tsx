'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PricingTableProps {
  className?: string;
}

export default function PricingTable({ className = '' }: PricingTableProps) {
  // 定价数据 - 完全按照原型图
  const pricingData = {
    features: [
      {
        category: '目标客群',
        items: [
          {
            name: '目标客群',
            starter: '探索期团队，希望快速体验核心价值',
            professional: '快速发展型企业，需要更强大的AI能力',
            enterprise: '大型组织，要求最高级别的性能与安全'
          }
        ],
        bgColor: 'bg-purple-100'
      },
      {
        category: '定价',
        items: [
          {
            name: '定价',
            starter: 'YX,XXX / 年',
            professional: 'YXX,XXX / 年',
            enterprise: '联系我们获取定制报价'
          }
        ],
        bgColor: 'bg-purple-100'
      },
      {
        category: '核心资源',
        items: [
          {
            name: '存储空间',
            starter: '100GB',
            professional: '500GB',
            enterprise: '定制，TB级起'
          },
          {
            name: '计算单元',
            starter: '基础算力包',
            professional: '高性能算力包',
            enterprise: '专属集群算力'
          }
        ],
        bgColor: 'bg-green-100'
      },
      {
        category: '用户许可',
        items: [
          {
            name: '最大员工用户数',
            starter: '50人',
            professional: '500人',
            enterprise: '无限制'
          }
        ],
        bgColor: 'bg-yellow-100'
      },
      {
        category: '运维与支持',
        items: [
          {
            name: '监控面板',
            starter: '基础指标监控',
            professional: '高级分析与预警',
            enterprise: '实时大屏与定制报表'
          },
          {
            name: '服务等级协议',
            starter: '标准支持（工作日）',
            professional: '优先支持（7x12小时）',
            enterprise: '专属客户成功经理（7x24小时）'
          }
        ],
        bgColor: 'bg-gray-100'
      },
      {
        category: '数据安全',
        items: [
          {
            name: '数据安全',
            starter: 'SOC 2 Type I',
            professional: 'SOC 2 Type II',
            enterprise: '私有化部署选项 & 定制安全审计'
          }
        ],
        bgColor: 'bg-gray-100'
      }
    ]
  };

  const plans = [
    {
      id: 'starter',
      name: '起步版',
      bgColor: 'bg-white'
    },
    {
      id: 'professional', 
      name: '专业版',
      bgColor: 'bg-white'
    },
    {
      id: 'enterprise',
      name: '企业版',
      bgColor: 'bg-white'
    }
  ];

  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">三档式平台能力定价表</h2>
          <p className="section-subtitle">
            选择适合您企业规模的数字员工"运行平台"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full overflow-x-auto"
        >
          <div className="min-w-[600px] w-full">
            <table className="w-full border-collapse bg-white shadow-lg border border-gray-300 table-fixed">
              {/* 表头 */}
              <thead>
                <tr>
                  <th className="w-2/5 p-4 text-left bg-purple-100 border border-gray-300 font-bold text-gray-900">
                    特性
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="w-1/5 p-4 text-center bg-purple-100 border border-gray-300 font-bold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* 表体 */}
              <tbody>
                {pricingData.features.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    {/* 分类标题行 - 只显示特定分类的标题 */}
                    {!['目标客群', '定价', '数据安全'].includes(category.category) && (
                      <tr className={category.bgColor}>
                        <td colSpan={4} className="p-3 text-left border border-gray-300 font-bold text-gray-900">
                          {category.category}
                        </td>
                      </tr>
                    )}
                    
                    {/* 特性行 */}
                    {category.items.map((item, itemIndex) => (
                      <tr key={`${categoryIndex}-${itemIndex}`}>
                        <td className="p-3 text-left border border-gray-300 font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="p-3 text-center border border-gray-300 text-gray-700">
                          {item.starter}
                        </td>
                        <td className="p-3 text-center border border-gray-300 text-gray-700">
                          {item.professional}
                        </td>
                        <td className="p-3 text-center border border-gray-300 text-gray-700">
                          {item.enterprise}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
