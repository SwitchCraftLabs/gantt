const idxMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const idxQtr = [
  "Q1",
  "Q1",
  "Q1",
  "Q2",
  "Q2",
  "Q2",
  "Q3",
  "Q3",
  "Q3",
  "Q4",
  "Q4",
  "Q4",
];

export type Month = {
  month: string;
  quarter: string;
  year: string;
};

export function getMonths(num = 24): Month[] {
  const months: Month[] = [];

  const now = new Date();

  while (num) {
    const month = now.getMonth();
    const year = now.getFullYear();

    months.push({
      month: idxMonths[month],
      quarter: idxQtr[month],
      year: year.toString(),
    });

    now.setMonth(month + 1);
    num--;
  }

  return months;
}

type Column = {
  label: string;
  colStart: number;
  colEnd: number;
};

export function getHeadings(items: Month[]): Column[][] {
  const years = items.map((i) => i.year).reduce(mapColumns, []);
  const quarters = items.map((i) => i.quarter).reduce(mapColumns, []);
  const months = items.map((i) => i.month).reduce(mapColumns, []);

  return [years, quarters, months];
}

function mapColumns(acc: Column[], cur: string, idx: number): Column[] {
  const lastItem = acc[acc.length - 1];

  if (lastItem?.label === cur) {
    lastItem.colEnd++;
    return acc;
  }
  acc.push({
    label: cur,
    colStart: idx + 1,
    colEnd: idx + 2,
  });

  return acc;
}

export function dateStrToObj(date: string): Month {
  const d = new Date(date);

  const month = d.getMonth(),
    year = d.getFullYear().toString();

  return {
    month: idxMonths[month],
    quarter: idxQtr[month],
    year,
  };
}
