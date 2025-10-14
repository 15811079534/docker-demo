'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/shared';
import { CheckCircle2, Clock, Layers, Sparkles, Code } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 overflow-hidden">
      <div className="container-custom relative z-10 py-20 lg:py-28">
        {/* 顶部标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
            开启你的数字员工，释放人类创造力
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              面向制造业、教育、医疗行业的AI助手SaaS平台，让每位员工都拥有一位7x24小时在线的业务助理。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-10"
          >
            <CTAButton
              text="免费预约演示"
              variant="primary"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm text-gray-500 leading-relaxed"
          >
            产品愿景： 成为企业首选的“数字员工”雇佣平台，让每个职业者都拥有一位AI助手。
          </motion.p>
        </motion.div>

        {/* 四大特点 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {[
            { icon: <Sparkles className="w-6 h-6" />, text: '"虚拟助理"体验' },
            { icon: <CheckCircle2 className="w-6 h-6" />, text: '开箱即用' },
            { icon: <Layers className="w-6 h-6" />, text: '深度业务融合' },
            { icon: <Clock className="w-6 h-6" />, text: '24/7 待机服务' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-3 bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-blue-600">
                {item.icon}
              </div>
              <span className="text-gray-800 text-sm font-medium text-center">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 产品演示大图 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-7xl mx-auto mb-16"
        >
          {/* 网格布局 - 左大右小，直接展示 */}
          <div className="grid md:grid-cols-[1.8fr_1fr] gap-6 items-stretch">
            {/* 左侧 - 产品界面截图 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative group h-full"
            >
              {/* 背景装饰 - 悬浮效果 */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* 主图片容器 */}
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/80 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] h-full flex flex-col">
                {/* 顶部窗口栏 */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-medium text-gray-600">9Agent 制造业AI生产平台</span>
                  </div>
                </div>
                
                {/* 图片内容 */}
                <div className="relative flex-grow flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/heroImage.png"
                    alt="9Agent 制造业AI生产交叉界面"
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* 右侧 - 代码编辑器界面 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative group h-full"
            >
              {/* 背景装饰 - 悬浮效果 */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* 代码编辑器容器 */}
              <div className="relative bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700/80 h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                {/* 顶部标签栏 */}
                <div className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-700/50 rounded-md px-3 py-1">
                        <Code className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-gray-200 font-mono">api_integration.py</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-700 overflow-x-auto bg-gray-800/50">
                    {['Python', 'cURL', 'Node.js', 'PHP'].map((lang, i) => (
                      <div
                        key={lang}
                        className={`px-4 py-2 text-xs font-medium border-r border-gray-700 whitespace-nowrap transition-all cursor-pointer ${
                          i === 0 ? 'bg-gray-900 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                        }`}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 代码内容 */}
                <div className="p-3 font-mono text-[10px] leading-relaxed flex-grow relative">
                  <div className="space-y-0.5">
                    <div><span className="text-purple-400">import</span> <span className="text-white">requests</span></div>
                    <div className="h-1"></div>
                    <div><span className="text-gray-500">username = </span><span className="text-green-400">"USERNAME"</span></div>
                    <div><span className="text-gray-500">password = </span><span className="text-green-400">"PASSWORD"</span></div>
                    <div className="h-1"></div>
                    <div><span className="text-gray-500">proxy = </span><span className="text-green-400">"user.pr.net:8989"</span></div>
                    <div><span className="text-gray-500">proxies = {'{'}</span></div>
                    <div className="pl-2"><span className="text-green-400">'http'</span>: <span className="text-green-400">f'http://{'{username}'}:{'{password}'}@{'{proxy}'}'</span>,</div>
                    <div className="pl-2"><span className="text-green-400">'https'</span>: <span className="text-green-400">f'https://{'{username}'}:{'{password}'}@{'{proxy}'}'</span></div>
                    <div><span className="text-gray-500">{'}'}</span></div>
                    <div className="h-1"></div>
                    <div><span className="text-gray-500">response = requests.request(</span></div>
                    <div className="pl-2"><span className="text-green-400">"GET"</span>,</div>
                    <div className="pl-2"><span className="text-green-400">"https://ipinfo.com/"</span>,</div>
                    <div className="pl-2"><span className="text-gray-400">proxies=proxies</span><span className="text-gray-500">)</span></div>
                    <div className="h-1"></div>
                    <div><span className="text-purple-400">print</span>(<span className="text-gray-500">response.text</span>)</div>
                  </div>

                  {/* AI 状态指示器 - 右下角 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="absolute bottom-3 right-3 flex items-center gap-2"
                  >
                    {/* 运行状态指示灯 */}
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <span className="text-xs text-gray-200 font-medium">Running</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 底部说明文字 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative text-center max-w-5xl mx-auto group"
        >
          {/* 内容层 */}
          <div className="relative px-8 md:px-12 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              「数字员工平台」并非另一个AI工具平台，<br />而是一个新型的业务操作系统。
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              它通过降低AI使用门槛和自然的交互体验，解决企业真实业务痛点。
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              以业务目标为导向，组配定制软件工程&数据&AI的能力，实现降本增效的价值。
            </p>
          </div>
          
          {/* 装饰元素 */}
        </motion.div>
      </div>
    </section>
  );
}

