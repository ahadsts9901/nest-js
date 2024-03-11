"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./mongodb");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    const PORT = process.env.PORT || 5002;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map