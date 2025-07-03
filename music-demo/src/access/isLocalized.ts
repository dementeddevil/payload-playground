import { Access } from "payload/config";
import { User } from "../payload-types";

export const isLocalized: Access<any, User> =  ({ req }) => {
  //    // If user has role of 'admin'
    if (req?.user?.roles?.includes('admin')) {
     return true;
   }

  // Grant access if the locale is 'fr'
   if (Boolean(req.user?.roles?.includes('localEditor'))) {
     for (const locale of req.user.locales) {
       if(locale === req.locale) {
         return true
       }
     }
   }

//   // Deny access for all other locales
   return false;
}
