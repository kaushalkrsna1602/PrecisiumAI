export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

  // Replace dashes, underscores with spaces, and add space between camelCase words
  const withSpaces = withoutExtension
    .replace(/[ -_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');

  // Convert to title case (capitalize first letter of each word)
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}