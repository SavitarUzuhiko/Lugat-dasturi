/**
 * Universal pagination utility with optional filters, search, sorting, and population
 * 
 * @param {Object} options
 * @param {mongoose.Model} options.model - Mongoose model to query
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=10] - Results per page
 * @param {Object} [options.filters={}] - Query filters
 * @param {string} [options.search] - Search keyword
 * @param {string[]} [options.searchFields=[]] - Fields to apply search on
 * @param {string|Object|Array} [options.populate] - Fields to populate
 * @param {string|Object} [options.sort] - Mongoose sort option
 */
async function universalPaginate({
  model,
  page = 1,
  limit = 10,
  filters = {},
  search,
  searchFields = [],
  populate,
  sort = { createdAt: -1 },
}) {
  let query = { ...filters };

  // Add search condition if applicable
  if (search && searchFields.length > 0) {
    const searchRegex = new RegExp(search, 'i');
    const searchConditions = searchFields.map((field) => ({
      [field]: searchRegex,
    }));

    query = Object.keys(filters).length > 0
      ? { $and: [filters, { $or: searchConditions }] }
      : { $or: searchConditions };
  }

  const skip = (Number(page) - 1) * Number(limit);

  // Base query
  let mongooseQuery = model.find(query).sort(sort).skip(skip).limit(Number(limit));

  // Apply populate if provided
  if (populate) {
    mongooseQuery = mongooseQuery.populate(populate);
  }

  const [total, data] = await Promise.all([
    model.countDocuments(query),
    mongooseQuery,
  ]);

  return {
    total,
    data,
    page: Number(page),
    limit: Number(limit),
  };
}

module.exports = universalPaginate;
