import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as process from "node:process";


export class SwaggerConfig {
    static setup(app: any) {


        const config = new DocumentBuilder()
            .setTitle(process.env.APP_NAME)
            .setDescription(process.env.APP_DESCRIPTION)
            .setVersion('1.0')
            // .addTag('cats')
            .addBearerAuth(
                {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
                'access-token'
            )

            .addGlobalParameters({
                name: 'platform',
                in: 'header',
                example: 'yu2ahel',
                required: true,
                description: 'Platform Key',
            })

            .build();


        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document);


    }
}
