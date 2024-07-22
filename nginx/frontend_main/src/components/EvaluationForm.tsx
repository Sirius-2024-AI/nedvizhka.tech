import React, { useEffect, useState } from "react";
import ApartmentSize from "./form/ApartmentSize";
import KitchenSize from "./form/KitchenSize";
import RoomCount from "./form/RoomCount";
import ApartmentType from "./form/ApartmentType";
import NextButton from "./form/NextButton";
import ApartmentFloor from "./form/ApartmentFloor";
import FloorCount from "./form/FloorCount";
import ApartmentYear from "./form/ApartmentYear";
import MaterialType from "./form/MaterialType";
import ApartmentView from "./form/ApartmentView";
import BalconyType from "./form/BalconyType";
import ContactForm from "./form/ContactForm";
import ApartmentAddress from "./form/ApartmentAddress";
import FinalStep from "./form/FinalStep";

const YANDEX_API_KEY = 'fe4584b4-f67d-4b31-872c-d6be602c115b';

declare global {
  interface Window {
    ymaps: any;
  }
}

const EvaluationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<string>("");
  const [apartmentSize, setApartmentSize] = useState(24);
  const [kitchenSize, setKitchenSize] = useState(6);
  const [roomCount, setRoomCount] = useState(1);
  const [apartmentFloor, setApartmentFloor] = useState(1);
  const [floorCount, setFloorCount] = useState(1);
  const [apartmentYear, setApartmentYear] = useState(1982);
  const [materialType, setMaterialType] = useState("monolithic");
  const [apartmentType, setApartmentType] = useState("simple");
  const [apartmentView, setApartmentView] = useState("mixed");
  const [balconyType, setBalconyType] = useState(0);
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    phone: '',
    email: '',
  });
  const [city, setCity] = useState<string | null>(null);
  const [nearestMetro, setNearestMetro] = useState<string | null>(null);
  const [addressCoords, setAddressCoords] = useState<[number, number] | null>(null);
  const [cityCoords, setCityCoords] = useState<[number, number] | null>(null);
  const [metroCoords, setMetroCoords] = useState<[number, number] | null>(null);
  const handleFormDataChange = (data: { surname: string; name: string; phone: string; email: string }) => {
    setFormData(data);
  };
  const handleContactFormSubmit = (data: { surname: string; name: string; phone: string; email: string }) => {
    setFormData(data);
  };
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBJG7F-jPXkiOGJQjgDHtK_lf-dqKPH1R4&center=${encodeURIComponent(address)}&zoom=13&size=1200x800&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Cc`;

  let [isNextStepAllowed, setIsNextStepAllowed] = useState(true);

  useEffect(() => {
    const loadYmaps = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.ymaps) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_API_KEY}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Yandex Maps API load error'));
        document.body.appendChild(script);
      });
    };

    const geocodeAddress = async (address: string) => {
      try {
        await loadYmaps();
        const ymaps = window.ymaps;
        if (ymaps) {
          await ymaps.ready();

          const res = await ymaps.geocode(address);
          const firstGeoObject = res.geoObjects.get(0);

          if (firstGeoObject) {
            const coords = firstGeoObject.geometry?.getCoordinates();
            setAddressCoords(coords);
            // console.log("Координаты: ", coords);
            // console.log("Адрес: " + firstGeoObject.getAddressLine());

            // Обратный геокодинг для получения имени города
            const reverseRes = await ymaps.geocode(coords);
            const reverseFirstGeoObject = reverseRes.geoObjects.get(0);
            const city = reverseFirstGeoObject.getLocalities().length ? reverseFirstGeoObject.getLocalities()[0] : reverseFirstGeoObject.getAdministrativeAreas()[0];
            setCity(city);

            // Прямой геокодинг для получения ближайшего метро
            const metroRes = await ymaps.geocode(coords, { kind: 'metro', results: 1 });
            const nearestMetro = metroRes.geoObjects.get(0);
            const metroName = nearestMetro ? nearestMetro.properties.get('name') : null;
            setNearestMetro(metroName);
          }
        } else {
          console.error("Yandex Maps API not loaded properly.");
        }
      } catch (error) {
        console.error("Error fetching data from Yandex Maps API:", error);
      }
    };

    geocodeAddress(address);
  }, [address]); 

  useEffect(() => {
    const loadYmaps = () => {
      return new Promise((resolve, reject) => {
        if (window.ymaps) {
          resolve(undefined);
          return;
        }
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_API_KEY}`;
        script.onload = () => resolve(undefined);
        script.onerror = () => reject(new Error('Yandex Maps API load error'));
        document.body.appendChild(script);
      });
    };

    const geocodeCityAndMetro = async (findCity: string, findNearestMetro: string) => {
      try {
        await loadYmaps();
        const ymaps = window.ymaps;
        if (ymaps) {
          await ymaps.ready();

          // Геокодинг города для получения координат
          const cityRes = await ymaps.geocode(findCity);
          const firstCityGeoObject = cityRes.geoObjects.get(0);

          if (firstCityGeoObject) {
            const cityCoords = firstCityGeoObject.geometry?.getCoordinates();
            setCityCoords(cityCoords);
            // console.log("Координаты города: ", cityCoords);
            // console.log("Адрес города: " + firstCityGeoObject.getAddressLine());

            // Геокодинг метро для получения координат
            const metroRes = await ymaps.geocode(findNearestMetro, { kind: 'metro' });
            const firstMetroGeoObject = metroRes.geoObjects.get(0);

            if (firstMetroGeoObject) {
              const metroCoords = firstMetroGeoObject.geometry?.getCoordinates();
              setMetroCoords(metroCoords);
              // console.log("Координаты метро: ", metroCoords);
              // console.log("Адрес метро: " + firstMetroGeoObject.getAddressLine());
            }
          }
        } else {
          console.error("Yandex Maps API not loaded properly.");
        }
      } catch (error) {
        console.error("Error fetching data from Yandex Maps API:", error);
      }
    };
    geocodeCityAndMetro(String(city), String(nearestMetro));
  }, [city, nearestMetro]);

  const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
    const R = 6371; // Радиус Земли в км
    const dLat = (coords2[0] - coords1[0]) * (Math.PI / 180);
    const dLon = (coords2[1] - coords1[1]) * (Math.PI / 180);
    const lat1 = coords1[0] * (Math.PI / 180);
    const lat2 = coords2[0] * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const metro_dist_km = calculateDistance(addressCoords || [0, 0], metroCoords || [0, 0]);
  const distance_to_center = calculateDistance(addressCoords || [0, 0], cityCoords || [0, 0]);

  const handleNext = () => {
    console.log(isNextStepAllowed)
    if (step < 13) {
      if (!isNextStepAllowed) {
        alert('Поле заполнено некорректно')
        return;
      } else {
        setStep(step + 1);
      }
    } if (step === 12) {
      console.log("Form submitted", {
        address,
        city,
        nearestMetro,
        metro_dist_km,
        distance_to_center,
        apartmentSize,
        kitchenSize,
        roomCount,
        apartmentFloor,
        floorCount,
        apartmentYear,
        materialType,
        balconyType,
        apartmentType,
        apartmentView,
        formData,
      });
      
      const jsonForServer = {
        first_name: formData.name,
        last_name: formData.surname,
        user_phone: formData.phone,
        user_email: formData.email,
        address: address,
        city: city,
        area: apartmentSize,
        kitchen_area: kitchenSize,
        count_rooms: roomCount,
        floor: apartmentFloor,
        floor_count: floorCount,
        construction_year: apartmentYear,
        house_type: materialType,
        balcony: balconyType,
        repair_type: apartmentType,
        metro_name: nearestMetro,
        metro_dist_km: metro_dist_km,
        distance_to_center: distance_to_center,
      }

      // Отправка данных на сервер
      fetch('https://api.nedvizhka.tech/api/individual/valuation',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonForServer)
      })
    }
  };

  if (step === 13) {
      return (
        <div id="evaluation" className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full">
        <div className="flex flex-col justify-center self-center py-1 max-w-full text-6xl font-bold text-center max-md:text-4.2xl">
          <div className="flex flex-row justify-center max-md:text-4.2xl">
            <h1 className="max-md:text-4.2xl">
              <span className="font-mabry">получить <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">оценку стоимости</span> <br></br>недвижимости</span>
            </h1>
          </div>
        </div>
        <FinalStep />
        </div>
      );
  }

  return (
    <div id="evaluation" className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full max-md:px-5">
      <div className="flex flex-col justify-center self-center py-1 max-w-full text-6xl font-bold text-center max-md:text-4.2xl">
        <div className="flex flex-row justify-center max-md:text-4.2xl">
          <h1 className="max-md:text-4.2xl">
            <span className="font-mabry">получить <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">оценку стоимости</span> недвижимости</span>
          </h1>
        </div>
      </div>
      
        {step === 1 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 w-full h-full bg-cover bg-center rounded-[30px] max-md:px-5" style={{ backgroundImage: `url(${mapUrl})`}}>
            <ApartmentAddress 
              address={address} 
              setAddress={setAddress} 
              onNext={handleNext} 
            />
            <NextButton onClick={handleNext} isLastStep={step === 1} />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
            <ApartmentSize
              size={apartmentSize}
              onSizeChange={(size) => setApartmentSize(size)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 2} />
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
            <KitchenSize
              size={kitchenSize}
              onSizeChange={(size) => setKitchenSize(size)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 3} />
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
            <RoomCount
              count={roomCount}
              onCountChange={(count) => setRoomCount(count)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 4} />
          </div>
        )}
        {step === 5 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
            <ApartmentFloor
              count={apartmentFloor}
              onCountChange={(count) => setApartmentFloor(count)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 5} />
          </div>
        )}
        {step === 6 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
            <FloorCount
              count={floorCount}
              onCountChange={(count) => setFloorCount(count)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 6} />
          </div>
        )}
        {step === 7 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <ApartmentYear
              size={apartmentYear}
              onSizeChange={(size) => setApartmentYear(size)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 7} />
          </div>
        )}
        {step === 8 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <MaterialType
              type={materialType}
              onTypeChange={(type) => setMaterialType(type)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 8} />
          </div>
        )}
        {step === 9 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <BalconyType
              size={balconyType}
              onSizeChange={(size) => setBalconyType(size)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 9} />
          </div>
        )}
        {step === 10 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <ApartmentType
              type={apartmentType}
              onTypeChange={(type) => setApartmentType(type)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 10} />
          </div>
        )}
        {step === 11 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <ApartmentView
              type={apartmentView}
              onTypeChange={(type) => setApartmentView(type)}
              permissionForNextStep={setIsNextStepAllowed}
            />
            <NextButton onClick={handleNext} isLastStep={step === 11} />
          </div>
        )}
        {step === 12 && (
          <div className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5"> 
            <ContactForm
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onSubmit={handleContactFormSubmit}
            />
            <NextButton onClick={handleNext} isLastStep={step === 12} />
          </div>
        )}
      </div>
  );
};

export default EvaluationForm;
