import PricingPhilosophy from "./components/PricingPhilosophy";
import PricingTable from "./components/PricingTable";
import CustomizationServices from "./components/CustomizationServices";
import NextSteps from "./components/NextSteps";
import FAQ from "./components/FAQ";
function PricingPage() {
      const faqs = [
    {
      q: '平台费是否可以私有化买断？',
      a: '我们提供私有化部署选项，仅在企业版中提供。私有化部署需要一次性支付部署费用和年度维护费用。具体方案请联系我们的销售团队进行评估。',
    },
    {
      q: '定制开发完成后，后续迭代如何收费？',
      a: '定制开发交付后，功能的日常运维包含在平台年费中。如需新增功能或重大升级，将根据工作量另行评估报价。我们建议签署年度服务协议，享受优惠的迭代服务价格。',
    },
    {
      q: '是否可以买断定制部分的代码？',
      a: '可以。我们提供代码买断选项，买断后您将拥有定制代码的所有权。买断费用通常为开发费用的1.5-2倍。详情请咨询我们的销售团队。',
    },
    {
      q: '是否可以私有化部署？',
      a: '可以。企业版支持私有化部署，我们将在您的服务器环境中部署完整的平台。私有化部署需要额外的部署费用和硬件成本，我们会提供详细的部署方案和成本评估。',
    },
    {
      q: '如何计算定制开发的费用？',
      a: '定制开发费用基于项目的复杂度、集成深度和实施人天计算。我们会在需求评估后提供详细的报价，包括开发范围、时间计划和分阶段付款方案。',
    },
    {
      q: '试用期有多长？试用期需要付费吗？',
      a: '我们提供15天的免费试用期，包含基础功能和1个标准技能包。试用期内您可以充分体验平台能力。如需测试定制功能，我们可以安排专门的POC项目。',
    },
    {
      q: '支持哪些付款方式？',
      a: '我们支持银行转账、支票和企业对公账户支付。对于年度合同，支持分期付款（按季度或半年）。具体付款安排可以在合同签署时协商。',
    },
    {
      q: '可以从基础版升级到专业版或企业版吗？',
      a: '当然可以。您可以随时升级到更高版本。升级时，我们会根据已支付的费用和剩余服务期进行费用抵扣，只需补齐差额即可。',
    },
  ];
    return ( 
        <div className="min-h-screen bg-white">
            <PricingPhilosophy />
            <PricingTable /> 
            <CustomizationServices />
            <NextSteps />
            <FAQ faqs={faqs}/>
        </div>
     );
}

export default PricingPage;