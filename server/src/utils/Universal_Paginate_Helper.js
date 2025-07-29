async function universalPaginate({
  model,
  page = 1,
  limit = 10,
  filters = {},
  search,
  searchFields = [],
}) {
  let query = { ...filters };

  // Add search condition if needed
  if (search && searchFields.length > 0) {
    const searchRegex = new RegExp(search, 'i');
    const searchConditions = searchFields.map((field) => ({
      [field]: searchRegex,
    }));

    query = Object.keys(filters).length > 0
      ? { $and: [filters, { $or: searchConditions }] }
      : { $or: searchConditions };
  }

  // Calculate total count and paginated data
  const total = await model.countDocuments(query);
  const data = await model
    .find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    total,
    data,
    page: Number(page),
    limit: Number(limit),
  };
}

module.exports = universalPaginate;
