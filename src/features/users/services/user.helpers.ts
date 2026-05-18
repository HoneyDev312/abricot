import type { PendingProfileValues, UserProfile } from "../types/user.types";

function getStringFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function getPendingProfileValues(
  form: HTMLFormElement,
): PendingProfileValues {
  const formData = new FormData(form);

  return {
    email: getStringFormValue(formData, "email"),
    firstname: getStringFormValue(formData, "firstname"),
    name: getStringFormValue(formData, "name"),
    newPassword: getStringFormValue(formData, "newPassword"),
  };
}

export function isPendingProfileValuesChanged(
  currentValues: PendingProfileValues,
  initialValues: PendingProfileValues,
) {
  return (
    currentValues.email !== initialValues.email ||
    currentValues.firstname !== initialValues.firstname ||
    currentValues.name !== initialValues.name ||
    currentValues.newPassword !== initialValues.newPassword
  );
}

export function getDisplayName({
  email,
  firstname,
  name,
}: Pick<UserProfile, "email" | "firstname" | "name">) {
  return [firstname, name].filter(Boolean).join(" ") || email;
}

export function getUserInitials({
  email,
  firstname,
  name,
}: {
  email: string;
  firstname?: string | null;
  name?: string | null;
}) {
  const nameParts = [firstname, name]
    .filter(Boolean)
    .flatMap((part) => part?.trim().split(" "))
    .filter((part): part is string => Boolean(part));

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return initials || email.trim().charAt(0).toUpperCase();
}
