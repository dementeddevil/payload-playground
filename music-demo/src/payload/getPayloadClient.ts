import type { InitOptions, Payload } from 'payload'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * `global` is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 *
 * Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */
interface Cached {
  client: Payload | null
  promise: Promise<Payload> | null
}

let cached = (global as any).payload as Cached

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: configPromise, initOptions })
  }

  cached.client = await cached.promise
  return cached.client
}
