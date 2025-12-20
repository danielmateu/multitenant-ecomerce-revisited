import { getPayload, Payload } from 'payload';
import configPromise from '@payload-config';

let cachedPayload: Payload | null = null;

/**
 * Cached Payload client to prevent "Cannot overwrite model" errors
 * in development due to hot-reloading
 */
export async function getPayloadClient(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayload({
    config: configPromise,
  });

  return cachedPayload;
}
