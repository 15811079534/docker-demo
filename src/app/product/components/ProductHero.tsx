'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VideoPlayer from '@/components/shared/VideoPlayer';

export default function ProductHero() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={heroRef} className="py-20 md:py-28 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/back_top.jpg)' }}>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            效率提升,超乎想象
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            产品视频：一个2-3分钟的短视频，讲述一个用户（如工程师王工）一天的工作故事，生动展示产品如何解决他的问题。
          </p>
        </motion.div>

        {/* 产品视频 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <VideoPlayer
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            posterUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop"
            autoPlay={true}
            loop={true}
          />
        </motion.div>
      </div>
    </section>
  );
}

