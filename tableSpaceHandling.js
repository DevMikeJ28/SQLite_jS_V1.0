const fs = require('node:fs');
const {checkFileExists} = require('./helper.js');


class tableSpaceHandling {
    
    constructor() {
        this.space = null;
        if(!this.checkInitSpace()) {
            this.createSpace();
        }
    }

    checkInitSpace() {

        if(fs.existsSync("./space")) {
            const stats = fs.statSync("./space");
            if (stats.isFile()) {
                // Nếu là file, xóa nó trước khi tạo thư mục
                fs.unlinkSync("./space");
                console.log("File 'space' đã bị xóa.");
                fs.mkdirSync("./space");
            } else if (stats.isDirectory()) {
                console.log("Thư mục 'space' đã tồn tại.");
                return;
            }

            return true;
        }

        return checkFileExists("./space");
    }

    createSpace() {
        try {
            fs.mkdirSync("space");
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = {tableSpaceHandling};