import ProductHero from "./components/ProductHero";
import CoreFeatures from "./components/CoreFeatures";
import TechArchitecture from "./components/TechArchitecture";
function Product() {
    return ( 
        <div className="min-h-screen bg-white">
            {/* 视频区 */}
            <ProductHero />

            {/* 核心功能与交互 */}
            <CoreFeatures />

            {/* 技术架构图 */}
            <TechArchitecture /> 
        </div>
     );
}

export default Product;