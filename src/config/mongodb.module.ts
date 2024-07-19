import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

const mongooseConnectionOptions = {
    family: undefined,
    hints: undefined,
    localAddress: undefined,
    localPort: undefined,
    lookup: undefined,
};

const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${encodedPassword}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;


@Module({
    imports: [
        MongooseModule.forRoot(uri, mongooseConnectionOptions),
    ],
    controllers: [],
    providers: [],
})
export class MongodbModule {
}
