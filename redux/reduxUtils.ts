import { delay, race, select, take } from 'redux-saga/effects'
import { RootState } from './store'

export function* waitFor<T>(
  selector: (state: RootState) => T,
  actionType: string,
  maxRetries = 50, // Limit retries (50 * 100ms = 5 seconds)
  interval = 100, // Delay interval in milliseconds
): Generator<unknown, T, T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result: T = yield select(selector)
    if (result) return result

    yield race([
      delay(interval),
      take(actionType), // Also wait for relevant action
    ])
  }

  console.warn(
    `waitFor timeout: ${actionType} not received within ${maxRetries * interval}ms`,
  )
  throw new Error(`Timeout waiting for ${actionType}`)
}

export function* waitForState(
  selector: (state: RootState) => any, // The selector that checks the state condition
  timeout: number = 5000, // Timeout after 5 seconds (default)
): Generator<unknown, any, any> {
  const startTime = Date.now()

  while (true) {
    const result = yield select(selector)

    // Check if the condition is met
    if (result) {
      return result
    }

    // Check if the timeout has passed
    if (Date.now() - startTime >= timeout) {
      throw new Error(`waitFor timed out after ${timeout}ms`)
    }

    // Wait 100ms before checking again
    yield delay(100)
  }
}
