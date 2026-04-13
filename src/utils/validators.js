export function required(value) {
  return value ? "" : "This field is required.";
}

export function phone(value) {
  if (!value) return "Phone number is required.";
  return /^[6-9]\d{9}$/.test(String(value).replace(/\s+/g, "")) ? "" : "Enter a valid 10-digit phone number.";
}

export function email(value) {
  if (!value) return "Email is required.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
}

export function validateLead(form) {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Name is required.";
  const phoneError = phone(form.phone);
  if (phoneError) errors.phone = phoneError;
  if (!form.message?.trim()) errors.message = "Message is required.";
  return errors;
}

export function validateAuth(form, mode) {
  const errors = {};
  if (mode === "signup" && !form.name?.trim()) errors.name = "Name is required.";
  const emailError = email(form.email);
  if (emailError) errors.email = emailError;
  if (!form.password || form.password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export function validatePropertyForm(form, step, final = false) {
  const errors = {};
  if (step === 1 || final) {
    if (!form.title?.trim()) errors.title = "Title is required.";
    if (!form.locality?.trim()) errors.locality = "Locality is required.";
  }
  if (step === 2 || final) {
    if (!form.price || Number(form.price) <= 0) errors.price = "Enter a valid price.";
    if (!form.area || Number(form.area) <= 0) errors.area = "Enter a valid area.";
    if (form.bedrooms === "" || Number(form.bedrooms) < 0) errors.bedrooms = "Enter bedroom count.";
    if (form.bathrooms === "" || Number(form.bathrooms) < 0) errors.bathrooms = "Enter bathroom count.";
  }
  if (step === 4 || final) {
    if (!form.ownerName?.trim()) errors.ownerName = "Owner name is required.";
    const phoneError = phone(form.ownerPhone);
    if (phoneError) errors.ownerPhone = phoneError;
    const emailError = email(form.ownerEmail);
    if (emailError) errors.ownerEmail = emailError;
  }
  return errors;
}
