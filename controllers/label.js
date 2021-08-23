/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to perform crud operations of labels.
 *
 * @file            : label.js
 * @author          : sanyukta 
 * @version         : 1.0.0
 *
 **************************************************************************/
 const services = require('../service/label');

 class LabelController {
     /**
      * @param {httprequest} req
      * @param {httpresponse} res
      * @description : createLabel is used to create a new label.
      */
     createLabel = async (req, res) => {
         try {
            // let dataValidation = labelValidation.validate(req.body);
            // if (dataValidation.error) {
            //     return res.status(400).send({
            //         message: dataValidation.error.details[0].message
            //     });

            // }
             const labelDetails = {
                 label: req.body.label,  

                 noteId: req.params.noteId
             };
             const labelData = await services.createLabel(labelDetails);
              console.log("controller data", labelData);
             if (labelData !== null) {
                 return res.status(200).send({ 
                     success: true,
                     message: 'Your label created successfully',
                     labelData,
                 });
             }
             return res.status(400).send({
                 success: false,
                 message: 'Unable to create your label',
                 err,
             });
         } catch (err) {
            console.log("controller err", err);
             res.status(500).send({
                
                 success: false,
                 message: 'There is some internal error from server',
             });
            }
         }

         /**
     * @param {httprequest} req
     * @param {httpresponse} res
     * @description : updateLabel is used to update the already created label.
     */
    updateLabel = (req, res) => {
        try {
            const labelData = {
                label: req.body.label,
                labelId: req.params.labelId,
            };
            if (!labelData.label) {
                res.status(400).send({
                    success: false,
                    message: 'Please fill correct and complete details.',
                });
            } else {
                services.updateLabel(labelData).then((data) => {
                    res.status(200).send({
                        success: true,
                        message: 'Your label is updated successfully',
                        data,
                    });
                }).catch((err) => {
                    res.status(400).send({
                        success: false,
                        message: 'Un-able to update your label',
                        err,
                    });
                });
            }
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server',
            });
        }
    }

         /**
    * @param {httprequest} req
    * @param {httpresponse} res
    * @description : retrieveLabels is used to retrive the labels.
    */
    retrieveLabels = (req, res) => {
        try {
            services.retrieveLabels(req).then((labels) => {
                res.status(200).send({
                    success: true,
                    message: 'Your labels are retrived successfully',
                    labels,
                });
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: 'Un-able to retrive the labels',
                    err,
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server',
            });
        }
    }
    /**
     * @param {httprequest} req
     * @param {httpresponse} res
     * @description : deleteLabel is used to delete the already created label using its id.
     */
    deleteLabel = (req, res) => {
        try {
            services.deleteLabel(req.params.labelId).then((data) => {
                res.status(200).send({
                    success: true,
                    message: 'Your label is deleted successfully',
                });
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: 'Unable to delete your label',
                    err,
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'There is some internal error from server',
            });
        }
    }
     }

     module.exports = new LabelController();