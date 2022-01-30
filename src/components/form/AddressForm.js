import React from "react";
import InputFieldBold from "../form/InputFieldBold";
import InputField33 from "../form/InputField33";
import InputField65 from "../form/InputField65";
import InputFieldPhone from "../form/InputFieldPhone";

function AddressForm({ formValues, handleChange, error }) {
  return (
    <form className="p-4">
      <h3 className="leading-5 font-bold lg:text-2xl">Osobní informace</h3>
      <div>
        {/* first and last name */}
        <div className="flex flex-wrap justify-between">
          {/* input */}
          <InputFieldBold
            required={true}
            type="email"
            name="email"
            label="Email"
            prompt="Zadejte Email"
            error={error.email}
            value={formValues.email}
            handleChange={handleChange}
          />
          {/* input firstname */}
          <InputFieldBold
            required={true}
            type="text"
            name="first_name"
            label="Jméno"
            prompt="Zadejte Jméno"
            error={error.first_name}
            value={formValues.first_name}
            handleChange={handleChange}
          />
          {/* input lastname */}
          <InputFieldBold
            required={true}
            type="text"
            name="last_name"
            label="Přijmení"
            prompt="Zadejte přijmení"
            error={error.last_name}
            value={formValues.last_name}
            handleChange={handleChange}
          />
        </div>

        {/* post code and village */}
        <div className="flex flex-wrap justify-between">
          {/* input psc */}
          <InputField33
            required={true}
            type="number"
            name="postCode"
            label="PSČ"
            prompt="Zadejte PSČ"
            error={error.postCode}
            value={formValues.postCode}
            handleChange={handleChange}
          />
          {/* input obec */}
          <InputField65
            required={true}
            type="text"
            name="village"
            label="Obec"
            prompt="Zadejte obec"
            error={error.village}
            value={formValues.village}
            handleChange={handleChange}
          />
        </div>

        {/* street and descriptive number */}
        <div className="flex flex-wrap justify-between">
          {/* input street */}
          <InputField65
            required={true}
            type="text"
            name="street"
            label="Ulice"
            prompt="Zadejte ulici"
            error={error.street}
            value={formValues.street}
            handleChange={handleChange}
          />
          {/* input c. p. */}
          <InputField33
            required={true}
            type="number"
            name="numberDescriptive"
            label="Č. p."
            prompt="Zadejte Č. p."
            error={error.numberDescriptive}
            value={formValues.numberDescriptive}
            handleChange={handleChange}
          />
        </div>
      </div>
      <h3 className="my-7 leading-5 font-bold lg:text-2xl">
        Fakturační adresa
      </h3>
      <div className="mb-4">
        <label htmlFor="deli_address" className="relative flex">
          <input
            type="checkbox"
            id="deli_address"
            className="appearance-none h-6 w-6 border-2 border-gray-600 rounded-md mr-2"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-[2px] top-[2px] text-opacity-0 text-primary check-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Fakturační a doručovací adresa jsou shodné
        </label>
      </div>
      {/* phone number */}
      <InputFieldPhone
        required={true}
        name="phone"
        label="Telefonní číslo"
        prompt="Zadejte telefonní číslo"
        error={error.phone}
        value={formValues.phone}
        handleChange={handleChange}
      />
    </form>
  );
}

export default AddressForm;
