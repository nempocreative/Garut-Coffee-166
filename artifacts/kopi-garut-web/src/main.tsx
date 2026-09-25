const webArtifactPrefix = import.meta.env.BASE_URL.replace(/\/$/, '');
const currentPath = window.location.pathname;
const belongsToWebArtifact =
  currentPath === webArtifactPrefix ||
  currentPath.startsWith(`${webArtifactPrefix}/`);

if (belongsToWebArtifact) {
  const appPath = currentPath.slice(webArtifactPrefix.length) || '/';
  const destination = `${appPath.startsWith('/') ? appPath : `/${appPath}`}${window.location.search}${window.location.hash}`;

  // The Expo app is the single source for mobile and responsive web screens.
  // Reuse its real routes and state instead of maintaining a second web copy.
  window.location.replace(destination);
}
