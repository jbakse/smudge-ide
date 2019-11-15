let container: any = null;

function show(message: string, duration = 1000) {
  if (!container) return;
  (container as any).createSnackbar({
    message,
    duration,
  });
}

function setContainer(c: any) {
  container = c;
}

export { show, setContainer };
