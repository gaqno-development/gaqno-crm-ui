import "@testing-library/jest-dom";
import { vi } from "vitest";

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock, writable: true });
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });
}
import {
  MOCK_LEADS,
  MOCK_CONTACTS,
  MOCK_DEALS,
  MOCK_INTERACTIONS,
} from "../lib/crm-mock-data";

vi.mock("@gaqno-development/frontcore/i18n", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: {} }),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/", search: "", hash: "", state: null }),
}));

const mockGet = vi.fn((url: string) => {
  if (url.startsWith("/leads")) return Promise.resolve({ data: MOCK_LEADS });
  if (url.startsWith("/contacts")) return Promise.resolve({ data: MOCK_CONTACTS });
  if (url.startsWith("/deals")) return Promise.resolve({ data: MOCK_DEALS });
  if (url.startsWith("/interactions"))
    return Promise.resolve({ data: MOCK_INTERACTIONS });
  if (url.startsWith("/workflows")) return Promise.resolve({ data: [] });
  if (url.startsWith("/users")) return Promise.resolve({ data: [] });
  if (url.startsWith("/organization"))
    return Promise.resolve({
      data: { id: "t1", name: "Org", slug: "org", updatedAt: new Date().toISOString() },
    });
  if (url.startsWith("/invoices")) return Promise.resolve({ data: [] });
  return Promise.resolve({ data: [] });
});
const mockPost = vi.fn(() => Promise.resolve({ data: {} }));
const mockPatch = vi.fn(() => Promise.resolve({ data: {} }));

vi.mock("@gaqno-development/frontcore/utils/api", () => ({
  coreAxiosClient: {
    crm: {
      get: mockGet,
      post: mockPost,
      patch: mockPatch,
    },
  },
}));
