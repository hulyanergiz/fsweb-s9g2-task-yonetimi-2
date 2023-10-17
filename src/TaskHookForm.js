import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function mySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    toast.success(data.title + " başarıyla eklendi");
    reset({
      title: "",
      description: "",
      deadline: "",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="form-line pt-4">
        <label className="input-label text-sm block pb-1.5" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text block w-full border-solid border-2 border-[#ccc] p-1.25 text-sm leading-6 rounded-sm"
          {...register("title", { required: "Task başlığı yazmalısınız" })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && (
          <p className="input-error  text-xs pt-1 text-[#e62b2b]">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="form-line pt-4">
        <label
          className="input-label text-sm block pb-1.5"
          htmlFor="description"
        >
          Açıklama
        </label>
        <textarea
          className="input-textarea block w-full border-solid border-2 border-[#ccc] p-1.25 text-sm leading-6 rounded-sm"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter içermelidir",
            },
          })}
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className="input-error text-xs pt-1 text-[#e62b2b]">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="form-line pt-4">
        <label className="input-label text-sm block pb-1.5">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label
              className="input-checkbox text-sm py-1.5 pr-2 pl-1 rounded-sm border-solid border-2 border-[#ccc] mr-2 mb-2 inline-flex items-center cursor-pointer"
              key={p}
            >
              <input
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçin",
                  validate: {
                    maxKisi: (value) =>
                      value.length < 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error  text-xs pt-1 text-[#e62b2b]">
            {errors.people.message}
          </p>
        )}
      </div>

      <div className="form-line pt-4">
        <label className="input-label text-sm block pb-1.5" htmlFor="deadline">
          Son teslim
        </label>
        <input
          className="input-text block w-full border-solid border-2 border-[#ccc] p-1.25 text-sm leading-6 rounded-sm"
          {...register("deadline", {
            required: "Son teslim tarihi seçmelisiniz",
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className="input-error  text-xs pt-1 text-[#e62b2b]">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div className="form-line pt-4">
        <button
          className="submit-button block w-full border-0 py-2 px-4 bg-[#fecc91] text-[#00000099] cursor-pointer rounded-sm shadow-md"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
