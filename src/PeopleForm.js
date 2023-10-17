import React, { useState } from "react";

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState("");

  function handleIsimChange(e) {
    setIsim(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitFn(isim);
    setIsim("");
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="form-line pt-4">
        <label className="input-label text-sm block pb-1.5" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text block w-full border-solid border-2 border-[#ccc] p-1.25 text-sm leading-6 rounded-sm"
          id="title"
          name="title"
          type="text"
          onChange={handleIsimChange}
          value={isim}
        />
        {kisiler.includes(isim) && (
          <p className="input-error text-xs pt-1 text-[#e62b2b]">
            Bu isim daha önce eklenmiş
          </p>
        )}
      </div>

      <div className="form-line pt-4">
        <button
          className="submit-button block w-full border-0 py-2 px-4 bg-[#fecc91] text-[#00000099] cursor-pointer rounded-sm shadow-md"
          type="submit"
          disabled={isim.length === 0 || kisiler.includes(isim)}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
