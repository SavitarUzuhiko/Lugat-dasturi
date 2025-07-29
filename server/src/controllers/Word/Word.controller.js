const WordsModel = require("../../models/Words/Words.model");
const universalPaginate = require("../../utils/Universal_Paginate_Helper");
const HttpException = require("../../utils/HttpException");

class WordController {
  static addWord = async (req,res,next) => {
    const { word, definition, category, image } = req.body;
    await WordsModel.create({ word, definition, category, image });
    res.json({ success: true, msg: 'Word created successfully' });
  }
  static getWord = async (req,res,next) => {
    const { page = 1, limit = 10, ctg = '', search } = req.query;

    const { data, total } = await universalPaginate({
      model: require("../../models/Words/Words.model"),
      page: Number(page),
      limit: Number(limit),
      filters: ctg ? { category: ctg } : {},
      search,
      searchFields: ['word', 'definition'],
    });

    res.json({
      data,
      length: data.length,
      page: Number(page),
      limit: Number(limit),
      total,
    });
  }
  static deleteWord = async (req,res,next) => {
    const { id } = req.params;
    const item = await WordsModel.findById(id);
    if(!item) throw new HttpException(404, 'Word not found');
    await item.deleteOne({id});
    res.json({ success: true, msg: 'Word deleted successfully' });
  }
  static updateWord = async (req,res,next) => {
    const { id } = req.params;
    const { word, definition, category, image } = req.body;
    const item = await WordsModel.findById(id);
    if(!item) throw new HttpException(404, 'Word not found');
    await item.updateOne({ word, definition, category, image });
    res.json({ success: true, msg: 'Word updated successfully' });
  }

}

module.exports = WordController