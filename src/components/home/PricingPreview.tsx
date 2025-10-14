'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { CTAButton } from '@/components/shared';

const pricingPlans = [
  {
    id: 'starter',
    name: '起步价',
    title: '定制智能体',
    适合场景: '企业知识问答、新员工培训、标准客服、内部数据咨询。',
    核心价值: '快速激活企业知识，降低信息获取成本。',
    交付周期: '2-4周',
    用户数: '50人',
    存储空间: '100GB',
    recommended: false,
  },
  {
    id: 'professional',
    name: '专业规格',
    title: 'AI应用助手（深度集成）',
    适合场景: '与CRM、ERP、OA等核心业务系统集成、实现业务流程自动化（如自动生成）。',
    核心价值: '将AI融入核心工作流程，直接提升人均效能。',
    交付周期: '1-3个月',
    用户数: '500人',
    存储空间: '500GB',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: '企业级',
    title: 'AI业务助手（重度初始化）',
    适合场景: '涉及复杂的数据迁移、系统初始化、历史数据与学习的结合性培训、打造高度契合企业务专属"副驾驶"。',
    核心价值: '完成复杂的数据化改造，成为关键业务的"副驾驶"。',
    交付周期: '3-6个月以上',
    用户数: '无限制',
    存储空间: '定制，TB级起',
    recommended: false,
  },
];

export default function PricingPreview() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden">
      {/* 顶部渐变背景区域 - 和 Footer 保持一致 */}
      <div ref={headerRef} className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 py-16 md:py-24 overflow-hidden">
        {/* 右侧科技圆形图案 - 模仿星系效果 */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-60">
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            {/* 背景星空点缀 - 大量小星星 */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.2,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`
                }}
              ></div>
            ))}
            
            {/* 中心太阳/恒星 - 发光球体 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-white shadow-2xl shadow-white/60"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 via-white to-yellow-100 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full bg-white/20 blur-md"></div>
            </div>
            
            {/* 多层轨道圆环 - 细线条 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/20"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/15"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/20"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/10"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/15"></div>
            
            {/* 星尘带 1 - 倾斜的小行星带 (上方) - 更密集 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] -rotate-12 animate-spin-slower">
              {[...Array(200)].map((_, i) => {
                const angle = (i / 200) * 360;
                const radius = 210 + (Math.random() - 0.5) * 25; // 增加宽度变化
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const size = Math.random() * 2.5 + 0.8; // 增大尺寸
                const brightness = Math.random();
                return (
                  <div
                    key={`dust1-${i}`}
                    className="absolute rounded-full bg-white shadow-lg shadow-white/50"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: brightness * 0.5 + 0.4, // 提高不透明度
                      boxShadow: brightness > 0.7 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* 星尘带 2 - 倾斜的小行星带 (下方) - 更密集 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rotate-45 animate-spin-reverse">
              {[...Array(180)].map((_, i) => {
                const angle = (i / 180) * 360;
                const radius = 180 + (Math.random() - 0.5) * 20; // 增加宽度变化
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const size = Math.random() * 2 + 0.7; // 增大尺寸
                const brightness = Math.random();
                return (
                  <div
                    key={`dust2-${i}`}
                    className="absolute rounded-full bg-white shadow-md shadow-white/40"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: brightness * 0.4 + 0.35, // 提高不透明度
                      boxShadow: brightness > 0.6 ? '0 0 3px rgba(255,255,255,0.6)' : 'none'
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* 星尘带 3 - 第三条小行星带，增加层次感 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -rotate-65 animate-spin-slow">
              {[...Array(150)].map((_, i) => {
                const angle = (i / 150) * 360;
                const radius = 150 + (Math.random() - 0.5) * 18;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const size = Math.random() * 1.8 + 0.5;
                const brightness = Math.random();
                return (
                  <div
                    key={`dust3-${i}`}
                    className="absolute rounded-full bg-slate-200 shadow-sm shadow-white/30"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: brightness * 0.35 + 0.25,
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* 星尘带 4 - 第四条密集星尘带 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rotate-20 animate-spin-slower">
              {[...Array(170)].map((_, i) => {
                const angle = (i / 170) * 360;
                const radius = 240 + (Math.random() - 0.5) * 22;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const size = Math.random() * 2.2 + 0.6;
                const brightness = Math.random();
                return (
                  <div
                    key={`dust4-${i}`}
                    className="absolute rounded-full bg-blue-200 shadow-sm"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: brightness * 0.5 + 0.25,
                      boxShadow: brightness > 0.65 ? '0 0 4px rgba(147,197,253,0.7)' : 'none',
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* 星尘带 5 - 第五条外围星尘带 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] -rotate-30 animate-spin-reverse">
              {[...Array(130)].map((_, i) => {
                const angle = (i / 130) * 360;
                const radius = 130 + (Math.random() - 0.5) * 16;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const size = Math.random() * 1.6 + 0.5;
                const brightness = Math.random();
                return (
                  <div
                    key={`dust5-${i}`}
                    className="absolute rounded-full bg-slate-300"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: brightness * 0.45 + 0.3,
                      boxShadow: brightness > 0.7 ? '0 0 3px rgba(226,232,240,0.6)' : 'none',
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* 行星 1 - 左上大行星 (轨道运动) */}
            <div className="absolute left-1/2 top-1/2 w-[380px] h-[380px] animate-spin-slower" style={{ marginLeft: '-190px', marginTop: '-190px' }}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg shadow-slate-400/50 animate-spin-slow"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-slate-200/50 to-transparent"></div>
              </div>
            </div>
            
            {/* 行星 2 - 右上中型行星 (轨道运动) */}
            <div className="absolute left-1/2 top-1/2 w-[420px] h-[420px] animate-spin-reverse" style={{ marginLeft: '-210px', marginTop: '-210px', animationDuration: '25s' }}>
              <div className="absolute right-0 top-1/4 -translate-y-1/2 translate-x-1/2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 shadow-lg shadow-blue-300/50 animate-spin-slow"></div>
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-tl from-blue-100/50 to-transparent"></div>
              </div>
            </div>
            
            {/* 行星 3 - 左侧中型行星 (轨道运动) */}
            <div className="absolute left-1/2 top-1/2 w-[350px] h-[350px] animate-spin-slow" style={{ marginLeft: '-175px', marginTop: '-175px', animationDuration: '20s' }}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 shadow-lg shadow-amber-300/50 animate-spin"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-amber-100/50 to-transparent"></div>
              </div>
            </div>
            
            {/* 行星 4 - 右下大行星 (轨道运动) */}
            <div className="absolute left-1/2 top-1/2 w-[450px] h-[450px] animate-spin-slower" style={{ marginLeft: '-225px', marginTop: '-225px', animationDuration: '35s' }}>
              <div className="absolute right-0 bottom-1/4 translate-y-1/2 translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow-xl shadow-slate-300/60 animate-spin-slower"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-slate-100/60 to-transparent"></div>
              </div>
            </div>
            
            {/* 行星 5 - 底部小行星 (轨道运动) */}
            <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] animate-spin-reverse" style={{ marginLeft: '-160px', marginTop: '-160px', animationDuration: '18s' }}>
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-300 shadow-lg shadow-cyan-300/50 animate-spin-slow"></div>
              </div>
            </div>
            
            {/* 轨道上运动的小天体 - 内圈 */}
            <div className="absolute left-1/2 top-1/2 w-40 h-40 animate-spin-slow" style={{ marginLeft: '-80px', marginTop: '-80px' }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50"></div>
            </div>
            <div className="absolute left-1/2 top-1/2 w-40 h-40 animate-spin-slow" style={{ marginLeft: '-80px', marginTop: '-80px', transform: 'rotate(90deg)' }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg shadow-white/50"></div>
            </div>
            
            {/* 轨道上运动的小天体 - 中圈 */}
            <div className="absolute left-1/2 top-1/2 w-80 h-80 animate-spin-slower" style={{ marginLeft: '-160px', marginTop: '-160px' }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg shadow-white/60"></div>
            </div>
            <div className="absolute left-1/2 top-1/2 w-80 h-80 animate-spin-slower" style={{ marginLeft: '-160px', marginTop: '-160px', transform: 'rotate(180deg)' }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-200 rounded-full shadow-lg shadow-slate-200/60"></div>
            </div>
            
            {/* 轨道上运动的小天体 - 外圈 */}
            <div className="absolute left-1/2 top-1/2 w-[450px] h-[450px] animate-spin-reverse" style={{ marginLeft: '-225px', marginTop: '-225px' }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-xl shadow-white/70"></div>
            </div>
            
            {/* 飞船/卫星装饰 - 顶部 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-8 rotate-45">
              <div className="w-6 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
              <div className="w-2 h-2 bg-white rounded-full absolute left-2 -top-1 shadow-lg shadow-white/50"></div>
            </div>
            
            {/* 飞船/卫星装饰 - 右侧 */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 -rotate-12">
              <div className="w-5 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute left-1.5 -top-0.5 shadow-md shadow-white/40"></div>
            </div>
            
            {/* 飞船/卫星装饰 - 底部 */}
            <div className="absolute left-1/3 bottom-12 -rotate-90">
              <div className="w-5 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute left-1.5 -top-0.5 shadow-md shadow-white/40"></div>
            </div>
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold !text-white mb-6 leading-tight">
              透明定价，开启智能数字员工时代
            </h2>
            
            <p className="!text-white/90 text-lg md:text-xl mb-10">
              ISO 27001 认证，全天候专属支持服务
            </p>
            
            <CTAButton
              text="免费获取定制方案"
              href="/contact"
            />
          </motion.div>
        </div>
      </div>

      {/* 主要定价内容区域 */}
      <div ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              我们的定价哲学：平台费 + 定制开发费
            </h2>
            
            <p className="text-base text-gray-600 max-w-5xl mx-auto leading-relaxed">
              我们相信，顶尖的技术服务源于极致的透明与专业。数字员工的投入并非深不可测，我们将成本拆解为清晰的"平台能力"与"定制开发"两部分。您支付的每一分钱，都对应着明确的价值与服务。
            </p>
        </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.recommended ? 'md:-mt-8' : ''}`}
              >
                <div
                  className={`h-full rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  plan.recommended
                      ? 'bg-gradient-to-br from-purple-200 via-purple-300 to-pink-200 shadow-2xl'
                      : 'bg-white border-2 border-gray-100 shadow-lg hover:border-purple-200'
                  }`}
                >
                  {/* 标签 */}
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${
                      plan.recommended ? 'text-purple-800' : 'text-gray-600'
                    }`}>
                    {plan.name}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className={`text-2xl font-bold mb-6 ${
                    plan.recommended ? 'text-gray-900' : 'text-gray-900'
                  }`}>
                    {plan.title}
                  </h3>

                  {/* 适合场景 */}
                  <div className="mb-5">
                    <p className={`text-xs font-semibold mb-2 ${
                      plan.recommended ? 'text-purple-900' : 'text-gray-600'
                    }`}>
                      适合场景：
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      plan.recommended ? 'text-gray-800' : 'text-gray-700'
                    }`}>
                      {plan.适合场景}
                    </p>
                </div>

                  {/* 核心价值 */}
                  <div className="mb-8">
                    <p className={`text-xs font-semibold mb-2 ${
                      plan.recommended ? 'text-purple-900' : 'text-gray-600'
                    }`}>
                      核心价值：
                    </p>
                    <p className={`text-sm leading-relaxed font-medium ${
                      plan.recommended ? 'text-gray-800' : 'text-gray-900'
                    }`}>
                      {plan.核心价值}
                    </p>
                </div>

                  {/* CTA按钮 */}
                  <Link
                    href="/contact"
                    className={`block text-center py-3 px-6 rounded-full font-semibold transition-all duration-200 mb-8 ${
                      plan.recommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                        : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    免费开始 &gt;
                  </Link>

                  {/* 详细信息 - 绿色对勾列表 */}
                  <div className="space-y-3">
                    <div className="flex items-start text-sm">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                      <span className={plan.recommended ? 'text-gray-800' : 'text-gray-700'}>
                        典型交付周期：{plan.交付周期}
                      </span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                      <span className={plan.recommended ? 'text-gray-800' : 'text-gray-700'}>
                        最大员工用户数：{plan.用户数}
                      </span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                      <span className={plan.recommended ? 'text-gray-800' : 'text-gray-700'}>
                        存储空间：{plan.存储空间}
                      </span>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
          </div>
      </div>
    </section>
  );
}

