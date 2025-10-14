'use client';

import { motion } from 'framer-motion';

export default function PricingPhilosophy() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Hero Section */}
      <div className="py-16 md:py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/back_top.jpg)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-800"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              平台费 + 定制开发费
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              透明定价，开启智能数字员工的时代
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Pricing Philosophy Content */}
      <div className="py-16 md:py-20">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 主要内容区域 - 上下两个区域 */}
            <div className="space-y-24">
            
            {/* 上半部分：右侧平台年费文字，左侧蓝色圆环 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* 左侧：3D蓝色圆环图形 */}
              <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative w-80 h-80">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 shadow-2xl shadow-blue-500/40 relative transform rotate-12">
                    {/* 内圆环 */}
                    <div className="absolute top-16 left-16 right-16 bottom-16 rounded-full bg-gradient-to-br from-blue-100 to-white shadow-inner"></div>
                    
                    {/* 高光效果 */}
                    <div className="absolute top-8 left-8 w-24 h-12 rounded-full bg-white/50 blur-sm"></div>
                    
                    {/* 3D效果增强 */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/30"></div>
                    <div className="absolute bottom-4 left-4 right-4 h-8 rounded-full bg-black/15 blur-lg"></div>
                    
                    {/* 装饰性光晕 */}
                    <div className="absolute -inset-6 rounded-full bg-blue-400/20 blur-xl"></div>
                    
                    {/* 额外的3D层次 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* 右侧：平台年费内容 */}
              <div className="space-y-8 order-1 lg:order-2">
                {/* 标题 */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
                    1. 平台年费
                  </h3>
                  <p className="text-xl text-gray-600">（您在此选择档位）</p>
                </div>
                
                {/* 内容说明 */}
                <div className="space-y-8">
                  <div>
                    <p className="text-blue-600 font-bold mb-4 text-xl">a. 这是什么？</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      这是数字员工运行的"地基"。它包含了一个强大的前端工作台、统一管理后台，以及保障数字员工稳定、安全、高效运行的核心资源。
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-blue-600 font-bold mb-4 text-xl">b. 为什么按年付费？</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      这确保了您的数字员工能获得持续的技术更新、安全防护和运维支持。
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-blue-600 font-bold mb-4 text-xl">c. 费用取决于：</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      存储/计算资源、支持的员工用户数和所需的监控运维等级。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 下半部分：左侧定制开发费文字，右侧紫色立体图形 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* 左侧：定制开发费内容 */}
              <div className="space-y-8">
                {/* 标题 */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-600 mb-3">
                    2. 定制开发费
                  </h3>
                  <p className="text-xl text-gray-600">（一次性投入，根据需求评估）</p>
                </div>
                
                {/* 内容说明 */}
                <div className="space-y-8">
                  <div>
                    <p className="text-purple-600 font-bold mb-4 text-xl">a. 这是什么？</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      这是为您量身打造专属数字员工的"建造"成本。它决定了数字员工的智能程度和业务价值。
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-purple-600 font-bold mb-4 text-xl">b. 为什么是定制？</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      因为每家企业的业务流程、集成系统和智能化目标都独一无二。
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-purple-600 font-bold mb-4 text-xl">c. 费用取决于：</p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      定制范围与深度、与现有系统集成的复杂程度、项目实施所需的人天。
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 右侧：3D紫色立体图形 */}
              <div className="hidden lg:flex justify-center lg:justify-end">
                <div className="relative w-80 h-80">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-400 via-purple-600 to-pink-500 shadow-2xl shadow-purple-500/40 relative transform -rotate-12">
                    {/* 顶部高光 */}
                    <div className="absolute top-16 left-16 right-16 h-24 rounded-2xl bg-white/40 blur-sm"></div>
                    
                    {/* 3D效果增强 */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/30"></div>
                    <div className="absolute bottom-4 left-4 right-4 h-10 rounded-2xl bg-black/15 blur-lg"></div>
                    
                    {/* 侧面阴影效果 */}
                    <div className="absolute top-8 -right-3 bottom-8 w-10 rounded-xl bg-black/25 blur-md"></div>
                    
                    {/* 装饰性光晕 */}
                    <div className="absolute -inset-6 rounded-3xl bg-purple-400/20 blur-xl"></div>
                    
                    {/* 内部装饰 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-xl blur-sm"></div>
                    
                    {/* 额外的立体效果 */}
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-lg blur-sm"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-black/10 rounded-xl blur-md"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}