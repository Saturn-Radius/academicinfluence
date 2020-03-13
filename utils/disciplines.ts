export function disciplineNameToSlug(name: string) {
  return name.replace(/ /g, "-").toLowerCase();
}
