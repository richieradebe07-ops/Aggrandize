// Single source of truth for the company's legally-required details —
// referenced by every legal page (Privacy, Terms, Cookies, Refunds,
// Company Information) and the footer, per POPIA and section 43 of the
// Electronic Communications and Transactions Act. Edit the values below as
// the business's actual legal status changes; nothing else needs to.

const REGISTRATION_NUMBER_PLACEHOLDER = "[REG NUMBER]";
const STREET_ADDRESS_PLACEHOLDER = "[STREET ADDRESS]";

// Set this once a real registration number exists — legalName/legalStatus
// below then switch from sole-proprietor to Pty Ltd automatically. Until
// then, this deliberately does NOT claim registered-company status, since
// that isn't true yet and misrepresenting it is a real legal problem, not
// just a copy nit.
const registrationNumber = REGISTRATION_NUMBER_PLACEHOLDER;
const isRegistered = registrationNumber !== REGISTRATION_NUMBER_PLACEHOLDER;

// Same idea for the street address: known city/province/country go out
// live today; the unknown street portion is added automatically (with no
// code changes elsewhere) once it's filled in here.
const streetAddress = STREET_ADDRESS_PLACEHOLDER;
const cityAddress = "Pietermaritzburg, KwaZulu-Natal, South Africa";

export const COMPANY = {
  legalName: isRegistered
    ? "Aggrandize Web Co (Pty) Ltd"
    : "Asanda Richard Radebe, trading as Aggrandize Web Co",
  legalStatus: isRegistered ? "Private company" : "Sole proprietor",
  registrationNumber,
  physicalAddress:
    streetAddress === STREET_ADDRESS_PLACEHOLDER
      ? cityAddress
      : `${streetAddress}, ${cityAddress}`,
  informationOfficer: "Asanda Richard Radebe",
  email: "aggrandizewebco@gmail.com",
  phone: "+27 74 613 6184",
  website: "aggrandize.co.za",
  // Bump both whenever the legal copy materially changes — every Get
  // Started consent record stores this exact version/date, so it stays
  // provable which text a client actually agreed to.
  policyVersion: "1.0",
  policiesLastUpdated: "2026-09-22",
};

// True while registrationNumber is still the bracketed placeholder above —
// components use this to hide the field rather than print literal
// "[REG NUMBER]" text on a live page. physicalAddress never needs this: it
// already falls back to the (true) city/province/country above instead of
// a bracket when the street portion isn't filled in yet.
export const REGISTRATION_NUMBER_IS_PLACEHOLDER = !isRegistered;
