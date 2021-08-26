/*************************************************************************
 * Purpose          : to create the service for business logic of labels Api.
 *                  : its a middleware between controller and models 
 *
 * @file            : label.js
 * @author          : sanyukta
 * @version         : 1.0.0
 *
 **************************************************************************/


//  const { redisFunction } = require('../middleware/helper');
 const labelsModel = require('../models/label');

 class LabelService {

     /**
      * @param {data}  : data will come from the controller body.
      * @description   : createLabel will takes the data from controller and send it to models
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
     * @description   : createLabel will takes the data from controller and send it to models
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
    * @param {data}  : data will come from the controller body.
    * @description   : createLabel will takes the data from controller and send it to models
    */
     async deleteLabelById(labelId) {
         try {
             return await labelsModel.deleteLabel(labelId);
         } catch (error) {
             return error
         }
     }
 }
 
 
 module.exports = new LabelService();

