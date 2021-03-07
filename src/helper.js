export const groupDataByRange = (start, end, data) => {
  return data.filter((item) => {
    return item.age >= start && item.age <= end;
  });
};

export const groupByValues = (key, arr) => {
  return arr.reduce((cache, data) => {
    const property = data[key];
    if (property in cache) {
      return { ...cache, [property]: cache[property].concat(data) };
    }
    return { ...cache, [property]: [data] };
  }, {});
};
