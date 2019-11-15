let container: any = null;

function showSnackbar(message: string, duration = 1000) {
  if (!container) return;
  (container as any).createSnackbar({
    message,
    duration,
  });
}

function setSnackbarContainer(c: any) {
  container = c;
}

export { showSnackbar, setSnackbarContainer };
