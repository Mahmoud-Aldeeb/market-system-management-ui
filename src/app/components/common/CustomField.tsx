// import React from "react";
// import { Field, useField } from "formik";
// import "@/app/styles/customStyle.scss";

// interface InputProps {
//   id?: string;
//   name?: string;
//   list?: string;
//   placeholder?: string;
//   type: string;
//   accept?: string;
//   value?: string | number;
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   // onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
// }

// export default function CustomField({
//   id,
//   name,
//   list,
//   placeholder,
//   type,
//   accept,
//   value,
//   onChange,
// }: // onBlur,
// InputProps) {
//   const [field] = useField(name || "");

//   const handleChange = onChange || field.onChange;
//   const inputValue = value !== undefined ? value : field.value;

//   return (
//     <div>
//       <Field
//         id={id}
//         className="custom-input"
//         type={type}
//         name={name || ""}
//         placeholder={placeholder}
//         list={list}
//         autoComplete="off"
//         accept={accept}
//         value={inputValue}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

// import React from "react";
// import { Field, useField } from "formik";
// import "@/app/styles/customStyle.scss";

// interface InputProps {
//   id?: string;
//   name?: string;
//   list?: string;
//   placeholder?: string;
//   type: string;
//   accept?: string;
//   value?: string | number;
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export default function CustomField({
//   id,
//   name,
//   list,
//   placeholder,
//   type,
//   accept,
//   onChange,
// }: InputProps) {
//   const [field, meta] = useField(name || "");

//   // دمج onChange الخاص بـ Formik مع الـ onChange اللي بيتم تمريره
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     field.onChange(e); // تحديث قيمة Formik
//     if (onChange) onChange(e); // تنفيذ أي onChange إضافي
//   };

//   return (
//     <div>
//       <Field
//         id={id}
//         className="custom-input"
//         type={type}
//         name={name || ""}
//         placeholder={placeholder}
//         list={list}
//         autoComplete="off"
//         accept={accept}
//         value={field.value || ""} // استخدام field.value بدلًا من inputValue
//         onChange={handleChange}
//       />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// }

import React from "react";
import { Field, useField } from "formik";
import "@/app/styles/customStyle.scss";

interface InputProps {
  id?: string;
  name?: string;
  list?: string;
  placeholder?: string;
  type: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CustomField({
  id,
  name,
  list,
  placeholder,
  type,
  accept,
  onChange,
  onBlur,
}: InputProps) {
  const [field] = useField(name || "");

  // دمج onChange الخاص بـ Formik مع الـ onChange اللي بيتم تمريره
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // التأكد من إن الحدث متاح للاستخدام
    field.onChange(e); // تحديث قيمة Formik
    if (onChange) onChange(e); // تنفيذ أي onChange إضافي
  };

  // دمج onBlur الخاص بـ Formik مع الـ onBlur اللي بيتم تمريره
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e); // تحديث حالة Formik
    if (onBlur) onBlur(e); // تنفيذ أي onBlur إضافي
  };

  return (
    <div>
      <Field
        id={id}
        className="custom-input"
        type={type}
        name={name || ""}
        placeholder={placeholder}
        list={list}
        autoComplete="off"
        accept={accept}
        value={field.value ?? ""} // استخدام ?? بدل || عشان نتعامل مع القيم الفارغة بشكل أفضل
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
