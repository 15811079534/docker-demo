'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import FinalCTA from './FinalCTA';
export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: {
      title: '关于',
      links: [
        { name: '关于我们', href: '/about' },
        { name: '加入我们', href: '/careers' },
        { name: '服务条款', href: '/terms' },
      ],
    },
    more: {
      title: '更多',
      links: [
        { name: '合作伙伴', href: '/partners' },
        { name: '精益创造咨询服务', href: '/consulting' },
        { name: '智慧合作伙伴', href: '/smart-partners' },
      ],
    },
    pricing: {
      title: '定价',
      links: [
        { name: '大模型应用定制', href: '/pricing/custom' },
        { name: '大模型定价', href: '/pricing/model' },
        { name: '基础算力定价', href: '/pricing/compute' },
      ],
    },
  };

  const partners = [
    { name: 'OpenAI', logo: 'https://logo.clearbit.com/openai.com' },
    { name: 'Microsoft Azure', logo: 'https://logo.clearbit.com/azure.microsoft.com' },
    { name: 'Amazon AWS', logo: 'https://logo.clearbit.com/aws.amazon.com' },
    { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
    { name: 'NVIDIA', logo: 'https://logo.clearbit.com/nvidia.com' },
    { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建星星
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      isSpecial: boolean;
    }> = [];

    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < starCount; i++) {
        const isSpecial = Math.random() < 0.15; // 15%的星星是特殊闪烁星
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isSpecial ? Math.random() * 2 + 1 : Math.random() * 1.2 + 0.5,
          opacity: isSpecial ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.3,
          twinkleSpeed: isSpecial ? Math.random() * 0.05 + 0.03 : Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          isSpecial,
        });
      }
    };
    createStars();

    // 动画循环
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = star.opacity * twinkle;

        if (star.isSpecial) {
          // 特殊星星带光晕效果
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          gradient.addColorStop(0.5, `rgba(200, 220, 255, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // 绘制星星本体
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
        
        // 特殊星星额外的亮点
        if (star.isSpecial && twinkle > 0.7) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 1.5})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <FinalCTA />
   
    <footer className="relative text-white overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950">
      {/* Starry Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      
      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Company Info Section - 居中显示，点击跳转 */}
        <div className="mb-10 text-center md:mb-12">
          <Link 
            href="https://www.9agent.net/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 group cursor-pointer transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-blue-300 transition-colors">
              9Agent.ai
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-gray-100 transition-colors">
              构建企业数字员工矩阵，开启AI赋能时代新篇章
            </p>
          </Link>
        </div>

        {/* Links Grid - 移动端2列，桌面端4列 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12 mb-12">
          {/* QR Code */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base drop-shadow-md">久新公众号</h3>
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-white p-3 rounded-lg">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                  二维码
                </div>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base drop-shadow-md">{footerLinks.about.title}</h3>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base drop-shadow-md">{footerLinks.more.title}</h3>
            <ul className="space-y-3">
              {footerLinks.more.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base drop-shadow-md">{footerLinks.pricing.title}</h3>
            <ul className="space-y-3">
              {footerLinks.pricing.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-600/50 pt-8">
          <div className="relative overflow-hidden py-2">
            {/* 左右渐变遮罩 - 移动端窄一些 */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
            
            {/* 轮播容器 - 使用 group 悬停暂停 */}
            <div className="flex gap-3 md:gap-6 animate-scroll group">
              {/* 渲染两次以实现无缝循环 */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-36 md:w-48 relative group/card"
                >
                  {/* 发光效果层 */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover/card:opacity-100 blur-xl transition-all duration-500"></div>
                  
                  {/* 卡片主体 - 玻璃态效果 */}
                  <div className="relative rounded-lg md:rounded-xl p-3 md:p-4 group-hover/card:backdrop-blur-sm group-hover/card:bg-gradient-to-br group-hover/card:from-cyan-500/20 group-hover/card:via-blue-500/10 group-hover/card:to-purple-500/5 transition-all duration-300 group-hover/card:transform group-hover/card:-translate-y-1 group-hover/card:shadow-xl group-hover/card:shadow-cyan-500/30">
                    <div className="flex items-center gap-2 md:gap-3">
                      {/* Logo容器 */}
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center group-hover/card:bg-white group-hover/card:shadow-lg group-hover/card:shadow-cyan-400/50 transition-all duration-300 group-hover/card:scale-110 overflow-hidden p-1">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h4 className="text-white font-semibold text-sm md:text-base truncate group-hover/card:text-cyan-100 transition-colors duration-300">
                        {partner.name}
                      </h4>
                    </div>
                    
                    {/* 顶部高光线 */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/card:via-cyan-300/70 transition-all duration-300"></div>
                    
                    {/* 内部光晕 */}
                    <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-600/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-200">
            {/* Left Side */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  隐私协议
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  使用指南
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/license" className="hover:text-white transition-colors">
                  许可证
                </Link>
              </div>
              <p className="text-center md:text-left text-gray-300">
                Copyright © {currentYear} 京ICP备2024071666号-2
              </p>
            </div>
            
            {/* Right Side */}
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto text-center md:text-right text-gray-200">
              <span>邮箱：contact@9agent.net</span>
              <span>联系我们：北京市朝阳区望京SOHO Tower C座 27层</span>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </div>

 
  );
}

