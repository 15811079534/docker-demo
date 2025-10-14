import ContactForm from '@/components/shared/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: '联系我们 - 久新数智',
  description: '联系久新数智，获取专业的数字员工解决方案咨询服务',
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: '邮箱',
      content: 'contact@jiuxinshuzhi.com',
      link: 'mailto:contact@jiuxinshuzhi.com',
    },
    {
      icon: Phone,
      title: '电话',
      content: '+86 xxx-xxxx-xxxx',
      link: 'tel:+86-xxx-xxxx-xxxx',
    },
    {
      icon: MapPin,
      title: '地址',
      content: '中国·北京',
      link: null,
    },
    {
      icon: Clock,
      title: '工作时间',
      content: '周一至周五 9:30-18:30',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/back_top.jpg)' }}>
        <div className="container-custom text-center text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">联系我们</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            让我们一起探讨如何通过数字员工提升您的业务效率
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 左侧：联系信息 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                我们随时为您服务
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                无论您是想了解产品详情、获取定制方案，还是预约演示，我们的专家团队都将竭诚为您服务。
              </p>

              {/* 联系方式卡片 */}
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = info.link ? (
                    <a
                      href={info.link}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <span className="text-gray-900">{info.content}</span>
                  );

                  return (
                    <div
                      key={info.title}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{info.title}</div>
                        <div className="font-semibold">{content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 承诺 */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3">我们的承诺</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    24小时内响应您的咨询
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    3个工作日内提供定制方案
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    专业的解决方案架构师一对一服务
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    严格保护您的商业信息和隐私
                  </li>
                </ul>
              </div>
            </div>

            {/* 右侧：表单 */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            常见问题
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '咨询服务是免费的吗？',
                a: '是的，我们提供免费的初步咨询和方案评估服务。我们的专家会详细了解您的需求，并提供专业建议。',
              },
              {
                q: '多久能收到回复？',
                a: '我们承诺在24小时内响应您的咨询。对于定制方案，我们将在3个工作日内提供详细的方案和报价。',
              },
              {
                q: '可以预约现场演示吗？',
                a: '当然可以。我们支持线上演示和线下拜访两种方式。您可以在表单中说明您的偏好，我们会安排合适的时间。',
              },
              {
                q: '我的信息会被保密吗？',
                a: '绝对保密。我们严格遵守隐私政策，所有客户信息都经过加密保护，仅用于为您提供服务。',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

