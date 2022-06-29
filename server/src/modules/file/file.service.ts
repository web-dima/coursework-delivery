import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs"
import * as path from "path"


@Injectable()
export class FileService {
    async saveFile(file: Express.Multer.File): Promise<string> {
        try {
            const fileName = Date.now() + '.jpg';
            console.log(fileName)
            const filePath = path.resolve(__dirname, '../../', 'static')
            console.log(filePath)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    overwriteFile(file: Express.Multer.File, imgPath: string): void {

        const pathToImg = path.resolve(`${process.cwd()}\\dist\\static\\${imgPath}`)
        fs.writeFile(pathToImg, file.buffer, (err)=> {
            if (err) throw err
        })
    }

    deleteFile(pathToFile: string){
        fs.unlink(pathToFile, (err)=>{
            if (err) throw err
        })
    }
}
