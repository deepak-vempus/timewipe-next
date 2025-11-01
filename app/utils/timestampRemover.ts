/**
 * Removes various timestamp formats from text content
 * Supports formats like:
 * - 00:00 (simple minutes:seconds)
 * - [00:00] (bracketed format)
 * - 00:00:00 (hours:minutes:seconds)
 * - [00:00:00] (bracketed with hours)
 * - 0:00:00.000 (with milliseconds)
 * - 0:00:00.000, (with comma separator)
 */

export function removeTimestamps(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Remove timestamps in various formats while preserving formatting
  // Pattern 1: [00:00] or [00:00:00] or [0:00:00.000] (bracketed)
  cleaned = cleaned.replace(/\[\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?\]/g, "");

  // Pattern 2: Timestamps with comma separator like "0:00:00.000,"
  cleaned = cleaned.replace(/\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?,/g, "");

  // Pattern 3: Timestamps followed by dash like "00:00 - " or "00:00:00 - "
  cleaned = cleaned.replace(/\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?\s*-\s*/g, "");

  // Pattern 4: Standalone timestamps at start of line (preserve leading whitespace if any)
  cleaned = cleaned.replace(/^(\s*)\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?(?=\s|$|,)/gm, "$1");

  // Pattern 5: Standalone timestamps after whitespace (preserve the whitespace)
  cleaned = cleaned.replace(/(\s+)\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?(?=\s|$|,|\n)/g, "$1");

  // Only remove the timestamp itself, preserving all other formatting (spaces, line breaks, etc.)
  return cleaned;
}

