const WordsModel = require('../../models/Words');
const UploadModel = require('../../models/Upload');
const universalPaginate = require('../../utils/Universal_Paginate_Helper');
const HttpException = require('../../utils/HttpException');

class WordController {
  static addWord = async (req, res) => {
    const { word, definition, category, image } = req.body;

    const save_file = await UploadModel.findOne({ filePath: image });
    if (!save_file) {
      throw new HttpException(400, 'Image file not found!');
    }

    if (save_file.is_use) {
      throw new HttpException(
        400,
        'Image file is in use: ' + save_file.where_used
      );
    }

    await save_file.updateOne({ is_use: true, where_used: 'Word' });

    await WordsModel.create({ word, definition, category, image });
    res.json({ success: true, msg: 'Word created successfully' });
  };
  static getWord = async (req, res) => {
    const { page = 1, limit = 10, ctg = '', search } = req.query;

    const { data, total } = await universalPaginate({
      model: require('../../models/Words/Words.model'),
      page: Number(page),
      limit: Number(limit),
      filters: ctg ? { category: ctg } : {},
      populate: 'category',
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
  };
  static deleteWord = async (req, res) => {
    const { id } = req.params;
    const item = await WordsModel.findById(id);
    if (!item) throw new HttpException(404, 'Word not found');

    const saved_file = await UploadModel.findOne({ filePath: item.image });
    if (!saved_file) throw new HttpException(404, 'Image file not found');

    await saved_file.updateOne(
      { filePath: item.image },
      { is_use: false, where_used: '' }
    );

    await item.deleteOne({ id });
    res.json({ success: true, msg: 'Word deleted successfully' });
  };
  static updateWord = async (req, res) => {
    const { id } = req.params;
    const { word, definition, category, image } = req.body;
    const item = await WordsModel.findById(id);
    if (!item) throw new HttpException(404, 'Word not found');

    if (word !== item.word) item.word = word;
    if (definition !== item.definition) item.definition = definition;
    if (category !== item.category) item.category = category;

    if (image && image !== item.image) {
      const save_file = await UploadModel.findOne({ filePath: image });
      if (!save_file) {
        throw new HttpException(400, 'Image file not found!');
      }

      if (save_file.is_use) {
        throw new HttpException(
          400,
          'Image file is in use: ' + save_file.where_used
        );
      }
      await save_file.updateOne({ is_use: true, where_used: 'Word' });
      item.image = image;
    }

    await item.save();
    res.json({ success: true, msg: 'Word updated successfully' });
  };
}

module.exports = WordController;
