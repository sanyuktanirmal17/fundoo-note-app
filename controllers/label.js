/************************************************************************
 *
 * @file            : label.js
 * @author          : sanyukta 
 * @version         : 1.0.0
 *
 **************************************************************************/

 const logger = require('../logger/logger');
const labelService = require('../service/label');
 const {labelValidation} = require('../middleware/user');
 const redisClass = require('../middleware/redis')

 class LabelController {
    /**
     * @description function writt
     * en to create label into database
     * @param {*} a valid req body is expected
     * @param {*} res
     */
    async createLabel(req, res) {
        try {
           let dataValidation = labelValidation.validate(req.body);
           if (dataValidation.error) {
               return res.status(400).send({
                   message: dataValidation.error.details[0].message
               });
           }
           const labelData = {
               labelName: req.body.labelName,
               notesId: req.params.notesId
           }
           const labelCreated = await labelService.createLabel(labelData);
           res.send({success: true, message: "Label Created!", data: labelCreated});
        } catch (error) {
           logger.info('Some error occured while creating label', error)
           console.log(error)
           res.status(500).send({success: false, message: "Some error occurred while creating label"});
        }
    }

    /**
     * @description function written to get all labels
     * @param {*} req 
     * @param {*} res 
     */
    async getAllLabels(req, res) {
        try {
            const getLabels = req.params;
            const getAllLabels = await labelService.getAllLabels();
            const data = await JSON.stringify(getAllLabels);
            redisClass.setDataInCache(getLabels.labels, 3600, data)
            res.send({success: true, message: "Labels Retrieved!", data: getAllLabels});
            console.log("data", getAllLabels)
        } catch (error) {
            console.log("error controleer",error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving labels"});
        }
    }

    /**
     * @description function written to get label by ID
     * @param {*} req 
     * @param {*} res 
     */
    async getLabelById(req, res) {
        try {
            let labelId = req.params;
            const getLabel = await labelService.getLabelById(labelId);
            const data =  JSON.stringify(labelId);
            redisClass.setDataInCache(  "labelId", 3600, data)
            res.send({success: true, message: "Label Retrieved!", data: getLabel});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving label"});
        }
    }

    /**
     * @description function written to update label
     * @param {*} a valid req body is expected
     * @param {*} res 
     */
    async updateLabelById(req, res) {
        try {
            let dataValidation = labelValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }

            let labelId = req.params;
            const labelData = {
               labelName: req.body.labelName
            }
            const updatedLabel = await labelService.updateLabelById(labelId, labelData);
            res.send({success: true, message: "Label Name Updated!", data: updatedLabel});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while updating label name"});
        }
    }

    /**
     * @description function written to delete label by ID
     * @param {*} req 
     * @param {*} res 
     */
    async deleteLabelById(req, res) {
        try {
            let labelId = req.params;
            await labelService.deleteLabelById(labelId);
            res.send({success: true, message: "Label Deleted!"});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while deleting label"});
        }
   }
}

//exporting class to utilize or call function created in this class
module.exports = new LabelController();




















































































































































 


    //  /**
    //   * @param {httprequest} req
    //   * @param {httpresponse} res
    //   * @description : createLabel is used to create a new label.
    //   */
    //  createLabel = async (req, res) => {
    //      try {
    //         // let dataValidation = labelValidation.validate(req.body);
    //         // if (dataValidation.error) {
    //         //     return res.status(400).send({
    //         //         message: dataValidation.error.details[0].message
    //         //     });

    //         // }
    //          const labelDetails = {
    //              label: req.body.label,  

    //              noteId: req.params.noteId
    //          };
    //          const labelData = await services.createLabel(labelDetails);
    //           console.log("controller data", labelData);
    //          if (labelData !== null) {
    //              return res.status(200).send({ 
    //                  success: true,
    //                  message: 'Your label created successfully',
    //                  labelData,
    //              });
    //          }
    //          return res.status(400).send({
    //              success: false,
    //              message: 'Unable to create your label',
    //              err,
    //          });
    //      } catch (err) {
    //         console.log("controller err", err);
    //          res.status(500).send({
                
    //              success: false,
    //              message: 'There is some internal error from server',
    //          });
    //         }
    //      }

    //      /**
    //  * @param {httprequest} req
    //  * @param {httpresponse} res
    //  * @description : updateLabel is used to update the already created label.
    //  */
    // updateLabel = (req, res) => {
    //     try {
    //         const labelData = {
    //             label: req.body.label,
    //             labelId: req.params.labelId,
    //         };
    //         if (!labelData.label) {
    //             res.status(400).send({
    //                 success: false,
    //                 message: 'Please fill correct and complete details.',
    //             });
    //         } else {
    //             services.updateLabel(labelData).then((data) => {
    //                 res.status(200).send({
    //                     success: true,
    //                     message: 'Your label is updated successfully',
    //                     data,
    //                 });
    //             }).catch((err) => {
    //                 res.status(400).send({
    //                     success: false,
    //                     message: 'Un-able to update your label',
    //                     err,
    //                 });
    //             });
    //         }
    //     } catch (err) {
    //         res.status(500).send({
    //             success: false,
    //             message: 'There is some internal error from server',
    //         });
    //     }
    // }

    //      /**
    // * @param {httprequest} req
    // * @param {httpresponse} res
    // * @description : retrieveLabels is used to retrive the labels.
    // */
    // retrieveLabels = (req, res) => {
    //     try {
    //         services.retrieveLabels(req).then((labels) => {
    //             res.status(200).send({
    //                 success: true,
    //                 message: 'Your labels are retrived successfully',
    //                 labels,
    //             });
    //         }).catch((err) => {
    //             res.status(400).send({
    //                 success: false,
    //                 message: 'Un-able to retrive the labels',
    //                 err,
    //             });
    //         });
    //     } catch (err) {
    //         res.status(500).send({
    //             success: false,
    //             message: 'There is some internal error from server',
    //         });
    //     }
    // }
    // /**
    //  * @param {httprequest} req
    //  * @param {httpresponse} res
    //  * @description : deleteLabel is used to delete the already created label using its id.
    //  */
    // deleteLabel = (req, res) => {
    //     try {
    //         services.deleteLabel(req.params.labelId).then((data) => {
    //             res.status(200).send({
    //                 success: true,
    //                 message: 'Your label is deleted successfully',
    //             });
    //         }).catch((err) => {
    //             res.status(400).send({
    //                 success: false,
    //                 message: 'Unable to delete your label',
    //                 err,
    //             });
    //         });
    //     } catch (err) {
    //         res.status(500).send({
    //             success: false,
    //             message: 'There is some internal error from server',
    //         });
    //     }
    // }
    //  }

     module.exports = new LabelController();