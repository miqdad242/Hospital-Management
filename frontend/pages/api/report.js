import fs from "fs";
import carbone from "carbone";

export default async function handler(req, res) {
    try {
        
        var data = req.body.data;
        var options = {
            convertTo: 'pdf'
        };

        carbone.render('./Template/Template.docx', data, options, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.setHeader("Content-Type", "application/pdf");
            return res.status(200).send(result);
        });

    } catch (err) {
       return res.status(500).send({ error: 'failed to fetch data' });
    }
}