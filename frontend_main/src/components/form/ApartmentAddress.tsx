import React from 'react'; 
import { AddressSuggestions, DaDataSuggestion, DaDataAddress } from 'react-dadata';
import './react-dadata.css';


interface AddressInputProps {
  address: string;
  setAddress: (address: string) => void;
  onNext: () => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ address, setAddress, onNext }) => {
  const handleAddressChange = (suggestion?: DaDataSuggestion<DaDataAddress>) => {
    if (suggestion) {
      setAddress(suggestion.value);
    }
  };

  const value = address ? { value: address } as DaDataSuggestion<DaDataAddress> : undefined;

  return (
    <main>
        <section>
          <h1 className="text-4xl font-bold text-white max-md:max-w-full font-mabry leading-none">
            введите адрес квартиры
          </h1>
          <AddressSuggestions
            token="12381a110fdf3449625c48d83d890b3717d3e2d0"
            value={value}
            onChange={handleAddressChange}
            inputProps={{
              placeholder: "г. Москва, ул. Бачуринская, д. 9, к. 1",
              className: "justify-center items-start px-7 py-5 mt-4 max-w-full rounded-3xl bg-zinc-300 text-black text-opacity-100 w-[558px] w-full max-md:flex-wrap max-md:px-5",
              'aria-label': "Введите адрес квартиры"
            }}
            selectOnBlur={true}
            suggestionClassName="px-7 py-4 text-base mt-2 ml-1 mr-1 bg-zinc-300 text-black text-opacity-100 rounded-3xl overflow-hidden"
          />
        </section>
    </main>
  );
};

export default AddressInput;
