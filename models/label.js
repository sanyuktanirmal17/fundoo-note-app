/*************************************************************************
 *
 * @file            : label.js
 * @author          : sanyukta
 * @version         : 1.0.0
 *
 **************************************************************************/

 const mongoose = require('mongoose');

 const LabelSchema = new mongoose.Schema({
     labelName: {
         type: String,
         required: true
     },
     notesId: {
         type: String
     },
     labels : {
        type: [String]
    }
 }, {
     timestamps: true,
     versionKey: false
 })
 
 const LabelModel = mongoose.model('labels', LabelSchema);
 
 class LabelsModel {
     /**
      * @description function written to create label
      * @param {*} labelData 
      * @returns data else if returns error
      */
     async createLabel(labelData) {
         try {
             const label = new LabelModel({
                 labelName: labelData.labelName,
                 notesId: labelData.notesId
             });
             return await label.save({});
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to get all labels
      * @returns data else if returns error
      * 
      * 
      */
     async getAllLabels() {
         try {
             return await LabelModel.find({});
         } catch (error) {
            console.log("model err",error);
             return error;
             
         }
     }
 
     /**
      * 
      * @param {*} labelId
      * @description retrieve all the label created
      */
     async getLabelById(labelId) {
         try {
             return await LabelModel.findById(labelId.labelId);
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description : updating the label
      * @param {*} labelId 
      * @param {*} labelData 
      * @returns data else if returns error
      */
     async updateLabel(labelId, labelData) {
         try {
             return await LabelModel.findByIdAndUpdate(labelId.labelId, {
                 labelName: labelData.labelName
             }, {new : true});
         } catch (error) {
             return error;
         }
     }
 
     /**
      * @description function written to delete label
      * @param {*} labelId 
      * @returns error in the case of error occurrence
      */
     async deleteLabel(labelId) {
         try {
             return await LabelModel.findByIdAndRemove(labelId.labelId);
         } catch (error) {
             return error;
         }
     }
 }
 
 
 module.exports = new LabelsModel()


























































































