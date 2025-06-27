
// Input sanitization utilities for security
export const sanitizeInput = (input: string): string => {
  // Basic XSS protection - remove HTML tags and script content
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const validateChatMessage = (message: string): { isValid: boolean; error?: string } => {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required' };
  }

  const sanitized = sanitizeInput(message);
  
  if (sanitized.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (sanitized.length > 1000) {
    return { isValid: false, error: 'Message is too long (max 1000 characters)' };
  }

  // Check for potentially malicious patterns
  const maliciousPatterns = [
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /on\w+\s*=/i
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, error: 'Message contains invalid content' };
    }
  }

  return { isValid: true };
};

export const sanitizeApiResponse = (response: any): any => {
  if (typeof response === 'string') {
    return sanitizeInput(response);
  }
  
  if (Array.isArray(response)) {
    return response.map(sanitizeApiResponse);
  }
  
  if (response && typeof response === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(response)) {
      sanitized[key] = sanitizeApiResponse(value);
    }
    return sanitized;
  }
  
  return response;
};
