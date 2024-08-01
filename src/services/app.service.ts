import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    /**
     * Returns a string indicating the status of the application.
     *
     * @return {string} The message indicating the status of the application.
     *
     * @example
     *
     * isWorking();
     * // Returns 'App is Working - V:1.0.0 - Thu Sep 30 2021 13:00:00 GMT+0000 (Coordinated Universal Time).
     * // Please check the API documentation at /api-docs'
     *
     */
    isWorking(): string {
        return (
            `"${process.env.APP_NAME}" App is Working (${process.env.APP_ENV}) ${process.env.APP_VERSION}
            ${new Date().toDateString()} ${new Date().toTimeString()}.
            Please check the API documentation at "/api-docs" OR "/api-docs-json"`
        );
    }
}
