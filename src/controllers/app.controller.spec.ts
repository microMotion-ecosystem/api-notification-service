import {Test, TestingModule} from "@nestjs/testing";
import {AppController} from "./app.controller";
import {AppService} from "../services/app.service";

describe("AppController", () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe("isWorking", () => {
        it("should invoke the isWorking method in the AppService once", () => {
            const appService = {isWorking: jest.fn()};

            jest.spyOn(appService, "isWorking");
            appController = new AppController(appService as any);

            appController.isWorking();
            expect(appService.isWorking).toHaveBeenCalled();
        });

        it("should return what isWorking in the AppService returns", () => {
            const result = "App is Working - V:1.0.0";
            const appService = {isWorking: jest.fn().mockReturnValue(result)};

            appController = new AppController(appService as any);

            expect(appController.isWorking()).toBe(result);
        });
    });

    describe("demo", () => {
        it("should return the string 'demo'", () => {
            expect(appController.demo()).toBe('demo');
        });
    });
});
