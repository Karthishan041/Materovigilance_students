/**
 * Utility functions for progress bar colors based on completion percentage.
 * Exact rules:
 * 0–29%   = RED   (#EF4444)
 * 30–89%  = GREEN (#10B981)
 * 90–100% = BLUE  (#0088FF)
 */

export const getProgressColor = (percent) => {
  const p = typeof percent === 'string' 
    ? parseFloat(percent.replace(/[^0-9.]/g, '')) 
    : (Number(percent) || 0);

  if (p < 30) return '#EF4444'; // RED
  if (p < 90) return '#10B981'; // GREEN
  return '#0088FF';            // BLUE
};

export const getProgressBadgeStyle = (percent) => {
  const color = getProgressColor(percent);
  if (color === '#EF4444') {
    return {
      textColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-rose-200 dark:border-rose-800/40'
    };
  }
  if (color === '#10B981') {
    return {
      textColor: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800/40'
    };
  }
  return {
    textColor: 'text-[#0088FF] dark:text-blue-400',
    bgColor: 'bg-[#F0F7FF] dark:bg-blue-950/40',
    borderColor: 'border-[#0088FF]/20 dark:border-blue-800/40'
  };
};
