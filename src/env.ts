const getEnvironment = () => {
  if (process.env.REACT_APP_CF_PAGES !== "1") {
    return "development";
  }

  if (process.env.REACT_APP_CF_PAGES_BRANCH === "main") {
    return "production";
  }

  return "preview";
};

export const BRANCH = process.env.REACT_APP_CF_PAGES_BRANCH;
export const COMMIT_SHA = process.env.REACT_APP_CF_PAGES_COMMIT_SHA;
export const ENVIRONMENT = getEnvironment();
export const RELEASE =
  ENVIRONMENT === "development" ? undefined : `${BRANCH}:${COMMIT_SHA}`;
