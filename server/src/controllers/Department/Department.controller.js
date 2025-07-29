const DepartmentModel = require('../../models/Department');
const HttpException  = require('../../utils/HttpException');
const DictionaryModel = require('../../models/Dictionary');
const universalPaginate = require('../../utils/Universal_Paginate_Helper');

class DepartmentController {
  static addDepartment = async (req, res) => {
    const { name, dictionary, image } = req.body;
    const dict = await DictionaryModel.findById(dictionary);
    if (!dict) throw new HttpException(404, 'Dictionary not found');
    await DepartmentModel.create({ name, dictionary, image });
    res.json({ success: true, msg: 'Department created successfully' });
  };

  static getDepartment = async (req, res) => {
    const { page = 1, limit = 10, dict = '' , search } = req.query;

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
    if(!item) throw new HttpException(404, 'Department not found');
    const result = await item.deleteOne({id});
    res.json({ success: true, msg: 'Department deleted successfully' , result})
  };

  static updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;
    const item = await DepartmentModel.findById(id);
    if (!item) throw new HttpException(404, 'Department not found');
    await item.updateOne({ name, image });
    res.json({ success: true, msg: 'Department updated successfully' });
  };
}

module.exports = DepartmentController;
