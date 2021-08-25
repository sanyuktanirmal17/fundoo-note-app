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
 
 const LabelModel = mongoose.model('Label', LabelSchema);
 
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




























































































//  const mongoose = require('mongoose');
//  logger = require('../logger/logger');

//  const labelSchema = mongoose.Schema({
//      label: {
//          type: String,
//          required: true
//      },
//      noteId: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: 'User'
//      },
//  }, {
//      timestamps: true,
//      versionKey: false,
//  });
 
//  const labelModel = mongoose.model('Label', labelSchema);
//  class LabelModel {
//      /**
//       * 
//       * @param {*} data 
//       * @description create and save the label
//       */
//      createLabel = async (data) => {
//          try {
//          const label = new labelModel({
//              label: data.label,
//              noteId: data.noteId,
//          })
//         }
//          catch (err){
//              console.log("err model", err)
//              return err;
//          }
         
//          const loadLabel = await label.save();
//          console.log("model data ", label);
//          return loadLabel;
//      }

//      /**
//      * 
//      * @param {*} data 
//      * @description : updating the label
//      */
//     updateLabel = (data) => {
//         return new Promise((resolve, reject) => {
//             labelModel.findByIdAndUpdate(data.labelId, {
//                 label: data.label,
//             })
//                 .then((label) => resolve(label))
//                 .catch((err) => reject(err));
//         });
//     }
//     /**
//      *  
//      * @description : retrieve all the label created
//      */
//     retrieveLabels = () => {
//         return new Promise((resolve, reject) => {
//             labelModel.find()
//                 .then((labels) => resolve(labels))
//                 .catch((err) => reject(err));
//         });
//     }
//     /**
//      * 
//      * @param {*} data 
//      * @description : deleting the label created using lable id
//      */
//     deleteLabel = (data) => {
//         return new Promise((resolve, reject) => {
//             labelModel.findByIdAndRemove(data)
//                 .then((label) => resolve(label))
//                 .catch((err) => reject(err));
//         });
//     }
// }
    

//      module.exports = new LabelModel();