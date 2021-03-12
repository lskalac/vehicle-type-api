import winston, { format, Logger } from "winston";

export default class AppLogger
{
    private static _logger: Logger;

    static init()
    {
        this._logger = winston.createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                this.format
            ),            
            transports: [
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/info.log' }),
            ],
        });
    }

    static Error(message: string, meta?: any): void 
    {
        this._logger.error(message, meta);
    }

    static Info(message: string, meta?: any): void 
    {
        this._logger.info(message, meta);
    }

    private static format = format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    });
}