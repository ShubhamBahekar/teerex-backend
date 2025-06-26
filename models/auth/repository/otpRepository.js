const otpModel = require("../otpModel");

class OTPRepository
{
   constructor(){
    this.model = otpModel;
   }

async createDoc(data) {
    return this.model.create(data);
  }

  async findOneDoc(match, project = {}) {
    return this.model.findOne(match, project);
  }

  async findAndUpdateDoc(match, update, options = {}) {
    return this.model.updateOne(match, update, options);
  }

  async findByIdAndUpdateDoc(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async getDocById(id, project = {}) {
    return this.model.findById(id, project);
  }

  async deleteDoc(id) {
    return this.model.deleteOne({ _id: id });
  }

}

const OTPInstance = new OTPRepository();

module.exports = OTPInstance ;