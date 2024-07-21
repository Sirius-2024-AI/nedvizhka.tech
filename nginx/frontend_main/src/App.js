import React from "react";
import MobileHeader from "./components/MobileHeader.tsx"
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import HowItWorks from "./components/HowItWorks.tsx";
import WhyUs from "./components/WhyUs.tsx";
import FAQ from "./components/FAQ.tsx";
import EvaluationForm from "./components/EvaluationForm.tsx";
import Footer from "./components/Footer.tsx";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center pt-11 bg-black">
      <MobileHeader />
      <Header logo="https://cdn.builder.io/api/v1/image/assets/TEMP/dbab6af55a4d44db6a43069e06e169dde27aeb951a576c1520d2855568e6fc8a?apiKey=325f674200924c05a4b34be8928260b3&" />
      <Hero
        heroImage="https://cdn.builder.io/api/v1/image/assets/TEMP/2e328922b69877bdaed54785530723d95cb093f74525ad087457ccaeb3b1dd0b?apiKey=325f674200924c05a4b34be8928260b3&"
        buttonImage="https://cdn.builder.io/api/v1/image/assets/TEMP/75640602df8a40302f8abd52e0742a45300da775093b72f39472464c3af7c272?apiKey=325f674200924c05a4b34be8928260b3&"
      />
      <HowItWorks
        apartmentImage="https://cdn.builder.io/api/v1/image/assets/TEMP/4174b96417948105ee4a0f40d031f3d27d32b3cedb1c3dd38ba7c1309bf06e9f?apiKey=325f674200924c05a4b34be8928260b3"
        reportImages={[
          "https://cdn.builder.io/api/v1/image/assets/TEMP/7529e65feaaa079d28e405ac11bd613322cfc5f31a37f083b4221cdb87da4bdd?apiKey=325f674200924c05a4b34be8928260b3&",
          "https://cdn.builder.io/api/v1/image/assets/TEMP/4abf7d3d9fa372ef53c3dcc5f5e355471032d56eebb0e3364ef23e38932cc41f?apiKey=325f674200924c05a4b34be8928260b3&",
          "https://cdn.builder.io/api/v1/image/assets/TEMP/4ebe83a1226c0a84eac159c17fe8fe15c4c1a50f4d74f1bccd07711832c7c1d1?apiKey=325f674200924c05a4b34be8928260b3&",
        ]}
      />
      <WhyUs />
      <FAQ />
      <EvaluationForm />
      <Footer
        logo="https://cdn.builder.io/api/v1/image/assets/TEMP/511411a769bc234fcb6fa56062e640b3f4cc9b46d9d461ceeaa3f456815f5575?apiKey=325f674200924c05a4b34be8928260b3&"
        GPB="https://cdn.builder.io/api/v1/image/assets/TEMP/ad3defb8de78b5229a7fd9c7a87c6cb76eadba71d7904670cf7433d1d5e060d0?apiKey=325f674200924c05a4b34be8928260b3&"
        Sirius="https://cdn.builder.io/api/v1/image/assets/TEMP/d5defe64a92574d10ab3c2bb7cb21a91912e64d5dee1af9bd94b0ee1168bfe7f?apiKey=325f674200924c05a4b34be8928260b3&"
      />
    </div>
  );
};

export default MainPage;
