"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const fs = require("fs");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const xss = require('xss-clean');
const PORT = process.env.PORT || 4000;
const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/certificate.pem'),
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:3000',
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(xss());
    await app.listen(PORT, () => {
        console.log(`runing on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map