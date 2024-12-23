import { removeEmptyFields } from "@hyper/web-common";

export const convertToFormData = <SchemaType>(data: SchemaType): FormData => {
  const filtered = removeEmptyFields(data as Record<string, any>);
  const formData = new FormData();

  for (const key in filtered) {
    const value = (data as any)[key];
    if (value !== null && value !== undefined && value !== "") {
      // Skip if value is null, undefined, or an empty string
      if (key === "image" || key === "doc") {
        // Handle files separately
        const file = value as File;
        formData.append(key, file, file.name);
      } else {
        // Handle other form fields
        formData.append(String(key), String(value));
      }
    }
  }

  return formData;
};

export function objectToFormData(
  obj: any,
  form?: FormData,
  namespace?: string,
): FormData {
  const formData = form || new FormData();

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], formData, formKey);
      } else {
        formData.append(formKey, obj[property]);
      }
    }
  }

  return formData;
}
