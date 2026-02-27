import "@testing-library/jest-dom";
import { vi } from "vitest";
import {
  MOCK_LEADS,
  MOCK_CONTACTS,
  MOCK_DEALS,
  MOCK_INTERACTIONS,
} from "../lib/crm-mock-data";

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

vi.mock("@gaqno-development/frontcore/utils/api", () => ({
  coreAxiosClient: {
    crm: {
      get: mockGet,
      post: mockPost,
    },
  },
}));
