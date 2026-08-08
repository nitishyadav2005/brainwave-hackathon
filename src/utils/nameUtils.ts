export function formatFirstName(rawInput?: string): string {
  if (!rawInput) return 'Nitish';

  // 1. Take part before '@' if email
  let str = rawInput.split('@')[0].trim();

  // 2. Remove numbers, underscores, dots, hyphens
  str = str.replace(/[0-9_.-]/g, ' ').trim();

  // 3. If there are spaces, take the first word (i.e. remove surname/last name)
  if (str.includes(' ')) {
    const parts = str.split(/\s+/).filter(Boolean);
    if (parts.length > 0) {
      str = parts[0];
    }
  }

  // 4. Handle camelCase / PascalCase like "NitishYadav" -> "Nitish"
  const camelSplit = str.split(/(?=[A-Z])/);
  if (camelSplit.length > 1 && camelSplit[0].length >= 2) {
    str = camelSplit[0];
  }

  // 5. Handle concatenated common Indian/global surnames at the end of single words like "nitishyadav"
  const surnameRegex = /(yadav|sharma|singh|kumar|verma|gupta|mishra|pandey|tiwari|das|roy|patel|shah|reddy|choudhary|thakur|rajput|meena|saini|khan|jain|joshi|bhatt|agrawal|agarwal|chawla|kapoor|khanna|malhotra|nair|rao|pillai|menon)$/i;
  if (str.length > 4 && surnameRegex.test(str)) {
    const stripped = str.replace(surnameRegex, '');
    if (stripped.length >= 2) {
      str = stripped;
    }
  }

  if (!str) return 'Nitish';

  // Capitalize first letter, lowercase the rest
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
