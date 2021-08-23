/*************************************************************************
 * Purpose          : to create the service for business logic of labels Api.
 *                  : its a middleware between controller and models 
 *
 * @file            : label.js
 * @author          : sanyukta
 * @version         : 1.0.0
 *
 **************************************************************************/



 const labelsModel = require('../models/label');

 class LabelService {
     /**
      * @description function written to create label
      * @param {*} labelData 
      * @returns data else returns error
      */
     async createLabel(labelData) {
         try {
             return await labelsModel.createLabel(labelData);
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to get all labels
      * @returns data else returns error
      */
     async getAllLabels() {
         try {
             return await labelsModel.getAllLabels();
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to get label by ID
      * @param {*} a valid labelId is expected
      * @returns data else returns error
      */
     async getLabelById(labelId) {
         try {
             return await labelsModel.getLabelById(labelId);
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to update label using ID
      * @param {*} a valid labelId is expected
      * @param {*} a valid labelData is expected
      * @returns 
      */
     async updateLabelById(labelId, labelData) {
         try {
             return await labelsModel.updateLabel(labelId, labelData);
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to delete label by ID
      * @param {*} a valid labelId is expected
      * @returns error in case of error occurrence
      */
     async deleteLabelById(labelId) {
         try {
             return await labelsModel.deleteLabel(labelId);
         } catch (error) {
             return error
         }
     }
 }
 
 //exporting the class to utilize or call function created in this class
 module.exports = new LabelService();

//  const models = require('../models/label');
//  logger = require('../logger/logger');


//  class labelService {
//      /**
//       * @param {data}  : data will come from the controller body.
//       * @description   : createLabel will takes the data from controller and send it to models
//      */
//      createLabel = async (data) => {
//         try {
//          if (data) {
             
//              const labelData = await models.createLabel(data);
//              console.log("service data", data)
//              return labelData;
//           } 
//         }catch(err){
//             console.log("err controller", err)
//             return err;
//         }
//     }
     

//      /**
//      * @param {data}  : data will come from the controller body.
//      * @description   : createLabel will takes the data from controller and send it to models
//     */
//     updateLabel = (data) => {
//         return new Promise((resolve, reject) => {
//             const result = models.updateLabel(data);
//             result.then((labelData) => {
//                 resolve({ labelData });
//             }).catch((err) => {
//                 reject({ err });
//             });
//         });
//     }
//     /**
//     * @param {data}  : data will come from the controller body.
//     * @description   : createLabel will takes the data from controller and send it to models
//     */
//     retrieveLabels = (data) => {
//         return new Promise((resolve, reject) => {
//             const result = models.retrieveLabels(data);
//             result.then((labelData) => resolve({ labelData }))
//                 .catch((err) => reject({ err }));
//         });
//     }
//     /**
//     * @param {data}  : data will come from the controller body.
//     * @description   : createLabel will takes the data from controller and send it to models
//     */
//     deleteLabel = (data) => {
//         return new Promise((resolve, reject) => {
//             const result = models.deleteLabel(data);
//             result.then((labelData) => {
//                 resolve({ labelData });
//             }).catch((err) => {
//                 reject({ err });
//             });
//         });
//     }
//     }
//     module.exports = new labelService();