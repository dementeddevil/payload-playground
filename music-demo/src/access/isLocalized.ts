import { Access } from 'payload'
import { User } from '../payload-types'

export const isLocalized: Access<User> = ({ req }) => {
  // If user has role of 'admin'
  if (req?.user?.permissions?.includes('admin')) {
    return true
  }

  // Grant access if the request locale is one of the user's locales
  if (Boolean(req.user?.permissions?.includes('localEditor'))) {
    for (const locale of req.user?.locales ?? []) {
      if (locale === req.locale) {
        return true
      }
    }
  }

  // Deny access for all other locales
  return false
}
