export interface RateLimiter {
  checkRateLimit(key: string): Promise<boolean>
}

const rateWindowMs = 10 * 60 * 1000
const cleanupIntervalMs = 60 * 1000
const rateLimit = new Map<string, number[]>()

function cleanExpiredEntries(now: number) {
  for (const [key, timestamps] of rateLimit) {
    const recent = timestamps.filter(timestamp => now - timestamp < rateWindowMs)
    if (recent.length === 0) {
      rateLimit.delete(key)
    } else {
      rateLimit.set(key, recent)
    }
  }
}

const cleanupTimer = setInterval(() => cleanExpiredEntries(Date.now()), cleanupIntervalMs)
cleanupTimer.unref()

export const inMemoryRateLimiter: RateLimiter = {
  async checkRateLimit(key) {
    const now = Date.now()
    const recent = (rateLimit.get(key) || []).filter(timestamp => now - timestamp < rateWindowMs)
    recent.push(now)
    rateLimit.set(key, recent)
    return recent.length > 5
  },
}

export function checkRateLimit(key: string): Promise<boolean> {
  return inMemoryRateLimiter.checkRateLimit(key)
}
