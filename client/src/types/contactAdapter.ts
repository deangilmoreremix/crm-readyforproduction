import type { Contact } from './contact';

// These helpers remain in case any code still needs explicit conversions.
export const toDomainContact = (c: Contact): Contact => c;
export const fromDomainContact = (c: Contact): Contact => c;
