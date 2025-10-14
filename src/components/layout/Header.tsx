"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu,X } from 'lucide-react';
import { motion,AnimatePresence } from 'framer-motion';

function Header() {
    const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

    const navigation = [
    { name: '首页', href: '/' },
    { name: '产品概述', href: '/product' },
    { name: '解决方案', href: '/solutions' },
    { name: '客户案例', href: '/cases' },
    { name: '定价', href: '/pricing' },
    { name: '关于我们', href: '/about' },
  ];
    return ( 
        <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <nav className="container-custom">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* logg区域 */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative">
                            <Image 
                                src="https://www.9agent.net/image/logo-light.png"
                                alt="久新数智"
                                fill
                                className="object-contain"
                                priority>
                            </Image>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-gray-800">
                                久新数智
                            </span>
                            <span className="text-xs text-gray-600 -mt-1">
                                JiuXin Intelligence
                            </span>
                        </div>
                    </Link>

                    {/* pc端菜单 */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                        <Link className="btn-primary text-sm" href="/">
                            联系我们
                        </Link>
                    </div>

                    {/* 移动端菜单 */}
                    <button 
                        className="md:hidden p-2 txte-grap-700 hover:text-blue-600 transition-colors"
                        onClick={()=> setmobileMenuOpen(!mobileMenuOpen)}
                        aria-label='Toggle menu'>
                            {mobileMenuOpen ? (<X className='w-6'/>): (<Menu className='w-6 h-6'/>)}
                    </button>

                </div>
            </nav>
            
            {/* 移动端导航菜单 */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity:0, height: 0}}
                        animate={{ opacity:1, height: 'auto'}}
                        exit={{ opacity:0, height: 0}}
                        transition={{ duration: 0.3 }}
                        className='md:hidden bg-white border-t'>
                            <div className='container-custom py-4 space-y-3'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors'
                                        onClick={() => setmobileMenuOpen(false) }>
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/contact"
                                    className="block btn-primary text-center"
                                    onClick={() => setmobileMenuOpen(false)}>
                                    联系我们
                                </Link>
                            </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
     );
}

export default Header;

