var html_to_pdf = require('html-pdf-node');
const fs = require("fs");
const childProcess = require("child_process");


let options = { format: 'A2' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// or //
let file = { url: "http://127.0.0.1:5500/" };
let ws = fs.createWriteStream("./Hossam_Hamza_Resume_Lv.pdf");



async function generate_pdf(){
    // ensure that this is the pdf_version branch 
    await childProcess.execSync("git switch lv_pdf_version", {stdio: 'inherit'})

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        ws.write(pdfBuffer);
        ws.close()
        console.log("Done");
    });
}


generate_pdf();