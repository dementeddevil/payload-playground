import { NextAuthConfig } from 'next-auth'
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './lib/db'

export const authConfig: NextAuthConfig = {
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      authorization: {
        params: {
          scope: 'openid profile email offline_access User.Read',
        },
      },
      allowDangerousEmailAccountLinking: true,
      async profile(profile, tokens) {
        // https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0&tabs=http#examples
        const response = await fetch(`https://graph.microsoft.com/v1.0/me/photos/48x48/$value`, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        })

        // Confirm that profile photo was returned
        let image
        // TODO: Do this without Buffer
        if (response.ok && typeof Buffer !== 'undefined') {
          try {
            const pictureBuffer = await response.arrayBuffer()
            const pictureBase64 = Buffer.from(pictureBuffer).toString('base64')
            image = `data:image/jpeg;base64, ${pictureBase64}`
          } catch {}
        }

        // Convert group membership into permissions
        const permissionArray: Array<string> = []
        const groups = profile.groups as unknown as Array<string> | undefined
        if (groups) {
          for (const group of groups) {
            if (group === '3ddfeb1e-b5a7-4379-bc6f-1bcdc0fcb16f') {
              permissionArray.push('admin')
            }
          }
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: image ?? null,
          permissions: permissionArray,
          locales: ['en'],
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(client, {
    databaseName: 'payload-playground-auth',
  }),
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, message)
    },
    warn(code, ...message) {
      console.warn(code, message)
    },
    debug(code, ...message) {
      console.debug(code, message)
    },
  },
}
