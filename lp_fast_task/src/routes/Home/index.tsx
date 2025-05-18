import React from 'react';
import HeroSection from '../../sections/HeroSection';
import FeaturesSection from '../../sections/FeaturesSection';
import BenefitsSection from '../../sections/BenefitsSection';
import HowItWorksSection from '../../sections/HowItWorksSection';
import CallToActionSection from '../../sections/CallToActionSection';
import PricingSection from '../../sections/PricingSection';


const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection /> 
      <PricingSection />
      <CallToActionSection /> 
    </div>
  );
};

export default Home;