export const ROUTE_PATHS = {
  HOME: '/',
  CALC_TYPE: '/:calcType',
  CALC_TYPE_GPA: '/gpa',
  CALC_TYPE_CGPA: '/cgpa',
  GRADING_NBTE: '/gpa/nbte',
  GRADING_LCP: '/gpa/lcp/:department/:program/:semester',
  GRADING_LCP_SEMESTER_ID: '/gpa/lcp/:semesterId',
};

const DB_BASE_URL = "https://nodejitp8h-bjfk--4000--9c984a48.local-credentialless.webcontainer.io"
export const DB_PATH = {
  SEMESTERS:`${DB_BASE_URL}/semesters`,
  COURSES:`${DB_BASE_URL}/courses`,
};

export const CALC_TYPES = {
  GPA: 'gpa',
  CGPA: 'cgpa',
};

// export { ROUTE_PATHS, CALC_TYPES };
