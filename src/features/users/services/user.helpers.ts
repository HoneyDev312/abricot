import type { PendingProfileValues } from "../types/user.types";

function getStringFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function getPendingProfileValues(
  form: HTMLFormElement,
): PendingProfileValues {
  const formData = new FormData(form);
  const firstName = getStringFormValue(formData, "firstName");
  const lastName = getStringFormValue(formData, "lastName");

  return {
    email: getStringFormValue(formData, "email"),
    name: [firstName, lastName].filter(Boolean).join(" "),
    newPassword: getStringFormValue(formData, "newPassword"),
  };
}

export function isPendingProfileValuesChanged(
  currentValues: PendingProfileValues,
  initialValues: PendingProfileValues,
) {
  return (
    currentValues.email !== initialValues.email ||
    currentValues.name !== initialValues.name ||
    currentValues.newPassword !== initialValues.newPassword
  );
}
