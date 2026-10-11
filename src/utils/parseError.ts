export async function parseError(res: Response) {
  try {
    const data = await res.json();
    return data.message || "Unbekannter Fehler.";
  } catch {
    return "Unbekannter Fehler.";
  }
}