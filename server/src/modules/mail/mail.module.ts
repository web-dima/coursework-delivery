import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import {configuration} from "../../config/configuration";
import * as path from "path"
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";


@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: "dps0@inbox.ru",
                    pass: "4zWZhPVcAErouyrYeVJ4",
                },
            },
            defaults: {
                from: '"No Reply" <dps0@inbox.ru>',
            },
            template: {
                dir: path.join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule {
}
