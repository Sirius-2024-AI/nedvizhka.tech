import React from 'react';

import Header from './components/Header.tsx'
import First from './components/First.tsx';
import MobileHeader from "./components/MobileHeader.tsx"
import Footer from './components/Footer.tsx';
import Features from './components/Features.tsx';
import ClientExperience from './components/ClientExperience.tsx';
import Tools from './components/Tools.tsx';
import RegistrationForm from './components/RegistrationForm.tsx';

function App() {
    return ( 
        
        <div className='flex flex-col items-center pt-11 bg-black text-white '>
            <MobileHeader />
            <Header logo="https://cdn.builder.io/api/v1/image/assets/TEMP/dbab6af55a4d44db6a43069e06e169dde27aeb951a576c1520d2855568e6fc8a?apiKey=325f674200924c05a4b34be8928260b3&" />
            <First buttonImage='https://cdn.builder.io/api/v1/image/assets/TEMP/4b03be7fe43c08afadb91aff4ca820e6a39e527beb82a8a7cd55b0f65b6388a7?apiKey=5e0d9264fc9a4d708f7164c058795995&' heroImage='https://cdn.builder.io/api/v1/image/assets/TEMP/5fab2ec1246eabceb6e1566583d611e76e30f63e65d8af71db03d87437dcb77a?apiKey=5e0d9264fc9a4d708f7164c058795995&width=2000 '/>
            <h2 className="max-md:text-4.2xl leading-none mt-20 text-6xl font-mabry text-center text-white w-[760px] max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                <span className="max-md:text-4.2xl leading-none bg-clip-text text-transparent bg-gradient-to-r font-mabry from-cyan-300 to-blue-500">готовый API </span> <br></br> <span className='max-md:text-4.2xl'>для вашего бизнеса</span>
            </h2>
            <Features />
            <ClientExperience />
            <h2 className="max-md:text-4.2xl leading-none mt-20 text-6xl font-mabry text-center text-white w-[760px] max-md:max-w-full max-md:text-4xl">
                <span className='max-md:text-4.2xl'>широкий набор</span> <span className="max-md:text-4.2xl leading-none bg-clip-text text-transparent bg-gradient-to-r font-mabry from-cyan-300 to-blue-500">инструментов</span>
            </h2>
            <Tools />

            <h2 id="connect" className="max-md:text-4.2xl leading-none mt-20 text-6xl font-mabry text-center text-white w-[760px] max-md:max-w-full max-md:text-4xl">
                <span className="max-md:text-4.2xl leading-none bg-clip-text text-transparent bg-gradient-to-r font-mabry from-cyan-300 to-blue-500">зарегистрируйтесь</span> <br></br> <span className='max-md:text-4.2xl'>и получите доступ</span>
            </h2>
            <RegistrationForm />
            <Footer logo="https://cdn.builder.io/api/v1/image/assets/TEMP/511411a769bc234fcb6fa56062e640b3f4cc9b46d9d461ceeaa3f456815f5575?apiKey=325f674200924c05a4b34be8928260b3&"
                    GPB="https://cdn.builder.io/api/v1/image/assets/TEMP/ad3defb8de78b5229a7fd9c7a87c6cb76eadba71d7904670cf7433d1d5e060d0?apiKey=325f674200924c05a4b34be8928260b3&"
                    Sirius="https://cdn.builder.io/api/v1/image/assets/TEMP/d5defe64a92574d10ab3c2bb7cb21a91912e64d5dee1af9bd94b0ee1168bfe7f?apiKey=325f674200924c05a4b34be8928260b3&"/>
        </div>
    );
    }   
 
export default App;
