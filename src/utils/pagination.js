export function getPagination(c, m) {
  let current = c,
      last = m,
      delta = 1,
      left = current - delta,
      right = current + delta,
      range = [],
      rangeWithDots = [],
      l;

  for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i <= right) {
          range.push(i);
      }
  }

  for (let i of range) {
      if (l) {
          if (i - l === 2) {
              rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
              rangeWithDots.push('...');
          }
      }
      rangeWithDots.push(i);
      l = i;
  }

  return rangeWithDots;
}

export function getBooksPerPage(books, currPage, pageSize) {
  let start, end

  if(currPage == 1) {
    start = 0
    end = start + pageSize  
  }
  else {
    start = (currPage - 1) * pageSize
    end = start + pageSize
  }

  return books.slice(start, end)
}