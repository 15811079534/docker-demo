'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArchitectureDiagram from './ArchitectureDiagram';

export default function TechArchitecture() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            技术架构图
          </h2>
          <p className="text-sm md:text-base max-w-5xl mx-auto text-gray-600 leading-relaxed">
            从交互表现层到集成层与外部系统，完整展示久新数智数字员工平台的技术架构
          </p>
        </motion.div>

        {/* 架构图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 shadow-xl p-6 md:p-8">
      {/* 交互表现层 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">交互表现层</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-semibold text-purple-900 mb-3 text-sm md:text-base">执人化员工工作台</div>
            <div className="text-xs md:text-sm text-purple-700 space-y-1.5">
              <div className="font-medium text-purple-800">Web/小程序功能：</div>
              <div>· 统一对话入口（多模输入）</div>
              <div>· 动态面板（智能加载）</div>
              <div>· 我的技能工作区</div>
              <div>· 技能市场</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-semibold text-purple-900 mb-3 text-sm md:text-base">统一管理后台</div>
            <div className="text-xs md:text-sm text-purple-700 space-y-1.5">
              <div className="font-medium text-purple-800">Web管理功能：</div>
              <div>· 企业信息与订阅</div>
              <div>· 用户与组织架构</div>
              <div>· 技能包与应用</div>
              <div>· 权限配置中心</div>
              <div>· 数据监控与审计</div>
            </div>
          </div>
        </div>
      </div>

      {/* 箭头：从执人化员工工作台指向应用服务层 */}
      <div className="relative mb-6">
        <div className="absolute left-1/4 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-purple-400 to-purple-500"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-500"></div>
          <span className="text-xs text-purple-700 mt-1 font-medium bg-purple-50 px-2 py-0.5 rounded">请求</span>
        </div>
        <div className="h-16"></div>
      </div>

      {/* 应用服务层 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">应用服务层</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 shadow-sm">
          {/* API网关和消息队列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-3 shadow-sm">
              <div className="font-semibold text-blue-900 text-sm md:text-base">API网关</div>
              <div className="text-xs md:text-sm text-blue-700 mt-1">鉴权、路由、限流、熔断</div>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-lg p-3 shadow-sm">
              <div className="font-semibold text-blue-900 text-sm md:text-base">消息队列</div>
              <div className="text-xs md:text-sm text-blue-700 mt-1">异步解耦、松耦合通讯</div>
            </div>
          </div>

          {/* 箭头指向对话式交互服务 */}
          <div className="relative my-3">
            <div className="absolute left-[12.5%] transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-px h-6 bg-blue-400"></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-400"></div>
            </div>
            <div className="h-8"></div>
          </div>

          {/* 服务组件 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {/* 对话式交互服务及其对话引擎 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-white border-2 border-blue-400 rounded-lg p-2 text-center w-full shadow-sm">
                <div className="font-semibold text-blue-900 text-xs md:text-sm">对话式交互服务</div>
              </div>
              {/* 箭头 */}
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-blue-400"></div>
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-blue-400"></div>
              </div>
              <div className="bg-white border-2 border-blue-400 rounded-lg p-2 text-center w-full shadow-sm">
                <div className="font-semibold text-blue-900 text-xs md:text-sm">对话引擎</div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-blue-300 rounded-lg p-2 text-center shadow-sm">
              <div className="font-semibold text-blue-900 text-xs md:text-sm">技能市场服务</div>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-lg p-2 text-center shadow-sm">
              <div className="font-semibold text-blue-900 text-xs md:text-sm">监控分析服务</div>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-lg p-2 text-center shadow-sm">
              <div className="font-semibold text-blue-900 text-xs md:text-sm">租户管理服务</div>
            </div>
          </div>
        </div>
      </div>

      {/* 应用服务层到核心引擎层的箭头 */}
      {/* 移动端：单个居中箭头 */}
      <div className="flex md:hidden justify-center items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-blue-500"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500"></div>
          <span className="text-xs text-blue-700 mt-1 font-medium bg-blue-50 px-2 py-0.5 rounded">理解与执行</span>
        </div>
      </div>
      {/* 桌面端：两个箭头分别指向对应模块 */}
      <div className="hidden md:block relative mb-6">
        <div className="grid grid-cols-3 gap-3">
          {/* 箭头：理解意图 -> 自然语言理解 */}
          <div className="flex flex-col items-center">
            <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-blue-500"></div>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500"></div>
            <span className="text-xs text-blue-700 mt-1 font-medium bg-blue-50 px-2 py-0.5 rounded">理解意图</span>
          </div>
          {/* 箭头：执行技能 -> 技能调度中心 */}
          <div className="flex flex-col items-center">
            <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-blue-500"></div>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500"></div>
            <span className="text-xs text-blue-700 mt-1 font-medium bg-blue-50 px-2 py-0.5 rounded">执行技能</span>
          </div>
          {/* 空白占位 */}
          <div></div>
        </div>
      </div>

      {/* 核心引擎层 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">核心引擎层</h3>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-4 shadow-md">
          {/* 理解层、调度层、权限层 */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 flex-1 shadow-sm">
              <div className="font-semibold text-yellow-900 text-sm md:text-base mb-1">自然语言理解</div>
            </div>
            
            <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 flex-1 shadow-sm">
              <div className="font-semibold text-yellow-900 text-sm md:text-base mb-1">技能调度中心</div>
              <div className="text-xs text-yellow-700">RC技能仓库</div>
            </div>
            
            {/* 横向箭头：校验 - 在移动端显示为竖向 */}
            <div className="flex md:hidden flex-col items-center gap-1 flex-shrink-0">
              <div className="w-px h-6 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-yellow-600"></div>
              <span className="text-xs text-yellow-800 font-medium bg-yellow-50 px-2 py-0.5 rounded whitespace-nowrap">校验</span>
            </div>
            {/* 横向箭头：校验 - 在桌面端显示为横向 */}
            <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0">
              <span className="text-xs text-yellow-800 font-medium bg-yellow-50 px-2 py-0.5 rounded whitespace-nowrap">校验</span>
              <div className="flex items-center">
                <div className="h-px w-10 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-yellow-600"></div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 flex-1 shadow-sm">
              <div className="font-semibold text-yellow-900 text-sm md:text-base mb-1">权限引擎</div>
            </div>
          </div>

          {/* 箭头：调度能力 */}
          <div className="flex justify-center items-center my-3">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-yellow-600"></div>
              <span className="text-xs text-yellow-800 mt-1 font-medium bg-yellow-50 px-2 py-0.5 rounded">调度能力</span>
            </div>
          </div>

          {/* 能力组件层 */}
          <div className="bg-yellow-100 bg-opacity-50 border-t-2 border-yellow-400 rounded-lg pt-4 pb-3 px-3">
            <div className="text-xs md:text-sm text-yellow-900 mb-3 font-semibold">能力组件层</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 shadow-sm">
                <div className="font-semibold text-yellow-900 text-sm md:text-base mb-2">AI能力服务</div>
                <div className="text-xs md:text-sm text-yellow-700">大模型、语音、图文识别</div>
              </div>
              <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 shadow-sm">
                <div className="font-semibold text-yellow-900 text-sm md:text-base mb-2">业务能力服务</div>
                <div className="text-xs md:text-sm text-yellow-700">学员、工单、文档、档案</div>
              </div>
              <div className="bg-white border-2 border-yellow-400 rounded-lg p-3 shadow-sm">
                <div className="font-semibold text-yellow-900 text-sm md:text-base mb-2">数据连接服务</div>
                <div className="text-xs md:text-sm text-yellow-700">钉钉/企微连接器</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 箭头：读写数据 */}
      <div className="flex justify-center items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-yellow-600"></div>
          <span className="text-xs text-yellow-800 mt-1 font-medium bg-yellow-50 px-2 py-0.5 rounded">读写数据</span>
        </div>
      </div>

      {/* 数据与资源层 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">数据与资源层</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-pink-900 text-sm md:text-base mb-1">模型仓库</div>
            <div className="text-xs md:text-sm text-pink-700">行业模型</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-pink-900 text-sm md:text-base mb-1">业务数据库</div>
            <div className="text-xs md:text-sm text-pink-700">业务数据</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-pink-900 text-sm md:text-base mb-1">向量数据库</div>
            <div className="text-xs md:text-sm text-pink-700">语义检索</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-pink-900 text-sm md:text-base mb-1">元数据</div>
            <div className="text-xs md:text-sm text-pink-700">配置规则</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-pink-900 text-sm md:text-base mb-1">对象存储</div>
            <div className="text-xs md:text-sm text-pink-700">文件日志</div>
          </div>
        </div>
      </div>

      {/* 箭头：连接外部系统 */}
      <div className="flex justify-center items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-gray-500"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-500"></div>
        </div>
      </div>

      {/* 集成层与外部系统 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gray-500 rounded-full"></div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">集成层与外部系统</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">公有云AI服务</div>
            <div className="text-xs md:text-sm text-gray-700">百炼/DS/千问</div>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">客户业务系统</div>
            <div className="text-xs md:text-sm text-gray-700">ERP/CRM/文档系统</div>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 rounded-lg p-3 shadow-sm">
            <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">客户身份</div>
            <div className="text-xs md:text-sm text-gray-700">企微/钉钉/AD</div>
          </div>
        </div>
      </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

