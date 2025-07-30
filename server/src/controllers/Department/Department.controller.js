const DepartmentModel = require('../../models/Department');
const HttpException = require('../../utils/HttpException');
const DictionaryModel = require('../../models/Dictionary');
const universalPaginate = require('../../utils/Universal_Paginate_Helper');

class DepartmentController {
  static addDepartment = async (req, res) => {
    const { name, dictionary, image } = req.body;
    const dict = await DictionaryModel.findById(dictionary);
    if (!dict) throw new HttpException(404, 'Dictionary not found');

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

    await save_file.updateOne({ is_use: true, where_used: 'Department' });
    await DepartmentModel.create({ name, dictionary, image });
    res.json({ success: true, msg: 'Department created successfully' });
  };

  static getDepartment = async (req, res) => {
    const { page = 1, limit = 10, dict = '', search } = req.query;

    const { data, total } = await universalPaginate({
      model: require('../../models/Department'),
      page: Number(page),
      limit: Number(limit),
      filters: dict ? { dictionary: dict } : {},
      search,
      searchFields: ['name'],
    });
    res.json({ data, length: data.length, page, limit, total });
  };

  static deleteDepartment = async (req, res) => {
    const { id } = req.params;
    const item = await DepartmentModel.findById(id);
    if (!item) throw new HttpException(404, 'Department not found');

    const saved_file = await UploadModel.findOne({ filePath: item.image });
    if (!saved_file) throw new HttpException(404, 'Image file not found');

    await saved_file.updateOne(
      { filePath: item.image },
      { is_use: false, where_used: '' }
    );
    await item.deleteOne();

    res.json({ success: true, msg: 'Department deleted successfully' });
  };

  static updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    const item = await DepartmentModel.findById(id);
    if (!item) throw new HttpException(404, 'Department not found');

    if (name !== item.name) item.name = name;

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

      await save_file.updateOne({ is_use: true, where_used: 'Department' });
    }

    await item.save();
    res.json({ success: true, msg: 'Department updated successfully' });
  };
}

module.exports = DepartmentController;
