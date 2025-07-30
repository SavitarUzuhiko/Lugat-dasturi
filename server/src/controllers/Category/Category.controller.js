const DictionaryModel = require('../../models/Dictionary');
const DepartmentModel = require('../../models/Department');
const CategoryModel = require('../../models/Category');
const HttpException = require('../../utils/HttpException');
class CategoriesController {
  static addCategory = async (req, res) => {
    const { name, dictionary, department} = req.body;
    const dict = await DictionaryModel.findById(dictionary);
    if (!dict) throw new HttpException(404, 'Dictionary not found');

    const dep = await DepartmentModel.findById(department);
    if (!dep) throw new HttpException(404, 'Department not found');

    await CategoryModel.create({ name, dictionary, department});
    res.json({ success: true, msg: 'Category created successfully' });
  };

  static getCategory = async (req, res) => {
    const { page = 1, limit = 10, dict = '', dep = '', search } = req.query;
    const query = {};
    if (dict) query.dictionary = dict;
    if (dep) query.department = dep;

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ name: searchRegex }];
    }

    const selectedDict = await CategoryModel.find(query);

    res.json({ data: selectedDict, length: selectedDict.length, page, limit });
  };

  static deleteCategory = async (req, res) => {
    const { id } = req.params;
    const item = await CategoryModel.findById(id);
    if (!item) throw new HttpException(404, 'Category not found');
    await item.deleteOne({ id });
    res.json({ success: true, msg: 'Category deleted successfully' });
  };

  static updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, dictionary, department } = req.body;

    const item = await CategoryModel.findById(id);
    if (!item) throw new HttpException(404, 'Category not found');

    if(name !== item.name) item.name = name;
    if(dictionary !== item.dictionary) item.dictionary = dictionary;
    if(department !== item.department) item.department = department;

    await item.save();
    res.json({ success: true, msg: 'Category updated successfully' });
  };
}

module.exports = CategoriesController;
