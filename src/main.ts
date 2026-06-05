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

const idxQtr = ["Q1", "Q1", "Q1", "Q2", "Q2", "Q2", "Q3", "Q3", "Q3", "Q4", "Q4", "Q4"];

type Month = {
  month: string;
  quarter: string;
  year: string;
};

function getMonths(num = 24) {
  const months: Month[] = [];

  const now = new Date();

  while (num) {
    const month = now.getMonth();
    const year = now.getFullYear();

    months.push({
      month: idxMonths[month] ?? "",
      quarter: idxQtr[month] ?? "",
      year: year.toString(),
    });

    now.setMonth(month + 1);
    num--;
  }

  return months;
}

type Heading = {
  label: string;
  gridCol: string;
};

type Headings = {
  years: Heading[];
  quarters: Heading[];
  months: Heading[];
};

function getHeadings(months: Month[]): Headings {
  const headings: Headings = {
    years: [],
    quarters: [],
    months: [],
  };

  if (!months.length) return headings;

  let curYear = months[0]?.year ?? "";
  let yearStart = 0;
  let curQtr = months[0]?.quarter ?? "";
  let qtrStart = 0;
  for (let i = 0; i < months.length; i++) {
    const { year, quarter, month } = months[i] as Month;
    const isLast = i + 1 === months.length;
    const offset = isLast ? i + 2 : i + 1;

    if (year !== curYear || isLast) {
      headings.years.push({
        label: curYear,
        gridCol: `${yearStart + 1}/${offset}`,
      });
      curYear = year;
      yearStart = i;
    }

    if (quarter !== curQtr || isLast) {
      headings.quarters.push({
        label: curQtr,
        gridCol: `${qtrStart + 1}/${offset}`,
      });
      curQtr = quarter;
      qtrStart = i;
    }

    headings.months.push({ label: month, gridCol: "" });
  }

  return headings;
}

function getMarkup(headings: Headings): DocumentFragment {
  const frag = document.createDocumentFragment();

  const yearsEl = document.createElement("div");
  yearsEl.classList.add("years");

  for (let i = 0; i < headings.years.length; i++) {
    const year = headings.years[i];

    const yearEl = document.createElement("div");
    yearEl.classList.add("year");
    yearEl.textContent = year?.label ?? "";
    yearEl.style.gridColumn = year?.gridCol ?? "";

    yearsEl.appendChild(yearEl);
  }

  const qtrsEl = document.createElement("div");
  qtrsEl.classList.add("quarters");
  for (let i = 0; i < headings.quarters.length; i++) {
    const qtr = headings.quarters[i];

    const qtrEl = document.createElement("div");
    qtrEl.classList.add("quarter");
    qtrEl.textContent = qtr?.label ?? "";
    qtrEl.style.gridColumn = qtr?.gridCol ?? "";

    qtrsEl.appendChild(qtrEl);
  }

  const monthsEl = document.createElement("div");
  monthsEl.classList.add("months");
  for (let i = 0; i < headings.months.length; i++) {
    const month = headings.months[i];

    const monthEl = document.createElement("div");
    monthEl.classList.add("month");
    monthEl.textContent = month?.label ?? "";
    monthEl.style.gridColumn = month?.gridCol ?? "";

    monthsEl.appendChild(monthEl);
  }

  frag.appendChild(yearsEl);
  frag.appendChild(qtrsEl);
  frag.appendChild(monthsEl);
  return frag;
}

const m = getMonths();
const h = getHeadings(m);
const f = getMarkup(h);

document.getElementById("gantt")?.appendChild(f);
