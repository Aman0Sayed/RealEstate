import { NormalizedProperty, normalizeProperty } from "@/lib/propertyCatalog";

const STORAGE_KEY = "cloudhome_saved_properties";
const EVENT_NAME = "cloudhome_saved_properties_changed";

export type SavedProperty = Pick<
  NormalizedProperty,
  "id" | "title" | "price" | "address" | "images" | "beds" | "baths" | "sqft" | "type" | "status"
>;

function emitChange(saved: SavedProperty[]) {
  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: saved }));
  } catch {
    // Ignore non-browser environments.
  }
}

export function getSavedProperties(): SavedProperty[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavedProperties(properties: SavedProperty[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  emitChange(properties);
}

export function isPropertySaved(propertyId: string) {
  return getSavedProperties().some((property) => property.id === propertyId);
}

export function toggleSavedProperty(property: any) {
  const normalized = normalizeProperty(property);
  const current = getSavedProperties();
  const exists = current.some((item) => item.id === normalized.id);

  const next = exists
    ? current.filter((item) => item.id !== normalized.id)
    : [
        {
          id: normalized.id,
          title: normalized.title,
          price: normalized.price,
          address: normalized.address,
          images: normalized.images,
          beds: normalized.beds,
          baths: normalized.baths,
          sqft: normalized.sqft,
          type: normalized.type,
          status: normalized.status,
        },
        ...current,
      ];

  saveSavedProperties(next);
  return { saved: !exists, savedProperties: next };
}

export function subscribeToSavedProperties(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  const onCustomEvent = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT_NAME, onCustomEvent as EventListener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT_NAME, onCustomEvent as EventListener);
  };
}
