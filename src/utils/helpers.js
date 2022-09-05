export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  //colors need more work as its in array
  if (type === 'colors') {
    unique = unique.flat(); //create new element array of all the subarray
  }
  return ['all', ...new Set(unique)];
};
