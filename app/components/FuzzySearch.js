const FuzzySearch = (query, item) => {
  const normalizedQuery = query.toLowerCase();
  const normalizedItem = item.toLowerCase();

  let queryIndex = 0;
  let itemIndex = 0;

  while (
    queryIndex < normalizedQuery.length &&
    itemIndex < normalizedItem.length
  ) {
    if (normalizedQuery[queryIndex] === normalizedItem[itemIndex]) {
      queryIndex++;
    }
    itemIndex++;
  }

  // If we've matched all characters of the query, return true
  return queryIndex === normalizedQuery.length;
};

export default FuzzySearch;
