type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  correlationId?: string;
  module?: string;
  [key: string]: unknown;
}

class Logger {
  private formatLog(level: LogLevel, message: string, context?: LogContext) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      ...(context?.correlationId ? { correlationId: context.correlationId } : {}),
      ...(context?.module ? { module: context.module } : {}),
      ...context
    };

    if (process.env.NODE_ENV === 'production') {
      return JSON.stringify(entry);
    }
    // Clean formatted output in dev
    const cid = context?.correlationId ? `[${context.correlationId.slice(0, 8)}] ` : '';
    const mod = context?.module ? `[${context.module}] ` : '';
    return `[${entry.timestamp}] ${level.toUpperCase().padEnd(5)} ${cid}${mod}${message} ${
      Object.keys(context || {}).filter(k => !['correlationId', 'module'].includes(k)).length > 0
        ? JSON.stringify(context)
        : ''
    }`;
  }

  info(message: string, context?: LogContext) {
    console.log(this.formatLog('info', message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatLog('warn', message, context));
  }

  error(message: string, error?: unknown, context?: LogContext) {
    const errorDetails = error instanceof Error
      ? { errorMessage: error.message, stack: error.stack }
      : { error };
    console.error(this.formatLog('error', message, { ...context, ...errorDetails }));
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatLog('debug', message, context));
    }
  }
}

export const logger = new Logger();
