import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { debounceTime } from 'rxjs';

export class EcomHelper {
    public static range(numberElement: number): number[] {
        return [...Array(numberElement).keys()];
    }
}

export function debouncedSignal<T>(
    signal: Signal<T>,
    debounceDelay: number,
    initialValue: T
)  {
    const signalObs = toObservable(signal)
    return toSignal(
        signalObs.pipe(debounceTime(debounceDelay)),
        {
            initialValue: initialValue
        }
    )
}

export function extractFileName(url: string): string {
  if (!url) return '';
  return url.substring(url.lastIndexOf('/') + 1);
}

function cleanParams<T extends Record<string, any>>(params: T): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};

  for (const key in params) {
    const value = params[key];

    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}