'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 表单验证 schema
const contactFormSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  company: z.string().min(2, '公司名称至少需要2个字符'),
  position: z.string().min(2, '职位至少需要2个字符'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确的手机号码'),
  email: z.string().email('请输入正确的邮箱地址'),
  requirements: z.string().min(10, '需求描述至少需要10个字符'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  variant?: 'default' | 'embedded';
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  variant = 'default',
  title = '预约15分钟专家咨询',
  subtitle = '填写以下信息，我们的解决方案专家将在24小时内与您联系',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: 集成飞书多维表格 API
      // 这里暂时模拟提交
      console.log('表单数据:', data);
      
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      reset();

      // 3秒后重置状态
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={variant === 'default' ? 'card' : ''}>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 标题 */}
            {variant === 'default' && (
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {title}
                </h2>
                <p className="text-gray-600">{subtitle}</p>
              </div>
            )}

            {/* 表单 */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 姓名 */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入您的姓名"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* 公司 */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    公司 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入您的公司名称"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* 职位 */}
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    职位 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('position')}
                    type="text"
                    id="position"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入您的职位"
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                {/* 手机号 */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    手机号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入您的手机号"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* 邮箱 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="请输入您的邮箱地址"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* 需求描述 */}
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  需求描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('requirements')}
                  id="requirements"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="请描述您的需求和期望，例如：想要解决什么问题、期望的效果、预算范围等"
                />
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    提交中...
                  </>
                ) : (
                  <>
                    提交咨询
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* 隐私提示 */}
              <p className="text-sm text-gray-500 text-center">
                提交即表示您同意我们的
                <a href="/privacy" className="text-blue-600 hover:underline">
                  隐私政策
                </a>
                ，我们将严格保护您的个人信息
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">提交成功！</h3>
            <p className="text-gray-600 mb-6">
              感谢您的咨询，我们的专家将在24小时内与您联系
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              继续浏览
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

