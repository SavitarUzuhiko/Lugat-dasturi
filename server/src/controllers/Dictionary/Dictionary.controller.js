const DictionaryModel = require('../../models/Dictionary');
const HttpException = require('../../utils/HttpException');
const universalPaginate = require('../../utils/Universal_Paginate_Helper');

class dictionaryController {
  static addDictionary = async function(req, res, next) {
    const {status, word, definition , image} = req.body;
    await DictionaryModel.create({status, word, definition, image});
    res.json({success: true, msg:"Dictionary created successfully"});
  }
  static getDictionary = async function(req, res) {
    const {page=1, limit=10, type='', search} = req.query;
    const { data, total } = await universalPaginate({
      model: require('../../models/Dictionary'),
      page: Number(page),
      limit: Number(limit),
      filters: type ? { status: type } : {},
      search,
      searchFields: ['word', 'definition'],
    });
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