const DictionaryModel = require('../../models/Dictionary');
const HttpException = require('../../utils/HttpException');
const universalPaginate = require('../../utils/Universal_Paginate_Helper');
const UploadModel = require('../../models/Upload');

class dictionaryController {
  static addDictionary = async function (req, res) {
    const { status, word, definition, image } = req.body;

    if (!word || !status)
      throw new HttpException(400, 'word and status are required');

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

    await save_file.updateOne({ is_use: true, where_used: 'Dictionary' });

    const new_dictionary = await DictionaryModel.create({
      status,
      word,
      definition,
      image,
    });
    res.json({
      success: true,
      msg: 'Dictionary created successfully',
      data: new_dictionary,
    });
  };
  static getDictionary = async function (req, res) {
    const { page = 1, limit = 10, type = '', search } = req.query;
    const { data, total } = await universalPaginate({
      model: require('../../models/Dictionary'),
      page: Number(page),
      limit: Number(limit),
      filters: type ? { status: type } : {},
      populate: '',
      search,
      searchFields: ['word', 'definition'],
    });
    res.json({ data, length: data.length, page, limit, total });
  };
  static getDictionaryById = async function (req, res) {
    const { id } = req.params;
    
    const data = DictionaryModel.findById(id)
    if(!data) throw new HttpException(404, "Dictionary not found")

    res.json({ data });
  };
  static deleteDictionary = async (req, res) => {
    const { id } = req.params;

    const item = await DictionaryModel.findById(id);
    if (!item) throw new HttpException(404, 'Dictionary not found');

    const saved_file = await UploadModel.findOne({ filePath: item.image });
    if (!saved_file) throw new HttpException(404, 'Image file not found');

    await saved_file.updateOne(
      { filePath: item.image },
      { is_use: false, where_used: '' }
    );

    await item.deleteOne({ _id: id });
    res.json({ success: true, msg: 'Dictionary deleted successfully' });
  };
  static updateDictionary = async (req, res) => {
    const { id } = req.params;
    const { status, word, definition, image } = req.body;

    const item = await DictionaryModel.findById(id);
    if (!item) throw new HttpException(404, 'Dictionary not found');

    if (word !== item.word) item.word = word;
    if (definition !== item.definition) item.definition = definition;
    if (status !== item.status) item.status = status;

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

      await save_file.updateOne({ is_use: true, where_used: 'Dictionary' });
      item.image = image;
    }

    await item.save();
    res.json({ success: true, msg: 'Dictionary updated successfully' });
  };
}
module.exports = dictionaryController;
