const DictionaryModel = require('../../models/Dictionary');
const HttpException = require('../../utils/HttpException');

class dictionaryController {
  static addDictionary = async function(req, res, next) {
    const {status, word, definition , image} = req.body;
    await DictionaryModel.create({status, word, definition, image});
    res.json({success: true, msg:"Dictionary created successfully"});
  }
  static getDictionary = async function(req, res) {
    const {page=1, limit=10, type='', search} = req.query;
    let data
    let query = type ? {status:type} : {};
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchQuery = {$or: [{ word: searchRegex },{ definition: searchRegex }]};
      if (type) query = {$and: [{ status: type },searchQuery]};
      else query = searchQuery;
    }
    const total = await DictionaryModel.countDocuments(query);
    data = await DictionaryModel.find(query).skip((page-1)*limit).limit(limit);
    res.json({data, length:data.length,page,limit,total});
  }
  static deleteDictionary = async (req,res,next) => {
    const {id} = req.params;

    const item = await DictionaryModel.findById(id);
    if (!item) throw new HttpException(404, 'Dictionary not found');

    await item.deleteOne(id);
    res.json({success: true, msg:"Dictionary deleted successfully"});

  }
  static updateDictionary = async (req,res,next) => {
    const {id} = req.params;
    const {status, word, definition , image} = req.body;

    const item = await DictionaryModel.findById(id);
    if (!item) throw new HttpException(404, 'Dictionary not found');

    await item.updateOne({status, word, definition, image});
    res.json({success: true, msg:"Dictionary updated successfully"});
  }
}
module.exports = dictionaryController