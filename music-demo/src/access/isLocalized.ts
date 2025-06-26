import { Access } from "payload/config";
import { User } from "../payload-types";

export const isLocalized: Access<any, User> = ({ req: { user } }) => {

  // Grant access if the locale is 'fr'
  if (req.locale === 'fr' && Boolean(user?.roles?.includes('localEditor'))) {
    return true
  }

  // Deny access for all other locales
  return false;
}
